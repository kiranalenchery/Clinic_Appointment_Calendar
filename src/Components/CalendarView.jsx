// components/CalendarView.jsx
import React, { useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ListEventsModal from "./ListEventsModal";
import AppointmentModal from "./AppointmentsModal";
import useAppointments from "../hooks/useAppointments";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const { appointments, addAppointment, updateAppointment, deleteAppointment } =
    useAppointments();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [eventsForDay, setEventsForDay] = useState([]);
  const [viewingDate, setViewingDate] = useState(null);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const onNavigate = useCallback((newDate) => {
    setCurrentDate(newDate);
    setSelectedDate(newDate); // optional: if needed elsewhere
  }, []);
  const onView = useCallback((newView) => {
    setView(newView);
  }, []);

  const getEventsForDate = (events, date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  };

  const handleSlotSelect = (slotInfo) => {
    const clickedDate = new Date(slotInfo.start);
    setViewingDate(clickedDate);

    const eventsOnThatDay = getEventsForDate(appointments, clickedDate);
    setSelectedSlot(slotInfo);

    if (eventsOnThatDay.length > 0) {
      setEventsForDay(eventsOnThatDay);
      setListModalOpen(true);
    } else {
      setModalOpen(true);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setListModalOpen(false);
    setModalOpen(true);
  };

  return (
    <div className="p-4">
      <Calendar
        localizer={localizer}
        events={appointments}
        views={["month", "week", "day", "agenda"]}
        view={view}
        onView={onView}
        onNavigate={onNavigate}
        date={currentDate}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        selectable
        onSelectSlot={handleSlotSelect}
        // onNavigate={(date) => setSelectedDate(date)}
        style={{ height: "80vh" }}
      />

      {listModalOpen && (
        <ListEventsModal
          open={listModalOpen}
          events={eventsForDay}
          onClose={() => setListModalOpen(false)}
          onEdit={handleEdit}
          onAddNew={() => {
            setListModalOpen(false);
            setModalOpen(true);
          }}
          onDelete={(id) => {
            deleteAppointment(id);
            setListModalOpen(false);
          }}
        />
      )}

      {modalOpen && (
        <AppointmentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingEvent(null);
          }}
          onSave={(event) => {
            editingEvent ? updateAppointment(event) : addAppointment(event);
          }}
          slotInfo={selectedSlot}
          editData={editingEvent}
        />
      )}
    </div>
  );
};

export default CalendarView;
