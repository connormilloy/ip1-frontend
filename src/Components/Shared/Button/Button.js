import { Button as BootstrapButton } from 'react-bootstrap';
import styles from './Button.module.scss';

const Button = ({ text, className, onClick, customWidth=125, disabled }) => {
    return(
        <BootstrapButton 
            className={`${styles[className]} ${styles.button}`} 
            variant={'success'}
            onClick={onClick}
            style={{width: `${customWidth}px`}}
            disabled={disabled}
        >
            {text}
        </BootstrapButton>
    )
}

export default Button;