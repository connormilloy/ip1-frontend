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
import moment from 'moment';

//  placeholder, onChange, type, name, label
const BookNewAppointment = ({ triggerModuleChange })  => {
    const [suitableSalespeople, setSuitableSalespeople] = useState([]);
    const [salespersonExistingAppointments, setSalespersonExistingAppointments] = useState([]);
    const [badTimes, setBadTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [selectedTime, setSelectedTime] = useState();
    const [userCategory, setUserCategory] = useState('');
    const [bookingInfo, setBookingInfo] = useState({
        "salesperson": "",
        "dateTime": ""
    })

    // Called on module load
    useEffect(() => {
        // Find all suitable salespeople for a new booking
        // Suitable salespeople have the same specialty category as the user's company category
        const getSuitableSalespeople = async () => {
            const sessionInfo = returnSessionInfo();
            const headers = {
                "token": sessionInfo.token,
                "email": sessionInfo.email
            }
            await axios.get(`http://localhost:4000/accounts/get-user-category/${sessionInfo.userID}`, {headers: headers})
                .then(async res => {
                    const targetCategory = res.data;
                    setUserCategory(targetCategory);
                    await axios.get(`http://localhost:4000/appointments/get-salespeople-by-specialty/${targetCategory}`, {headers: headers})
                        .then(res => {
                            setSuitableSalespeople(res.data);
                        })
                        .catch(e => console.log(e))
                })
        }

        getSuitableSalespeople();
    }, [])

    // Called whenever a salesperson is selected
    useEffect(() => {
        // Format the date/time of each date in the date picker
        const formatDateTimeObject = dt => {
            const dtSplit = dt.split('T');
            return {'date': moment(dtSplit[0]).format("DD/MM/YYYY"), 'time': dtSplit[1]};
        }

        // Get all booked appointments by salespersonID
        // We will use these to determine which times are 'bad' for future bookings
        const getAppointmentsByID = async () => {
            if(!bookingInfo.salesperson) return;
            const sessionInfo = returnSessionInfo();
            const headers = {
                "token": sessionInfo.token,
                "email": sessionInfo.email
            }

            await axios.get(`http://localhost:4000/appointments/get-appointments/${bookingInfo.salesperson}`, {headers: headers})
                .then(res => {
                    const appointments = [];
                    for(let appointment of res.data){
                        appointments.push(formatDateTimeObject(appointment['Appointment']));
                    }
                
                    setSalespersonExistingAppointments(appointments);
                })
                .catch(e => console.log(e))
        }

        getAppointmentsByID();
    }, [bookingInfo.salesperson])

    // Whenever the selected salesperson is changed, set the bookingInfo state's salesperson key to the chosen value
    const handleSalespersonChange = async e => {
        setBookingInfo(prevState => {
            return {...prevState, "salesperson": e};
        })
    }

    // Prevent weekends and dates in the past from being selected via the date picker
    const disableWeekendsAndPastDates = date => {
        let acceptableDate = false;
        if(moment(date).day() !== 0 && moment(date).day() !== 6) acceptableDate = true;
        if(moment(date).isBefore()) acceptableDate = false;

        return acceptableDate;
    }

    // Whenever a date is selected, loop the salespersonExistingAppointments state
    // Extract any booked times for that date and pass them to the badTimesArr
    // This array will be sent to the time picker and used to prevent these times from being picked
    const handleDateSelect = date => {
        const badTimesArr = [];

        for(let app of salespersonExistingAppointments){
            if(app['date'] == moment(date).format("DD/MM/YYYY")){
                const split = app['time'].split(':');
                badTimesArr.push(new Date(0, 0, 0, split[0], split[1]));
            };
        }

        setBadTimes(badTimesArr);
        setSelectedDate(date);
    }

    // Whenever the selected time is changed, set the bookingInfo state's dateTime key to the new date and time
    const handleTimeChange = time => {
        const appDate = moment(selectedDate).format('YYYY-MM-DD');
        const appTime = moment(time).format('HH:mm:ss');
        const dateTime = `${appDate}T${appTime}`;

        setSelectedTime(time);

        setBookingInfo(prevState => {
            return {...prevState, 'dateTime': dateTime}
        })
    }

    // Check if the bookingInfo fields both have data before enabling the book appointment button
    const isValidAppointmentSettings = () => {
        return bookingInfo.dateTime !== "" && bookingInfo.salesperson !== "";
    }

    // Create a new appointment and send it to the server to be stored on the database
    const submitNewAppointment = async () => {
        const sessionInfo = returnSessionInfo();

        const appointmentObject = {
            "salespersonID": bookingInfo.salesperson,
            "userID": sessionInfo.userID,
            "appointmentDateTime": bookingInfo.dateTime
        }

        const headers = {
            "token": sessionInfo.token,
            "email": sessionInfo.email
        }

        await axios.post('http://localhost:4000/appointments/create-new-appointment', appointmentObject, { headers: headers})
            .then(res => {
                alert(res.data);
                // Return the user to the dashboard after successfully creating the appointment
                triggerModuleChange('view-all');
            })
            .catch(e => console.log(e))
    }

    return(
        <div className={styles.bookNewAppointment}>
            {userCategory && <h4>Book a new <span className={styles.userCategory}>{userCategory}</span> appointment: </h4>}
            <div className={styles.bookingControls}>
                <Form.Label className={styles.label}>Salesperson</Form.Label>
                <Form.Select className={styles.salespersonSelect} defaultValue={''} onChange={e => handleSalespersonChange(e.target.value)}>
                        <option disabled value={''} key={'default'}>Select a salesperson...</option>
                    {suitableSalespeople.map(salesperson =>
                        <option value={salesperson.ID} key={salesperson.ID}>{salesperson.Salesperson}</option>
                    )}
                </Form.Select>

                <Form.Label className={styles.label}>Date</Form.Label>
                <ReactDatePicker
                    onKeyDown={e => e.preventDefault()} 
                    filterDate={disableWeekendsAndPastDates} 
                    dateFormat={"dd/MM/yyyy"} 
                    selected={selectedDate} 
                    onChange={date => handleDateSelect(date)}
                    className={styles.datePicker}
                />

                <Form.Label className={styles.label}>Time</Form.Label>
                <ReactDatePicker 
                    onKeyDown={e => e.preventDefault()}
                    onChange={time => handleTimeChange(time)}
                    popperPlacement="top-start"
                    excludeTimes={badTimes}
                    selected={selectedTime}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeFormat="HH:mm"
                    dateFormat="hh:mm aa"
                    minTime={new Date(0, 0, 0, 8, 0)}
                    maxTime={new Date(0, 0, 0, 17, 0)}
                    className={styles.timePicker}
                />
                <div className={styles.buttonRow}>
                    <Button onClick={() => submitNewAppointment()} text={"Book Appointment"} customWidth={180} disabled={!isValidAppointmentSettings()} className={"greenButton"} />
                    <Button onClick={() => triggerModuleChange('view-all')} text={"Go Back"} customWidth={180} className={"cancelButton"}/>
                </div>
            </div>

        </div>
    )
}

export default BookNewAppointment;