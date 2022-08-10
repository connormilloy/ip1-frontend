import styles from './Appointment.module.scss';
import StatusLozenge from './StatusLozenge/StatusLozenge';

const Appointment = ({ apt, level, onClick }) => {
    return(
        <tr className={styles.appointment} onClick={() => onClick(apt)}>
            <td>{level == 1 ? apt.Salesperson : apt.User}</td>
            {level == 2 && <td>{apt.Company}</td>}
            <td>{apt.Appointment}</td>
            <td className={styles.lozenge}>{<StatusLozenge status={apt.hasPassed}/>}</td>
        </tr>
    )
}

export default Appointment;