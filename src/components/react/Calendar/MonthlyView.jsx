import styles from '@styles/Calendar/MonthlyView.module.css';
import Day from '@components/react/Calendar/Day.jsx';

const MonthlyView = ({ datesForMonth, handleDayClick, handleDeleteEvent }) => {
    return (
        <div className={styles.monthlyView}>
            {
                datesForMonth.map(day => (
                    <Day key={day.date} day={day} handleDayClick={handleDayClick} handleDeleteEvent={handleDeleteEvent} />
                ))
            }
        </div>
    );
};

export default MonthlyView;