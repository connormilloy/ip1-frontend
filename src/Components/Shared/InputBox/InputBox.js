import { Form } from 'react-bootstrap';
import styles from './InputBox.module.scss';

const InputBox = ({ placeholder, onChange, type, name }) => {
    return(
        <Form.Control
            className={styles.inputBox}
            type={type}
            placeholder={placeholder}
            onChange={e => onChange(e)}
            id={name}
        />
    )
}

export default InputBox;