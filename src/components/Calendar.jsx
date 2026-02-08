import React, { useState, useContext } from "react";
import { CurrentContext, ModalContext } from "../context/Context";
import UniversalModal from "./UniversalModal";
import CalendarWorkout from "./CalendarWorkout";

const Calendar = ({ exercises }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { userPlan } = useContext(CurrentContext);
  const workoutPlan = userPlan?.userPlan;
  const { openModal } = useContext(ModalContext);
  // console.log("data calendar: ", userPlan);
  // Get the current month and year
  const getCurrentMonthYear = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    return { month, year };
  };

  const { month, year } = getCurrentMonthYear();

  // Function to handle previous month

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // Function to handle next month

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Calculate first day of the month and number of days in the month
  const getMonthDetails = () => {
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday, 6 = Saturday
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // Number of days in the month
    return { firstDayOfMonth, lastDateOfMonth };
  };

  const { firstDayOfMonth, lastDateOfMonth } = getMonthDetails();

  // Create an array of days to be rendered

  const createDaysArray = () => {
    const daysArray = [];

    // Add empty slots for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }

    // Add actual days
    for (let day = 1; day <= lastDateOfMonth; day++) {
      daysArray.push(day);
    }
    return daysArray;
  };
  const daysArray = createDaysArray();

  // Determine if today is the current day
  const isToday = (day) => {
    return (
      day === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    );
  };

  //! This is for dynamic Calendar from backend =========================
  const buildDateFromDay = (day) => {
    const date = new Date(year, month, Number(day));
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const planStart = new Date(workoutPlan?.startDate);
  planStart.setHours(0, 0, 0, 0);

  const planEnd = new Date(workoutPlan?.endDate);
  planEnd.setHours(0, 0, 0, 0);

  return (
    <div className="calendar-container">
      <UniversalModal />
      <div className="calendar-header">
        <button className="prev-month" onClick={goToPreviousMonth}>
          Prev
        </button>
        <div className="month-year">
          {new Date(year, month).toLocaleDateString("default", {
            month: "long",
          })}{" "}
          {year}
        </div>
        <button className="next-month" onClick={goToNextMonth}>
          Next
        </button>
      </div>
      <div className="calendar-body">
        <div className="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="days-grid">
          {daysArray.map((day) => {
            const date = buildDateFromDay(day);
            const hasWorkout =
              workoutPlan && date >= planStart && date <= planEnd;

            let workout = null;
            if (hasWorkout) {
              const weekday = date
                .toLocaleDateString("en-US", { weekday: "long" })
                .toLowerCase();
              workout = workoutPlan.planTemplate.weeklySchedule[weekday];
            }

            return (
              <div
                key={day}
                className={`day 
                  ${day === null ? "empty-day" : ""} 
                  ${isToday(day) ? "current-day" : ""} 
                  ${hasWorkout && !isToday(day) ? "workout-day" : ""}`}
                onClick={() => {
                  console.log("test");
                  openModal(
                    `Workout Exercise : ${month}/${day}/${year} ${" "} ${workout.name} Day`,
                    <CalendarWorkout
                      exercises={{ exercises }}
                      workoutday={workout.name}
                    />,
                  );
                }}
              >
                {day && (
                  <>
                    <span className="day-number">{day}</span>

                    {hasWorkout && workout && (
                      <span
                        className="workout-tooltip"
                        style={{ backgroundColor: workout.color || "#333" }} // dynamic color
                      >
                        {workout.name}
                      </span>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
