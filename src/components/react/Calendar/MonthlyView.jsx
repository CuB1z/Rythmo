import React from 'react';
import styles from '@styles/calendar/MonthlyView.module.css';

const MonthlyView = ({ datesForMonth, handleDayClick, handleDeleteEvent }) => {
    return (
        <div className={styles.monthlyView}>
            {datesForMonth.map(day => (
                <div key={day.date} className={styles.day} onClick={() => handleDayClick(day.date)}>
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

export default MonthlyView;