import { Button as BootstrapButton } from 'react-bootstrap';
import styles from './Button.module.scss';

const Button = ({ text, className }) => {
    return(
        <BootstrapButton className={`${styles[className]} ${styles.button}`} variant={'success'}>{text}</BootstrapButton>
    )
}

export default Button;