import styles from './RegisterUI.module.scss';
import { useState } from 'react';

import InputBox from '../../Shared/InputBox/InputBox';
import Button from '../../Shared/Button/Button';
import { Form } from 'react-bootstrap';

import axios from 'axios';

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

    const handleRegistration = async () => {
        for(let [key, value] of Object.entries(registrationInfo)){
            if(!value) return alert('Missing required fields. Please ensure you have entered your information correctly and try again.');
        }

        await axios.post('http://localhost:4000/accounts/new-account', registrationInfo)
            .then(res => {
                alert(res.data.message);
                if(res.data.success) handleMenuStateChange('login');
            })
            .catch(e => console.log(e))
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
                    type={"password"}
                    onChange={e => handleFieldChange(e, 'password')}
                    label={"Password"}
                />
                <div className={styles.companyCategorySelect}>
                    <Form.Label>Company Category</Form.Label>
                    <Form.Select defaultValue={""} className={styles.companyCategory} onChange={e => handleFieldChange(e, 'companyCategory')}>
                        <option disabled value="">Select a category...</option>
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
                    onClick={() => handleRegistration()}
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