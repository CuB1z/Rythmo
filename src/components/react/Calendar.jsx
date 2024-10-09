import React, { useState, useEffect } from 'react';
import styles from "@styles/Calendar.module.css";
import buttonStyles from "@styles/Button.module.css";
import { fake_data as initialData } from "@utils/fake_calendar";
import stylesm from '@styles/Modal.module.css';  
import Modal from "@components/react/Modal.jsx"

export default function Calendar() {
  // Convertimos fake_data en un estado
  const [calendarData, setCalendarData] = useState(initialData);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: '',
    name: '',
  });

  const [viewMode, setViewMode] = useState('month');
  // 3
  const generateDatesForMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();  // Mes actual
    const date = new Date(year, month, 1);  // Iniciamos en el primer día del mes
    const dates = [];
  
    while (date.getMonth() === month) {
      // Usamos 'en-CA' para garantizar que el formato sea 'YYYY-MM-DD'
      const formattedDate = date.toLocaleDateString('en-CA'); 
  
      dates.push({
        date: formattedDate,  
        day: date.getDate(),  
        events: calendarData.find((d) => d.date === formattedDate)?.events || [],  // Eventos para ese día
      });
  
      date.setDate(date.getDate() + 1);  // Avanzamos al siguiente día
    }
  
    return dates;
  };
  

  // Generar las fechas para el mes actual 1
  const [datesForMonth, setDatesForMonth] = useState([]);

  // 2
  useEffect(() => {
    const generatedDates = generateDatesForMonth();
    setDatesForMonth(generatedDates);
  }, [calendarData]);

  // Función para cambiar la vista del calendario
  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleAddEventClick = () => {
    setIsPopupVisible(true);
  };

  const handleCancelClick = () => {
    setIsPopupVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

//gestion de add nuevo evento 
const handleAddNewEvent = (e) => {
  e.preventDefault();

  
  const formattedDate = newEvent.date; 

  setCalendarData((prevData) => {
    const updatedData = [...prevData];
    const dateIndex = updatedData.findIndex((day) => day.date === formattedDate);

    if (dateIndex !== -1) {
      // Añadimos el evento al día existente
      updatedData[dateIndex].events.push({
        id: `${new Date().getTime()}`,  
        name: newEvent.name,
      });
    } else {
      
      updatedData.push({
        date: formattedDate, // Aquí usamos la fecha tal cual, sin modificarla
        events: [{ id: `${new Date().getTime()}`, name: newEvent.name }],
      });
    }

    return updatedData;  
  });
  // Cerramos el popup y reseteamos el formulario
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
};





  return (
    <div id="calendar-view">
      <div id="calendar-buttons">
        <button className={`${buttonStyles.button} ${buttonStyles.secondary}`} onClick={() => handleViewChange('month')}>Vista Mensual</button>
        <button className={`${buttonStyles.button} ${buttonStyles.secondary}`} onClick={() => handleViewChange('week')}>Vista Semanal</button>
        <button className={`${buttonStyles.button} ${buttonStyles.secondary}`} onClick={handleAddEventClick}>Añadir Evento</button>
      </div>

      {viewMode === 'month' && (
        <div id="calendar-month" className={styles.calendarGrid}>
          {datesForMonth.map((dayData, index) => (
          <div key={index} className={styles.day}>
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
        
          {datesForMonth.slice(0, 7).map((dayData, index) => (
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
            onChange={handleInputChange}
            required
          />
          <br /><br />

          <label htmlFor="event-date">Fecha del evento (YYYY-MM-DD):</label>
          <input
            type="date"
            id="event-date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            required
          />
          <br /><br />

          <button type="submit" className={`${buttonStyles.button} ${buttonStyles.secondary}`}>Añadir</button>  {/* Aplicando la clase .button */}
          <button type="button" className={`${buttonStyles.button} ${buttonStyles.tertiary}`} onClick={() => setIsPopupVisible(false)}>Cancelar</button>  {/* Botón Cancelar */}
        </form>
      </Modal>

      
    </div>
  );
}
