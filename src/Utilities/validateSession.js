import { getLocalStorage, setLocalStorage } from "./handleLocalStorage";
import axios from 'axios';

// Remove all session information from localStorage
const purgeSessionData = () => {
    setLocalStorage('email', '');
    setLocalStorage('token', '');
    setLocalStorage('userID', '');
    setLocalStorage('accountLevel');
}

// Validate a user's session
export const validateSession = () => {
    return new Promise(async (resolve, reject) => {
        // Get the email/token from localStorage
        const email = getLocalStorage('email');
        const token = getLocalStorage('token');

        // If the email or token is blank, invalidate the session and remove the old session data
        if(!email || !token) {
            resolve(false);
            purgeSessionData();
        } else {
            // Send the email and token to the server to be validated
            await axios.post('http://localhost:4000/accounts/validate-session', {email: email, token: token})
            .then(res => {
                if(res.data === true){
                    resolve(true);
                } else {
                    // If the session is bad (token mismatch or old token), invalidate the session and remove the old session data
                    resolve(false);
                    purgeSessionData();
                }
            })
            .catch(e => reject(e))
        }
    })
}

// Delete old session data when the logout button is pressed
export const handleLogout = () => {
    return new Promise(async (resolve, reject) => {
        purgeSessionData();
        resolve();
    })
}

// Return all current session info in a formatted object
export const returnSessionInfo = () => {
    const info = {
        "email": getLocalStorage('email'),
        "token": getLocalStorage('token'),
        "userID": getLocalStorage('userID'),
        "accountLevel": getLocalStorage('accountLevel')
    }

    return info;
}