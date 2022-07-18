import { Button as BootstrapButton } from 'react-bootstrap';
import styles from './Button.module.scss';

const Button = ({ text, variant }) => {
    return(
        <BootstrapButton className={styles.button} variant={variant}>{text}</BootstrapButton>
    )
}

export default Button;