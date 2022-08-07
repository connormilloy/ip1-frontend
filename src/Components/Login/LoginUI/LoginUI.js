import styles from './LoginUI.module.scss';
import { useState } from 'react';

import InputBox from '../../Shared/InputBox/InputBox';
import Button from '../../Shared/Button/Button';

const LoginUI = () => {
    const [loginInfo, setLoginInfo] = useState({
        "email": "",
        "password": ""
    })

    const handleFieldChange = (e, field) => {
        setLoginInfo(prevState => {
            return {...prevState, [field]: e.target.value};
        })
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
                    type={"email"}
                    onChange={e => handleFieldChange(e, 'password')}
                    label={"Password"}
                />
            </div>
            <div className={styles.bottomUI}>
                <Button
                    text={"Login"}
                    className={"loginButton"}
                />
                <div className={styles.linksWrapper}>
                    <a href="#" className={styles.forgotPassword}>Forgotten password</a>
                    <a href="#" className={styles.registerAccount}>Register for an account</a>
                </div>
            </div>
        </div>
    )
}

export default LoginUI;