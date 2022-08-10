import { Form } from 'react-bootstrap';
import styles from './InputBox.module.scss';

const InputBox = ({ placeholder, onChange, type, name, label, disabled, defaultText }) => {
    return(
        <div className={styles.inputGroup}>
            {label && 
                <Form.Label>{label}</Form.Label>
            }
            
            <Form.Control
                className={styles.inputBox}
                type={type}
                placeholder={placeholder}
                onChange={e => onChange(e)}
                id={name}
                disabled={disabled}
                value={defaultText}
            />
        </div>
    )
}

export default InputBox;