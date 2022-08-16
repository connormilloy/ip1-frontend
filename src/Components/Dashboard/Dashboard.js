import styles from './Dashboard.module.scss';
import Header from './Header/Header';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { validateSession } from '../../Utilities/validateSession';
import { getNewModuleHeading } from '../../Utilities/getModuleHeading';

import AppointmentsTable from './Appointments/ViewAllAppointments/AppointmentsTable/AppointmentsTable';
import BookNewAppointment from './Appointments/BookNewAppointment/BookNewAppointment';
import ManageAppointment from './Appointments/ManageAppointment/ManageAppointment';

const Dashboard = () => {
    const navigate = useNavigate();
    const [moduleDescription, setModuleDescription] = useState('');
    const [validSession, setValidSession] = useState(false);
    const [module, setModule] = useState('view-all');

    useEffect(() => {
        // When the dashboard loads, set the module description (grey subheading in the header)
        // This will invoke a new validation check against the user's session as the other useEffect is listening for changes to this state variable
        setModuleDescription('Viewing all appointments');
    }, [])

    useEffect(() => {
        // Validate the user's session and set the state accordingly
        // If the session is invalid, redirect to /login
        validateSession()
            .then(isValid => {
                if(isValid){
                    setValidSession(true);
                } else {
                    setValidSession(false);
                    navigate('/login');
                }
            })
            .catch(e => console.log(e))
    }, [moduleDescription])

    // Set the module state variable based on what the user navigates to
    // Whatever the module variable is set to will determine what section of the app renders
    const triggerModuleChange = (module) => {
        setModule(module);
        setModuleDescription(getNewModuleHeading(module));
    }

    return(
        <>
            {validSession &&
                <div className={styles.dashboard}>
                    <Header moduleDescription={moduleDescription}/>
                    <>
                        {module === 'view-all' && <AppointmentsTable triggerModuleChange={triggerModuleChange} />}
                        {module === 'book-new' && <BookNewAppointment triggerModuleChange={triggerModuleChange} />}
                        {module === 'manage' && <ManageAppointment triggerModuleChange={triggerModuleChange} />}
                    </>
                </div>
            }
        </>

    )
}

export default Dashboard;