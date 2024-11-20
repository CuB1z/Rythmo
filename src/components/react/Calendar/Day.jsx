import styles from "@styles/Calendar/Day.module.css";
import Button from "@components/react/Button.jsx";
import Trash from "@components/react/icons/Trash.jsx";

export default function Day({ day, handleDayClick, handleDeleteEvent, isWeekView }) {
    // Add a click handler to the day div if handleDayClick is passed
    const dayClick = () => handleDayClick ? handleDayClick(day.date) : () => {}

    return (
        <div
            className={`${styles.day} ${isWeekView ? styles.week : ""}`}
            onClick={dayClick}
        >
            <span className={styles.date}>{day.day}</span>
            <div className={styles.events}>
                {day.events.map(event => (
                    <div key={event.id} className={styles.event}>
                        <span>{event.name}</span>
                        <Button
                            customClass="tertiary"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEvent(day.date, event.id);
                            }}
                        >
                            <Trash />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}