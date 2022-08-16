import styles from './StatusLozenge.module.scss';

const StatusLozenge = ({ status }) => {
    // Return a green lozenge if the appointment is upcoming, and a grey one if it has passed
    return(
        <div className={`${styles.statusLozenge} ${status == true ? styles.completedLozenge : styles.upcomingLozenge}`}>
            <span className={styles.lozengeText}>{status == true ? 'Completed' : 'Upcoming'}</span>
        </div>
    )
}

export default StatusLozenge;