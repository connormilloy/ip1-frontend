import styles from './ManageAppointment.module.scss';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { getLocalStorage } from '../../../../Utilities/handleLocalStorage';
import { returnSessionInfo } from '../../../../Utilities/validateSession';
import Button from '../../../Shared/Button/Button';
import InputBox from '../../../Shared/InputBox/InputBox';
import StatusLozenge from '../ViewAllAppointments/AppointmentsTable/Appointment/StatusLozenge/StatusLozenge';
import moment from 'moment';

const ManageAppointment = ({ triggerModuleChange }) => {
    const [appointment, setAppointment] = useState(JSON.parse(getLocalStorage('selectedAppointment')));

    // When the cancel button is pressed, first confirm the user wants to cancel the appointment
    // If they confirm, call the delete endpoint to remove the appointment from the database
    const handleDelete = async () => {
        const confirmation = window.confirm('Cancel this appointment?');

        if(confirmation){
            const sessionInfo = returnSessionInfo();

            const headers = {
                "token": sessionInfo.token,
                "email": sessionInfo.email
            }

            const appointmentData = {
                "appointmentID": appointment['ID']
            }
            await axios.post('http://localhost:4000/appointments/cancel-appointment', appointmentData, { headers: headers})
                .then((res) => {
                    window.alert(res.data);
                    // Return the user to the dashboard after successfully cancelling an appointment
                    triggerModuleChange('view-all');
                })
                .catch(e => window.alert(e))
        }
    }

    return(
        <div className={styles.manageAppointment}>
            <div className={styles.appointmentFields}>
                <InputBox label={"User"} disabled={true} defaultText={appointment.User} />
                <InputBox label={"Company"} disabled={true} defaultText={appointment.Company} />
                <InputBox label={"Salesperson"} disabled={true} defaultText={appointment.Salesperson} />
                <InputBox label={"Date/Time"} disabled={true} defaultText={moment(appointment.Appointment).format("DD/MM/YYYY HH:mm:ss")} />
                <div className={styles.appointmentStatus}>
                    <span>Appointment Status:</span>
                    <StatusLozenge status={appointment.hasPassed} />
                </div>
            </div>
            <div className={styles.buttonRow}>
                <Button text={"Go back"} className={"greenButton"} onClick={() => triggerModuleChange('view-all')} />
                {!appointment.hasPassed && <Button text={"Cancel"} onClick={() => handleDelete()} className={"cancelButton"} /> }
            </div>
        </div>
    )
}

export default ManageAppointment;