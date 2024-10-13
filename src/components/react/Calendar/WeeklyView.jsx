import styles from '@styles/Calendar/WeeklyView.module.css';
import Day from '@components/react/Calendar/Day.jsx';

const WeeklyView = ({ datesForWeek, handleDeleteEvent }) => {
    return (
        <div className={styles.weeklyView}>
            {
                datesForWeek.map(day => (
                    <Day key={day.date} day={day} handleDeleteEvent={handleDeleteEvent} isWeekView />
                ))
            }
        </div>
    );
};

export default WeeklyView;