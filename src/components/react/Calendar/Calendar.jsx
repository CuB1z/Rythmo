import styles from "@styles/Calendar/Calendar.module.css";
import { useState, useEffect } from "react";
import { retrieveEvents, addEvent, removeEvent } from "@utils/events.js";
import MonthlyView from "@components/react/Calendar/MonthlyView.jsx";
import WeeklyView from "@components/react/Calendar/WeeklyView.jsx";
import AddEventForm from "@components/react/Calendar/AddEventForm.jsx";
import AddFilterForm from "@components/react/Calendar/AddFilterForm.jsx"; // Añadido
import Button from "@components/react/Button.jsx";

export default function Calendar() {
  const [calendarData, setCalendarData] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  const [viewMode, setViewMode] = useState("month");
  const [datesForMonth, setDatesForMonth] = useState([]);
  const [datesForWeek, setDatesForWeek] = useState([]);
  const [filterSubject, setFilterSubject] = useState(null); // Añadido

  useEffect(() => {
    const fetchData = async () => {
      const response = await retrieveEvents();
      if (response.data) {
        setCalendarData(response.data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const generatedDates = generateDatesForMonth();
    setDatesForMonth(generatedDates);
  }, [calendarData, filterSubject]); // Añadido filterSubject como dependencia

  const generateDatesForMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = new Date(year, month, 1);
    const dates = [];

    while (date.getMonth() === month) {
      const formattedDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      ).toISOString().split("T")[0];

      dates.push({
        date: formattedDate,
        day: date.getDate(),
        events: calendarData.filter(
          (event) =>
            event.date === formattedDate &&
            (filterSubject === null || event.subject === filterSubject) // Añadido filtro por asignatura
        ),
      });

      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const generateDatesForWeek = (selectedDate) => {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - dayOfWeek);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const current = new Date(startOfWeek);
      current.setDate(startOfWeek.getDate() + i);
      const formattedDate = current.toISOString().split("T")[0];
      dates.push({
        date: formattedDate,
        day: current.getDate(),
        events: calendarData.filter(
          (event) =>
            event.date === formattedDate &&
            (filterSubject === null || event.subject === filterSubject) // Añadido filtro por asignatura
        ),
      });
    }

    return dates;
  };

  useEffect(() => {
    setDatesForMonth(generateDatesForMonth());
  }, [calendarData, filterSubject]); // Añadido filterSubject como dependencia

  const handleDayClick = (selectedDate) => {
    const weekDates = generateDatesForWeek(selectedDate);
    setDatesForWeek(weekDates);
    setViewMode("week");
  };

  const handleAddNewEvent = async (newEvent) => {
    try {
      const response = await addEvent(
        newEvent.name,
        newEvent.date,
        newEvent.subject
      );
      if (response.error) {
        return;
      }
      setCalendarData(response.data);
    } catch (err) {
      console.error("Error en handleAddNewEvent:", err);
    }
  };

  const handleDeleteEvent = async (date, eventId) => {
    try {
      const response = await removeEvent(eventId);

      if (response.error) {
        return;
      }

      setCalendarData(response.data);
    } catch (err) {
      console.error("Error en handleDeleteEvent:", err);
    }
  };

  const handleFilterChange = (event) => {
    setFilterSubject(event.target.value); // Añadido
  };

  const handleAddFilter = (subject) => { // Añadido
    setFilterSubject(subject); // Añadido
  };

  const handleDeleteFilter = () => {
    setFilterSubject(null);
  }

  const currentView =
    viewMode === "month" ? (
      <MonthlyView
        datesForMonth={datesForMonth}
        handleDayClick={handleDayClick}
        handleDeleteEvent={handleDeleteEvent}
      />
    ) : (
      <WeeklyView
        datesForWeek={datesForWeek}
        handleDeleteEvent={handleDeleteEvent}
      />
    );

  return (
    <div id="calendar-view" className={styles.calendarView}>
      <div id="calendar-buttons" className={styles.calendarButtons}>
        <Button onClick={() => setViewMode("month")} customClass="primary">
          <span>Monthly View</span>
        </Button>
        <Button onClick={() => setIsFilterPopupVisible(true)} customClass="primary">
          <span>Add Filter</span>
        </Button>
        <Button onClick={handleDeleteFilter} customClass="primary">
          <span>Remove Filter</span>
        </Button>
        <Button onClick={() => setIsPopupVisible(true)} customClass="primary">
          <span>Add Event</span>
        </Button>
      </div>
      {currentView}
      <AddFilterForm
        show={isFilterPopupVisible}
        setShow={setIsFilterPopupVisible}
        onAddFilter={handleAddFilter}
      />
      <AddEventForm
        show={isPopupVisible}
        setShow={setIsPopupVisible}
        onAddEvent={handleAddNewEvent}
      />
    </div>
  );
}