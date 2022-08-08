import styles from './Dashboard.module.scss';
import Header from './Header/Header';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { validateSession } from '../../Utilities/validateSession';
import { getNewModuleHeading } from '../../Utilities/getModuleHeading';

import AppointmentsTable from './Appointments/ViewAllAppointments/AppointmentsTable/AppointmentsTable';
import BookNewAppointment from './Appointments/BookNewAppointment/BookNewAppointment';

// when module changes, update currentModule state
// when detect state change, check login validity for redirect

const Dashboard = () => {
    const navigate = useNavigate();
    const [moduleDescription, setModuleDescription] = useState('');
    const [validSession, setValidSession] = useState(false);
    const [module, setModule] = useState('view-all');

    useEffect(() => {
        setModuleDescription('Viewing all appointments');
    }, [])

    useEffect(() => {
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
                    </>
                </div>
            }
        </>

    )
}

export default Dashboard;