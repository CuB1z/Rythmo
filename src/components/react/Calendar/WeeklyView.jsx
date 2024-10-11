import React from 'react';
import styles from '@styles/calendar/WeeklyView.module.css';

const WeeklyView = ({ datesForWeek, handleDeleteEvent }) => {
    return (
        <div className={styles.weeklyView}>
            {datesForWeek.map(day => (
                <div key={day.date} className={styles.day}>
                    <span className={styles.date}>{day.day}</span>
                    {day.events.map(event => (
                        <div key={event.id} className={styles.event}>
                            {event.name}
                            <button
                                className={styles.deleteEvent}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteEvent(day.date, event.id);
                                }}
                            >
                                <img
                                    src="/trash.svg"
                                    alt="Delete Icon"
                                    className={styles.deleteIcon}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteEvent(day.date, event.id);
                                    }}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default WeeklyView;