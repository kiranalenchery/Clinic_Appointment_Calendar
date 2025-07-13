import { useState, useCallback } from "react";

const useAppointmentModals = (appointments, onSave, onDelete) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventsForDay, setEventsForDay] = useState([]);

  const getEventsForDate = useCallback((events, date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  }, []);

  const handleSlotSelect = useCallback(
    (slotInfo, isMobile, currentView) => {
      const clickedDate = new Date(slotInfo.start);
      setSelectedSlot(slotInfo);

      const eventsOnThatDay = getEventsForDate(appointments, clickedDate);

      if (isMobile && currentView === "day") {
        setEditingEvent(null);
        setModalOpen(true);
      } else if (eventsOnThatDay.length > 0) {
        setEventsForDay(eventsOnThatDay);
        setListModalOpen(true);
      } else {
        setEditingEvent(null); 
        setModalOpen(true);
      }
    },
    [appointments, getEventsForDate]
  );

  const handleEdit = useCallback((event) => {
    setEditingEvent(event);
    setListModalOpen(false);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setEditingEvent(null); 
    setSelectedSlot(null); 
  }, []);

  const handleListModalClose = useCallback(() => {
    setListModalOpen(false);
    setEventsForDay([]); 
  }, []);

  const handleAddNewFromList = useCallback(() => {
    setListModalOpen(false);
    setEditingEvent(null); 
    setModalOpen(true);
  }, []);

  const handleDeleteFromList = useCallback(
    (id) => {
      onDelete(id); 
      setListModalOpen(false); 
    },
    [onDelete]
  );

  return {
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
  };
};

export default useAppointmentModals;
