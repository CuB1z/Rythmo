import React from 'react';
import styles from '@styles/calendar/WeeklyView.module.css';

const WeeklyView = ({ datesForWeek }) => {
    return (
        <div className={styles.weeklyView}>
            {datesForWeek.map(day => (
                <div key={day.date} className={styles.day}>
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

export default WeeklyView;