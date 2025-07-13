import { useEffect, useState } from "react";

const APPOINTMENTS_KEY = "appointments";

const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(APPOINTMENTS_KEY);
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: appointment.id || crypto.randomUUID(),
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const updateAppointment = (updatedAppointment) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? { ...appointment, ...updatedAppointment }
          : appointment
      )
    );
  };
  const deleteAppointment = (id) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== id)
    );
  };

  return {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  };
};

export default useAppointments;
