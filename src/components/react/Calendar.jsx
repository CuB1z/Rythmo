import React, { useState, useEffect } from 'react';
import styles from "@styles/Calendar.module.css";
import buttonStyles from "@styles/Button.module.css";
import { fake_data as initialData } from "@utils/fake_calendar";
import stylesm from '@styles/Modal.module.css';  
import Modal from "@components/react/Modal.jsx"

export default function Calendar() {
  const [calendarData, setCalendarData] = useState(initialData);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: '',
    name: '',
  });
  const [viewMode, setViewMode] = useState('month');
  const [datesForMonth, setDatesForMonth] = useState([]);
  const [datesForWeek, setDatesForWeek] = useState([]);

  // Función para generar las fechas del mes actual
  const generateDatesForMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = new Date(year, month, 1);
    const dates = [];

    while (date.getMonth() === month) {
      const formattedDate = date.toLocaleDateString('en-CA');
      dates.push({
        date: formattedDate,
        day: date.getDate(),
        events: calendarData.find((d) => d.date === formattedDate)?.events || [],
      });
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  useEffect(() => {
    const generatedDates = generateDatesForMonth();
    setDatesForMonth(generatedDates);
  }, [calendarData]);

  // Función para calcular las fechas de una semana basada en un día específico
  const generateDatesForWeek = (selectedDate) => {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay(); // 0 es domingo, 1 es lunes, etc.
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - ((dayOfWeek + 6) % 7)); // Encuentra el lunes más cercano

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const current = new Date(startOfWeek);
      current.setDate(startOfWeek.getDate() + i);
      const formattedDate = current.toLocaleDateString('en-CA');
      dates.push({
        date: formattedDate,
        day: current.getDate(),
        events: calendarData.find((d) => d.date === formattedDate)?.events || [],
      });
    }

    return dates;
  };

  // Cambiar a vista semanal cuando se hace clic en un día específico de la vista mensual
  const handleDayClick = (selectedDate) => {
    const weekDates = generateDatesForWeek(selectedDate);
    setDatesForWeek(weekDates);
    setViewMode('week');
  };

  // Función para añadir un nuevo evento
  const handleAddNewEvent = (e) => {
    e.preventDefault();
    const formattedDate = newEvent.date;
    setCalendarData((prevData) => {
      const updatedData = [...prevData];
      const dateIndex = updatedData.findIndex((day) => day.date === formattedDate);
      if (dateIndex !== -1) {
        updatedData[dateIndex].events.push({
          id: `${new Date().getTime()}`,
          name: newEvent.name,
        });
      } else {
        updatedData.push({
          date: formattedDate,
          events: [{ id: `${new Date().getTime()}`, name: newEvent.name }],
        });
      }
      return updatedData;
    });
    setIsPopupVisible(false);
    setNewEvent({ date: '', name: '' });
  };

 
  const handleDeleteEvent = (date, eventId) => {
    setCalendarData((prevData) => {
      const updatedData = prevData.map((day) => {
        if (day.date === date) {
          const filteredEvents = day.events.filter((event) => event.id !== eventId);
          return { ...day, events: filteredEvents };
        }
        return day;
      });
      return updatedData;
    });
    
    if (viewMode === 'week' && selectedWeekStart) {
      const updatedWeekDates = generateDatesForWeek(selectedWeekStart);
      setDatesForWeek(updatedWeekDates);
    }
  };

  return (
    <div id="calendar-view">
      <div id="calendar-buttons">
        <button className={`${buttonStyles.button} ${buttonStyles.secondary}`} onClick={() => setViewMode('month')}>Vista Mensual</button>
        <button className={`${buttonStyles.button} ${buttonStyles.secondary}`} onClick={() => setIsPopupVisible(true)}>Añadir Evento</button>
      </div>

      {viewMode === 'month' && (
        <div id="calendar-month" className={styles.calendarGrid}>
          {datesForMonth.map((dayData, index) => (
            <div key={index} className={styles.day} onClick={() => handleDayClick(dayData.date)}>
              <span className={styles.dayNumber}>{dayData.day}</span>
              {dayData.events.map((event, eventIndex) => (
                <div key={eventIndex} className={styles.event}>
                  <span>{event.name}</span>
                  <button className={styles.deleteButton} onClick={() => handleDeleteEvent(dayData.date, event.id)}>
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {viewMode === 'week' && (
        <div id="calendar-week" className={styles.calendarGridWeek}>
          {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, index) => (
            <div key={index} className={styles.calendarDayHeader}>
              {day}
            </div>
          ))}

          {datesForWeek.map((dayData, index) => (
            <div key={index} className={styles.dayWeek}>
              <span className={styles.dayNumber}>{dayData.day}</span>
              {dayData.events.map((event, eventIndex) => (
                <div key={eventIndex} className={styles.event}>
                  <span>{event.name}</span>
                  <button className={styles.deleteButton} onClick={() => handleDeleteEvent(dayData.date, event.id)}>
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <Modal title="Añadir Evento" show={isPopupVisible} setShow={setIsPopupVisible}>
        <form onSubmit={handleAddNewEvent}>
          <label htmlFor="event-name">Nombre del evento:</label>
          <input
            type="text"
            id="event-name"
            name="name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            required
          />
          <br /><br />

          <label htmlFor="event-date">Fecha del evento (YYYY-MM-DD):</label>
          <input
            type="date"
            id="event-date"
            name="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            required
          />
          <br /><br />

          <button type="submit" className={`${buttonStyles.button} ${buttonStyles.secondary}`}>Añadir</button>
          <button type="button" className={`${buttonStyles.button} ${buttonStyles.tertiary}`} onClick={() => setIsPopupVisible(false)}>Cancelar</button>
        </form>
      </Modal>
    </div>
  );
}
