import { useState, useCallback, useEffect } from "react";
import moment from "moment";
import { momentLocalizer } from "react-big-calendar";
import useAppointments from "./useAppointments"; 

const localizer = momentLocalizer(moment);

const useCalendar = () => {
  const { appointments, addAppointment, updateAppointment, deleteAppointment } =
    useAppointments();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month"); 
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setView(mobile ? "day" : "month"); 
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  const onNavigate = useCallback((newDate) => {
    setCurrentDate(newDate);
  }, []);

  const onView = useCallback((newView) => {
    setView(newView);
  }, []);

  const handleDateChange = useCallback((e) => {
    const newDate = new Date(e.target.value);
    setCurrentDate(newDate);
  }, []);

  const formatDateForInput = useCallback((date) => {
    return moment(date).format("YYYY-MM-DD");
  }, []);

  return {
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
  };
};

export default useCalendar;