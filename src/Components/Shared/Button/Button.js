import { Button as BootstrapButton } from 'react-bootstrap';
import styles from './Button.module.scss';

const Button = ({ text, className, onClick }) => {
    return(
        <BootstrapButton 
            className={`${styles[className]} ${styles.button}`} 
            variant={'success'}
            onClick={onClick}
        >
            {text}
        </BootstrapButton>
    )
}

export default Button;