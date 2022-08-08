import logo from '../../Shared/Images/loytech.png'
import styles from './Header.module.scss';

import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../../Utilities/validateSession';

const Header = ({ moduleDescription }) => {
    const navigate = useNavigate();

    const logOff = () => {
        handleLogout()
            .then(() => navigate('/login'));
    }

    return(
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <img src={logo} className={styles.loytechLogo} />
            </div>
            <div className={styles.headerRight}>
                <div className={styles.headings}>
                    <h2 className={styles.appName}>Appointment Manager</h2>
                    <h4 className={styles.moduleDescription}>{moduleDescription}</h4>
                </div>
                <div className={styles.logOut}>
                    <span 
                        className={styles.logoutButton}
                        onClick={() => logOff()}>
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Header;