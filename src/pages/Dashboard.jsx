import { useState, useEffect, useContext } from "react";
import Calendar from "../components/Calendar";
import warningLogo from "../assets/img/warning.png";
import { LineChart, DynamicBarChart, RadarChart } from "../components/Charts";
import { CurrentContext } from "../context/Context";

//! TODO: Check Validations, possible crashes (null values)
//! TODO: Check Error Handlers
//! TODO: Radar Chart must based on 10 recent workouts
//! TODO: Line Chart must depend on Selected Workout to display whelther Weight Lifted or Repetitions

//! TODO: Calendar must have assigned border color (dynamic changeable by the user) if there is assigned workout
const Dashboard = () => {
  const [value, onChange] = useState(new Date());
  const { userPlan } = useContext(CurrentContext);
  const exercises = userPlan?.exercises || null;
  console.log("EXERLKEJHLK: ", exercises);
  return (
    <div className="home d-flex justify-content-center py-4">
      <div
        className="dashboard-row row g-4 justify-content-center"
        style={{ maxWidth: "1200px", width: "100%" }}
      >
        {/* Left Column: Charts */}
        <div className="col-12 col-lg-8 d-flex flex-column">
          <section className="charts p-3 shadow-sm rounded bg-light flex-grow-1 d-flex flex-column">
            <div className="d-flex flex-column justify-content-center align-items-center border border-lightsubtle">
              {/* If UserPlan exist in User */}
              {userPlan?.date ? (
                <>
                  <h1 className="mb-4 text-center text-lg-start">
                    Todays Workout (
                    <strong className="text-capitalize">{userPlan.day}</strong>)
                  </h1>
                  {exercises.length === 0 ? (
                    <div className="row d-flex justify-content-center align-items-center gap-1">
                      <img
                        src={warningLogo}
                        alt="No Data Fetched"
                        style={{ width: "200px" }}
                      />
                      <h3 style={{ textAlign: "center" }}>No data fetched</h3>
                    </div>
                  ) : (
                    <ul>
                      {exercises?.length > 0 &&
                        exercises.map((exercise) => {
                          return <li key={exercise._id}>{exercise.title}</li>;
                        })}
                    </ul>
                  )}
                </>
              ) : (
                // User Plan not Exist in the User
                <>
                  <h1 className="mb-4 text-center text-lg-start">
                    Workout is not Assigned
                  </h1>
                  <div className="row d-flex justify-content-center align-items-center gap-1">
                    <img
                      src={warningLogo}
                      alt="No Data Fetched"
                      style={{ width: "200px" }}
                    />
                    <h3 style={{ textAlign: "center" }}>No data fetched</h3>
                  </div>
                </>
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
