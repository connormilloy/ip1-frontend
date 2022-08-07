import styles from './Login.module.scss';
import logo from '../Shared/Images/loytech.png';

import LoginUI from './LoginUI/LoginUI';

const Login = () => {
    return(
        <div className={styles.login}>
            <LoginUI/>
            <div className={styles.loytechLogoWrapper}>
                <img src={logo} className={styles.loytechLogo} />
            </div>
        </div>
    )
}

export default Login;