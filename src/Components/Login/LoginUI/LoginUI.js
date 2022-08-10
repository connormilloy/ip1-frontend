import styles from './LoginUI.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputBox from '../../Shared/InputBox/InputBox';
import Button from '../../Shared/Button/Button';

import { setLocalStorage } from '../../../Utilities/handleLocalStorage';

import axios from 'axios';

const LoginUI = ({ handleMenuStateChange }) => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        "email": "",
        "password": ""
    })

    const handleFieldChange = (e, field) => {
        setLoginInfo(prevState => {
            return {...prevState, [field]: e.target.value};
        })
    }

    const attemptLogin = async () => {
        await axios.post('http://localhost:4000/accounts/login', loginInfo)
            .then(res => {
                if(res.data?.valid){
                    setLocalStorage('email', loginInfo.email);
                    setLocalStorage('token', res.data.token);
                    setLocalStorage('userID', res.data.userID);
                    setLocalStorage('accountLevel', res.data.accountLevel);
                    navigate('/');
                } else if (res.data == "NOACCOUNT") {
                    alert('Account not found. Please check you have entered the correct email address or register below.');
                } else if (res.data == "ACCOUNTLOCKED") {
                    alert('This account has been locked for too many incorrect password attempts. Please contact an administrator to unlock it.')
                } else {
                    const incorrectAttempts = res.data?.loginAttempts;
                    if(incorrectAttempts > 1){
                        alert("Login failed. Please check that your username and password are correct. Your account will be locked after one more incorrect password attempt.")
                    } else {
                        alert("Login failed. Please check that your username and password are correct.");
                    }
                }
            })
            .catch(e => console.log(e))
    }

    const validLoginFields = () => {
        return loginInfo.email !== "" && loginInfo.password !== "";
    }

    return(
        <div className={styles.loginUI}>
            <div className={styles.inputBoxes}>
                <InputBox
                    name={"login-email"}
                    type={"email"}
                    onChange={e => handleFieldChange(e, 'email')}
                    label={"Email"}
                />
                <InputBox
                    name={"login-password"}
                    type={"password"}
                    onChange={e => handleFieldChange(e, 'password')}
                    label={"Password"}
                />
            </div>
            <div className={styles.bottomUI}>
                <Button
                    text={"Login"}
                    className={"greenButton"}
                    onClick={attemptLogin}
                    disabled={!validLoginFields()}
                />
                <div className={styles.linksWrapper}>
                    <p className={styles.noAccountText}>No account?</p>
                    <a href="#" className={styles.registerAccount} onClick={() => handleMenuStateChange('register')}>Register for an account</a>
                </div>
            </div>
        </div>
    )
}

export default LoginUI;