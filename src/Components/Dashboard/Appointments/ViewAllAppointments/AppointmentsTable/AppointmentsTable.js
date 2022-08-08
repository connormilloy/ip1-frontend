import { returnSessionInfo } from "../../../../../Utilities/validateSession";
import styles from './AppointmentsTable.module.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';

import Button from "../../../../Shared/Button/Button";

import Appointment from "./Appointment/Appointment";

const AppointmentsTable = ({ triggerModuleChange }) => {
    const [appointmentData, setAppointmentData] = useState([]);
    const [accountLevel, setAccountLevel] = useState(1);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const sessionInfo = returnSessionInfo();
        setAccountLevel(sessionInfo.accountLevel);
    })

    useEffect(() => {
        const getAppointments = async () => {
            const sessionInfo = returnSessionInfo();
            await axios.get(`http://localhost:4000/appointments/get-appointments/${sessionInfo.userID}`, {
                "headers": {
                    "email": sessionInfo.email,
                    "token": sessionInfo.token
                }
            })
            .then(res => {
                setAppointmentData(res.data);
                setLoaded(true);
            })
            .catch(e => console.log(e))
        }

        getAppointments();
    }, [])

    return(
        <>
        {loaded &&
            <div className={styles.appointmentsTableWrapper}>
                <div className={styles.appointmentsButtons}>
                    <Button 
                        onClick={() => triggerModuleChange('book-new', 'Book a new appointment')} 
                        customWidth={"200"} 
                        className={"greenButton"} 
                        text={"Book New Appointment"} 
                    />
                </div>
                <table className={styles.appointmentsTable}>
                    <thead>
                        <tr>
                            <th>{accountLevel == 1 ? 'Salesperson' : 'User'}</th>
                            <th>Appointment Date</th>
                            <th>Appointment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentData.map((app, idx) => (
                            <Appointment key={idx} apt={app} level={accountLevel} />
                        ))}
                    </tbody>
                </table>
            </div>
        }
        </>
    )
}

export default AppointmentsTable;