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

    // Whenever a form field is changed, set the loginInfo's respective key to the new value
    const handleFieldChange = (e, field) => {
        setLoginInfo(prevState => {
            return {...prevState, [field]: e.target.value};
        })
    }

    // Attempt a new login using the data on the form
    const attemptLogin = async () => {
        await axios.post('http://localhost:4000/accounts/login', loginInfo)
            .then(res => {
                if(res.data?.valid){
                    // If the login is good, store the token and other information in localStorage to be used in future API requests
                    setLocalStorage('email', loginInfo.email);
                    setLocalStorage('token', res.data.token);
                    setLocalStorage('userID', res.data.userID);
                    setLocalStorage('accountLevel', res.data.accountLevel);
                    navigate('/');
                } else if (res.data == "NOACCOUNT") {
                    // NOACCOUNT is sent if the email was not found
                    alert('Account not found. Please check you have entered the correct email address or register below.');
                } else if (res.data == "ACCOUNTLOCKED") {
                    // ACCOUNTLOCKED is sent if the accountLocked flag is true in the DB
                    alert('This account has been locked for too many incorrect password attempts. Please contact an administrator to unlock it.')
                } else {
                    // If the login is bad, get the loginAttempts current value from the returned data
                    const incorrectAttempts = res.data?.loginAttempts;
                    // Alert the user the login failed, and if need be - that their account will be locked for future bad logins
                    if(incorrectAttempts > 1){
                        alert("Login failed. Please check that your username and password are correct. Your account will be locked after one more incorrect password attempt.")
                    } else {
                        alert("Login failed. Please check that your username and password are correct.");
                    }
                }
            })
            .catch(e => console.log(e))
    }

    // Validate the login form fields, prevent the login button from being active if either field is blank
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