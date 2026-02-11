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
    console.log("today: ", today.getDay());
    console.log("name: ", dayName);
    // Save to localStorage
    localStorage.setItem("today", dayName);

    console.log("Saved day:", dayName);
  }, []);

  return null; // no UI needed
};
