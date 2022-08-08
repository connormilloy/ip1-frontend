import styles from './Dashboard.module.scss';
import Header from './Header/Header';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { validateSession } from '../../Utilities/validateSession';

// when module changes, update currentModule state
// when detect state change, check login validity for redirect

const Dashboard = () => {
    const navigate = useNavigate();
    const [moduleDescription, setModuleDescription] = useState('');
    const [validSession, setValidSession] = useState(false);

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

    return(
        <>
            {validSession &&
                <div className={styles.dashboard}>
                    <Header moduleDescription={moduleDescription}/>
                </div>
            }
        </>

    )
}

export default Dashboard;