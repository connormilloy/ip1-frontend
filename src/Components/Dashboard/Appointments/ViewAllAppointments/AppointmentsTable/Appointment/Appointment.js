import styles from './Appointment.module.scss';
import StatusLozenge from './StatusLozenge/StatusLozenge';
import moment from 'moment';

const Appointment = ({ apt, level, onClick }) => {
    const formatAppointment = dt => {
        return moment(dt).format("DD/MM/YYYY HH:mm:ss");
    }
    
    return(
        <tr className={styles.appointment} onClick={() => onClick(apt)}>
            <td>{level == 1 ? apt.Salesperson : apt.User}</td>
            {level == 2 && <td>{apt.Company}</td>}
            <td>{formatAppointment(apt.Appointment)}</td>
            <td className={styles.lozenge}>{<StatusLozenge status={apt.hasPassed}/>}</td>
        </tr>
    )
}

export default Appointment;