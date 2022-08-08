import { getLocalStorage, setLocalStorage } from "./handleLocalStorage";
import axios from 'axios';

const purgeSessionData = () => {
    setLocalStorage('email', '');
    setLocalStorage('token', '');
    setLocalStorage('userID', '');
}

export const validateSession = () => {
    return new Promise(async (resolve, reject) => {
        const email = getLocalStorage('email');
        const token = getLocalStorage('token');

        if(!email || !token) {
            resolve(false);
            purgeSessionData();
        } else {
            await axios.post('http://localhost:4000/accounts/validate-session', {email: email, token: token})
            .then(res => {
                if(res.data === true){
                    resolve(true);
                } else {
                    resolve(false);
                    purgeSessionData();
                }
            })
            .catch(e => reject(e))
        }
    })
}

export const handleLogout = () => {
    return new Promise(async (resolve, reject) => {
        purgeSessionData();
        resolve();
    })
}