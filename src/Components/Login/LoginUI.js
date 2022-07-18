import styles from './LoginUI.module.scss';

import { useState } from 'react';

import Button from '../Shared/Button/Button';
import InputBox from "../Shared/InputBox/InputBox";

const LoginUI = () => {
    const [loginDetails, setLoginDetails] = useState({
        "email": "",
        "password": ""
    })
    
    const handleLoginFieldsChange = (e, field) => {
        setLoginDetails(prevState => {
            return {...prevState, [field]: e.target.value};
        })
    }
    
    return(
        <div className={styles.loginUI}>
            <div className={styles.loginUIHeader}>
                <h2 className={styles.header}>Login</h2>
            </div>
            <div className={styles.loginUIInputs}>
                <InputBox
                    name={'login-email'}
                    placeholder={'Email address...'}
                    type={'email'}
                    onChange={e => handleLoginFieldsChange(e, 'email')}
                />
                <InputBox
                    name={'login-password'}
                    placeholder={'Password...'}
                    type={'password'}
                    onChange={e => handleLoginFieldsChange(e, 'password')}
                />
            </div>
            <div className={styles.loginButtons}>
                <Button text={"Login"} variant={'success'}/>
                <Button text={"Register"} variant={'primary'}/>
            </div>
        </div>
    )
}

export default LoginUI;