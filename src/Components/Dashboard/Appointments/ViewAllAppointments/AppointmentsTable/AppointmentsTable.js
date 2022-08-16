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
        // Set the user's account level based on the sessionInfo
        // Depending on what a user's account level is, elements of the dashboard will render differently
        const sessionInfo = returnSessionInfo();
        setAccountLevel(sessionInfo.accountLevel);
    }, [])

    useEffect(() => {
        // Get all appointments for a userID from the server and store them in a state variable for rendering
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

    // Sort the appointments array to group appointments together based on completed/upcoming status
    const sortAppointments = apts => {
        const sorted = apts.sort((a, b) => a.hasPassed - b.hasPassed);
        return sorted;
    }

    // Trigger a module change when a rendered appointment is clicked on
    // This moves the user to the manage/amend appointment screen
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
                        // Render the book new appointment button if the user is not a salesperson
                        <Button 
                        onClick={() => triggerModuleChange('book-new', 'Book a new appointment')} 
                        customWidth={"200"} 
                        className={"greenButton"} 
                        text={"Book New Appointment"} 
                        />
                    }
                </div>
                {appointmentData.length > 0 ?
                    // Render a table with appointments if the appointments array has any data
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
                                // Loop through the appointmentData array and render a new Appointment component for each entry
                                <Appointment key={idx} apt={app} level={accountLevel} onClick={onOpenAppointment} />
                            ))}
                        </tbody>
                    </table>
                    :
                    // Render the 'No Appointments' heading if the array is empty
                    <h4 className={styles.noAppointments}><span className={styles.bold}>No appointments found.</span> {accountLevel == 1 && 'Book one using the button above.'}</h4>
            }

            </div>
        }
        </>
    )
}

export default AppointmentsTable;