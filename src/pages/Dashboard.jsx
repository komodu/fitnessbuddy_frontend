import { useState, useEffect } from "react";
import Calendar from "../components/Calendar";

import { LineChart, DynamicBarChart, RadarChart } from "../components/Charts";

const Dashboard = () => {
  const [value, onChange] = useState(new Date());
  const [todayWorkout, setTodayWorkout] = useState(null);
  useEffect(() => {
    const fetchTodayWorkout = async () => {
      try {
        const response = await fetch("/api/today");
        if (!response.ok) throw new Error("Failed to get Workout for Today.");
        const result = await response.json();

        console.log("today workout:", result);
        setTodayWorkout(result);
      } catch (err) {
        console.err("Error fetching: ", err);
      }
    };
    fetchTodayWorkout();
  }, []);
  return (
    <div className="home d-flex justify-content-center py-4">
      <div
        className="dashboard-row row g-4"
        style={{ maxWidth: "1200px", width: "100%" }}
      >
        {/* Left Column: Charts */}
        <div className="col-12 col-lg-8 d-flex flex-column">
          <section className="charts p-3 shadow-sm rounded bg-light flex-grow-1 d-flex flex-column">
            <div className="d-flex flex-column justify-content-center align-items-center border border-lightsubtle">
              <h1 className="mb-4 text-center text-lg-start">Todays Workout</h1>
              {todayWorkout && todayWorkout.exercisesForTheDay.length == 0 ? (
                <>
                  <div className="d-flex justify-content-center align-items-center">
                    <h3>
                      {new Date(todayWorkout.date).toLocaleDateString()} :{" "}
                    </h3>
                    <h4 className="text-capitalize">{todayWorkout.name} : </h4>
                    <h4 className="text-capitalize">{todayWorkout.day}</h4>
                  </div>

                  <div className="row text-center">
                    <div className="col">
                      <img
                        src="./images/warning.png"
                        height="80"
                        alt="No data"
                      />
                      <p className="mt-2">
                        <strong>No Data fetched</strong>
                        <br />
                        There are no Exercise assigned with {todayWorkout.name}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <h1 className="mb-4 text-center text-lg-start">
              Dashboard Analytics
            </h1>
            <div className="d-flex flex-column">
              {/* Chart 1: DynamicBarChart */}
              <div className="d-flex flex-column">
                <DynamicBarChart />
              </div>
              {/* Chart 2: RadarChart */}
              <div className="d-flex flex-column">
                <RadarChart />
              </div>
              <div className="d-flex flex-column align-items-center">
                <LineChart style={{ width: "475px", height: "270px" }} />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Calendar */}
        <div className="col-10 col-lg-4 d-flex">
          <section className="calendar shadow-sm rounded bg-light flex-grow-1">
            <h2 className="mb-3 text-center text-lg-start">
              Interactive Calendar
            </h2>
            <Calendar onChange={onChange} value={value} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
