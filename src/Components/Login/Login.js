import styles from './Login.module.scss';
import logo from '../Shared/Images/loytech.png';

import LoginUI from './LoginUI/LoginUI';
import RegisterUI from './RegisterUI/RegisterUI';

import { useState } from 'react';

const Login = () => {
    const [menuState, setMenuState] = useState('login');

    // Set the menu state (either 'login' or 'register') and cause the correct menu to render
    const handleMenuStateChange = newState => {
        setMenuState(newState);
    }

    return(
        <div className={styles.login}>
            {menuState == 'login' ?
                <LoginUI 
                    handleMenuStateChange={handleMenuStateChange}
                />
                :
                <RegisterUI 
                    handleMenuStateChange={handleMenuStateChange}
                />
            }
            <div className={styles.loytechLogoWrapper}>
                <img src={logo} className={styles.loytechLogo} />
            </div>
        </div>
    )
}

export default Login;