import styles from './StatusLozenge.module.scss';

const StatusLozenge = ({ status }) => {
    return(
        <div className={`${styles.statusLozenge} ${status == true ? styles.completedLozenge : styles.upcomingLozenge}`}>
            <span className={styles.lozengeText}>{status == true ? 'Completed' : 'Upcoming'}</span>
        </div>
    )
}

export default StatusLozenge;