import styles from './RegisterUI.module.scss';
import { useState } from 'react';

import InputBox from '../../Shared/InputBox/InputBox';
import Button from '../../Shared/Button/Button';
import { Form } from 'react-bootstrap';

const LoginUI = ({ handleMenuStateChange }) => {
    const [registrationInfo, setRegistrationInfo] = useState({
        "name": "",
        "companyName": "",
        "email": "",
        "password": "",
        "companyCategory": ""
    })

    const handleFieldChange = (e, field) => {
        setRegistrationInfo(prevState => {
            return {...prevState, [field]: e.target.value};
        })
    }

    return(
        <div className={styles.registerUI}>
            <div className={styles.inputBoxes}>
                <InputBox
                    name={"register-name"}
                    type={"text"}
                    onChange={e => handleFieldChange(e, 'name')}
                    label={"Name"}
                />
                <InputBox
                    name={"register-companyName"}
                    type={"text"}
                    onChange={e => handleFieldChange(e, 'companyName')}
                    label={"Company Name"}
                />
                <InputBox
                    name={"login-email"}
                    type={"email"}
                    onChange={e => handleFieldChange(e, 'email')}
                    label={"Email"}
                />
                <InputBox
                    name={"login-password"}
                    type={"email"}
                    onChange={e => handleFieldChange(e, 'password')}
                    label={"Password"}
                />
                <div className={styles.companyCategorySelect}>
                    <Form.Label>Company Category</Form.Label>
                    <Form.Select className={styles.companyCategory} onChange={e => handleFieldChange(e, 'companyCategory')}>
                        <option value="Food and Drink">Food and Drink</option>
                        <option value="Fashion and Accessories">Fashion and Accessories</option>
                        <option value="Beauty and Grooming">Beauty and Grooming</option>
                        <option value="Culture and Learning">Culture and Learning</option>
                    </Form.Select>
                </div>
            </div>
            <div className={styles.bottomUI}>
                <Button
                    text={"Register"}
                    className={"loginButton"}
                />
                <Button
                    text={"Cancel"}
                    className={"cancelButton"}
                    onClick={() => handleMenuStateChange('login')}
                />
            </div>
        </div>
    )
}

export default LoginUI;