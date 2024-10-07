import styles from "@styles/Calendar.module.css"
import { fake_data } from "@utils/fake_calendar"

export default function Calendar() {
    return (
        <div id="calendar-view">
            <div id="calendar-buttons">
                <button id="add-event-button" className={styles.hidden}>Add Evento</button>
                <button id="back-to-month" className={styles.hidden}>Volver al Mes</button>
            </div>
            <div id="calendar-month" className={styles.calendar}>
                {
                    fake_data.map((week, index) => {
                        return (
                            <div key={index} className={styles.day}>
                                <span>{week.date}</span>
                                {
                                    week.events.map((event, index) => {
                                        return (
                                            <div key={index} className={styles.event}>
                                                <span>{event.name}</span>
                                                <span>{event.hour}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div id="calendar-week" className="calendar hidden"></div>

            // Popup para añadir evento
            <div id="event-popup" className="popup hidden">
                <h2>Añadir Evento</h2>
                <form id="event-form">
                    <label for="event-name">Nombre del evento:</label>
                    <input type="text" id="event-name" required />
                    <br /><br />

                    <label for="event-day">Día de la semana:</label>
                    <select id="event-day">
                        <option value="0">Lunes</option>
                        <option value="1">Martes</option>
                        <option value="2">Miercoles</option>
                        <option value="3">Jueves</option>
                        <option value="4">Viernes</option>
                        <option value="5">Sabado</option>
                        <option value="6">Domingo</option>
                    </select>
                    <br /><br />

                    <label for="event-hour">Hora:</label>
                    <select id="event-hour">
                        <option value="0">00:00</option>
                        <option value="1">01:00</option>
                        <option value="2">02:00</option>
                        <option value="3">03:00</option>
                        <option value="4">04:00</option>
                        <option value="5">05:00</option>
                        <option value="6">06:00</option>
                        <option value="7">07:00</option>
                        <option value="8">08:00</option>
                        <option value="9">09:00</option>
                        <option value="10">10:00</option>
                        <option value="11">11:00</option>
                        <option value="12">12:00</option>
                        <option value="13">13:00</option>
                        <option value="14">14:00</option>
                        <option value="15">15:00</option>
                        <option value="16">16:00</option>
                        <option value="17">17:00</option>
                        <option value="18">18:00</option>
                        <option value="19">19:00</option>
                        <option value="20">20:00</option>
                        <option value="21">21:00</option>
                        <option value="22">22:00</option>
                        <option value="23">23:00</option>
                    </select>
                    <br /><br />

                    <button type="submit">Add</button>
                    <button type="button" id="cancel-button">Cancelar</button>
                </form>
            </div>

            // Overlay
            <div id="overlay" className="overlay hidden"></div>
        </div>
    )
}