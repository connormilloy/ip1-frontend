// render white box with salespeople relevant to category
// dropdown to pick salesperson
// filter times list down, excluding known upcoming appointment times (whole hour)

import axios from 'axios';

import { returnSessionInfo } from '../../../../Utilities/validateSession';

import { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';

import styles from './BookNewAppointment.module.scss';
import Button from '../../../Shared/Button/Button';
import InputBox from '../../../Shared/InputBox/InputBox';
import { Form } from 'react-bootstrap';

//  placeholder, onChange, type, name, label
const BookNewAppointment = ({ triggerModuleChange })  => {
    const [suitableSalespeople, setSuitableSalespeople] = useState([]);
    const [salespersonExistingAppointments] = useState([]);
    const [bookingInfo, setBookingInfo] = useState({
        "salesperson": "",
        "dateTime": ""
    })

    useEffect(() => {
        const getSuitableSalespeople = async () => {
            const sessionInfo = returnSessionInfo();
            const headers = {
                "token": sessionInfo.token,
                "email": sessionInfo.email
            }
            await axios.get(`http://localhost:4000/accounts/get-user-category/${sessionInfo.userID}`, {headers: headers})
                .then(async res => {
                    const targetCategory = res.data;
                    await axios.get(`http://localhost:4000/appointments/get-salespeople-by-specialty/${targetCategory}`, {headers: headers})
                        .then(res => {
                            setSuitableSalespeople(res.data);
                        })
                        .catch(e => console.log(e))
                })
        }

        getSuitableSalespeople();
    }, [])

    const handleFieldChange = (e, field) => {
        setBookingInfo(prevState => {
            return {...prevState, [field]: e.target.value};
        })
    }

    const handleSalespersonChange = e => {
        setBookingInfo(prevState => {
            return {...prevState, "salesperson": e};
        })
    }

    return(
        <div className={styles.bookNewAppointment}>
            <select onChange={e => handleSalespersonChange(e.target.value)}>
                {suitableSalespeople.map(salesperson =>
                    <option key={salesperson.ID}>{salesperson.Salesperson}</option>
                )}
            </select>
            <Button onClick={() => triggerModuleChange('view-all')} text={"Go Back"} className={"cancelButton"}/>
        </div>
    )
}

export default BookNewAppointment;