import React from 'react';
import styles from '@styles/calendar/MonthlyView.module.css';

const MonthlyView = ({ datesForMonth, handleDayClick }) => {
    return (
        <div className={styles.monthlyView}>
            {datesForMonth.map(day => (
                <div key={day.date} className={styles.day} onClick={() => handleDayClick(day.date)}>
                    <span className={styles.date}>{day.day}</span>
                    {day.events.map(event => (
                        <div key={event.id} className={styles.event}>
                            {event.name}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MonthlyView;