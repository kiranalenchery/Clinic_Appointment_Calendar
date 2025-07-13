import React from "react";
import CalendarView from "../Components/CalendarView";
import LogoutButton from "../Components/LogoutButton";

const HomePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Clinic Appointment Calendar</h1>
      <LogoutButton />
      <CalendarView />
    </div>
  );
};

export default HomePage;
