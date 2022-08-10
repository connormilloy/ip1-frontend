import { returnSessionInfo } from "../../../../../Utilities/validateSession";
import styles from './AppointmentsTable.module.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';

import Button from "../../../../Shared/Button/Button";

import Appointment from "./Appointment/Appointment";
import { setLocalStorage } from "../../../../../Utilities/handleLocalStorage";

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
                const sorted = sortAppointments(res.data);
                setAppointmentData(sorted);
                setLoaded(true);
            })
            .catch(e => console.log(e))
        }

        getAppointments();
    }, [])

    const sortAppointments = apts => {
        const sorted = apts.sort((a, b) => a.hasPassed - b.hasPassed);
        return sorted;
    }

    const onOpenAppointment = appointment => {
        setLocalStorage('selectedAppointment', JSON.stringify(appointment));
        triggerModuleChange('manage');
    }

    return(
        <>
        {loaded &&
            <div className={styles.appointmentsTableWrapper}>
                <div className={styles.appointmentsButtons}>
                    {accountLevel == 1 &&
                        <Button 
                        onClick={() => triggerModuleChange('book-new', 'Book a new appointment')} 
                        customWidth={"200"} 
                        className={"greenButton"} 
                        text={"Book New Appointment"} 
                        />
                    }
                </div>
                {appointmentData.length > 0 ?
                    <table className={styles.appointmentsTable}>
                        <thead>
                            <tr>
                                <th>{accountLevel == 1 ? 'Salesperson' : 'User'}</th>
                                {accountLevel == 2 && <th>Company</th>}
                                <th>Appointment Date</th>
                                <th>Appointment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointmentData.map((app, idx) => (
                                <Appointment key={idx} apt={app} level={accountLevel} onClick={onOpenAppointment} />
                            ))}
                        </tbody>
                    </table>
                    :
                    <h4 className={styles.noAppointments}><span className={styles.bold}>No appointments found.</span> {accountLevel == 1 && 'Book one using the button above.'}</h4>
            }

            </div>
        }
        </>
    )
}

export default AppointmentsTable;