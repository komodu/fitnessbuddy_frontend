import { useEffect } from "react";

export const SaveTodayDay = () => {
  useEffect(() => {
    // Get today's date
    const today = new Date();

    // Get day name
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = daysOfWeek[today.getDay()]; // getDay() returns 0-6

    // Save to localStorage
    localStorage.setItem("today", dayName);
  }, []);

  return null; // no UI needed
};
