import styles from './Appointment.module.scss';
import moment from 'moment';



import StatusLozenge from './StatusLozenge/StatusLozenge';

const Appointment = ({ apt, level, onClick }) => {
    return(
        <tr onClick={() => onClick(apt)}>
            <td>{level == 1 ? apt.Salesperson : apt.User}</td>
            <td>{apt.Appointment}</td>
            <td className={styles.lozenge}>{<StatusLozenge status={apt.hasPassed}/>}</td>
        </tr>
    )
}

export default Appointment;