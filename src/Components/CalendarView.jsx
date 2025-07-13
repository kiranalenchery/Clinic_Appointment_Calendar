import React from "react";
import { Calendar } from "react-big-calendar";
import ListEventsModal from "./ListEventsModal";
import AppointmentModal from "./AppointmentsModal";
import useCalendar from "../hooks/useCalendar";
import useAppointmentModals from "../hooks/useAppointmentModals";
import "react-big-calendar/lib/css/react-big-calendar.css";

const CalendarView = () => {
  const {
    localizer,
    appointments,
    currentDate,
    view,
    isMobile,
    onNavigate,
    onView,
    handleDateChange,
    formatDateForInput,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  } = useCalendar();

  const {
    modalOpen,
    listModalOpen,
    selectedSlot,
    editingEvent,
    eventsForDay,
    handleSlotSelect,
    handleEdit,
    handleModalClose,
    handleListModalClose,
    handleAddNewFromList,
    handleDeleteFromList,
  } = useAppointmentModals(
    appointments,
    (event) => {
      editingEvent ? updateAppointment(event) : addAppointment(event);
    },
    deleteAppointment
  );

  return (
    <div className="p-2 md:p-4">
      {isMobile && (
        <div className="mb-4 bg-white rounded-lg shadow-sm border p-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={formatDateForInput(currentDate)}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}

      <div
        className="bg-white rounded-lg shadow-sm border overflow-hidden overflow-y-auto"
        style={{ maxHeight: "80vh" }}
      >
        <Calendar
          localizer={localizer}
          events={appointments}
          views={isMobile ? ["day"] : ["month", "week", "day", "agenda"]}
          view={view}
          onView={onView}
          onNavigate={onNavigate}
          defaultDate={currentDate}
          startAccessor="start"
          endAccessor="end"
          style={{ minHeight: "600px" }}
          className="rbc-calendar-mobile" 
          popup
          popupOffset={30}
          selectable="ignoreEvents"
          step={30}
          timeslots={2}
          onSelectSlot={(slotInfo) =>
            handleSlotSelect(slotInfo, isMobile, view)
          }
          components={{
            toolbar: (props) => (
              <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                  <button
                    type="button"
                    onClick={() => props.onNavigate("PREV")}
                    className="rbc-btn rbc-btn-prev"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => props.onNavigate("TODAY")}
                    className="rbc-btn rbc-btn-today"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => props.onNavigate("NEXT")}
                    className="rbc-btn rbc-btn-next"
                  >
                    ›
                  </button>
                </span>
                <span className="rbc-toolbar-label">{props.label}</span>
                <span className="rbc-btn-group hidden md:inline-flex">
                  {props.views.map((name) => (
                    <button
                      key={name}
                      type="button"
                      className={`rbc-btn ${
                        props.view === name ? "rbc-active" : ""
                      }`}
                      onClick={() => props.onView(name)}
                    >
                      {name}
                    </button>
                  ))}
                </span>
              </div>
            ),
          }}
        />
      </div>

      {listModalOpen && (
        <ListEventsModal
          open={listModalOpen}
          events={eventsForDay}
          onClose={handleListModalClose}
          onEdit={handleEdit}
          onAddNew={handleAddNewFromList}
          onDelete={handleDeleteFromList}
        />
      )}

      {modalOpen && (
        <AppointmentModal
          open={modalOpen}
          onClose={handleModalClose}
          onSave={(event) => {
            editingEvent ? updateAppointment(event) : addAppointment(event);
            handleModalClose();
          }}
          slotInfo={selectedSlot}
          editData={editingEvent}
        />
      )}
    </div>
  );
};

export default CalendarView;
