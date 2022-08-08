import styles from './Appointment.module.scss';
import moment from 'moment';

import StatusLozenge from './StatusLozenge/StatusLozenge';

const Appointment = ({ apt, level }) => {
    const hasAppointmentPassed = date => {
        const now = moment();
        const appDate = moment(date);

        return appDate.diff(now, 'seconds') < 1;
    }

    return(
        <tr>
            <td>{level == 1 ? apt.Salesperson : apt.User}</td>
            <td>{apt.Appointment}</td>
            <td className={styles.lozenge}>{<StatusLozenge status={hasAppointmentPassed(apt.Appointment)}/>}</td>
        </tr>
    )
}

export default Appointment;