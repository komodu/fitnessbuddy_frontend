import { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import warningLogo from "../assets/img/warning.png";
import { Link } from "react-router-dom";
import { LineChart, DynamicBarChart, RadarChart } from "../components/Charts";
import { ExercisesContext } from "../context/Context";
import { useUserData, useExercises } from "../hooks/accessor/ContextAccessors";
import infoTooltip from "../assets/img/info.png";
import LoaderSVG from "../assets/img/loader.svg";
import StartWorkoutComponent from "../components/StartWorkoutComponent";
//! TODO: Check Validations, possible crashes (null values)
//! TODO: Check Error Handlers

//! TODO: Radar Chart must based on 10 recent workouts
//! TODO: Line Chart must depend on Selected Workout to display whelther Weight Lifted or Repetitions
//! TODO: Calendar must have assigned border color (dynamic changeable by the user) if there is assigned workout
//! TODO: Add Recent Workouts depends on current workout
const Dashboard = () => {
  const [value, onChange] = useState(new Date());
  const { exercises } = useExercises();
  const { activePlan, todayExercises } = useUserData();
  const [filterRange, setFilterRange] = useState("1");
  const [dropdown, setDropdown] = useState(false);

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loader, setLoader] = useState(true);

  const dayToday = localStorage.getItem("today");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 3000);
    console.log(
      "workoutname: ",
      activePlan?.planTemplate?.weeklySchedule[localStorage.getItem("today")],
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home d-flex justify-content-center py-4">
      <div
        className="dashboard-row row g-4 justify-content-center"
        style={{ maxWidth: "1200px", width: "100%" }}
      >
        {/* Left Column: Calendar */}
        {/* col-10 col-lg-4 d-flex */}
        <div className="col-12 col-lg-4 d-flex flex-column">
          <section className="calendar shadow-sm rounded bg-light flex-grow-1">
            <div className="d-flex flex-column justify-content-center align-items-center border border-lightsubtle">
              {/* If UserPlan exist in User */}
              {
                activePlan && !loader ? (
                  <div
                    className="d-flex justify-content-center align-items-center flex-column"
                    style={{ width: "300px" }}
                  >
                    <h1 className="text-center text-lg-start text-center">
                      Todays Workout
                    </h1>
                    <h4>
                      <span className="text-center">
                        <strong className="text-capitalize">({dayToday}</strong>{" "}
                        :{" "}
                        <strong className="text-capitalize">
                          {
                            activePlan?.planTemplate?.weeklySchedule[
                              dayToday.toLowerCase()
                            ].name
                          }
                          )
                        </strong>
                      </span>
                    </h4>
                    {todayExercises.length == 0 ? (
                      <div className="row d-flex justify-content-center align-items-center gap-1">
                        <img
                          src={warningLogo}
                          alt="No Data Fetched"
                          style={{ width: "200px" }}
                        />
                        <div className="d-flex justify-content-center align-items-center">
                          <h3 style={{ textAlign: "center" }}>
                            {activePlan?.planTemplate?.weeklySchedule[
                              dayToday.toLowerCase()
                            ].name != "Rest"
                              ? "No Workout Assigned."
                              : "Today is Rest Day "}
                            <span title="Assign Exercise in the Day assigned workout">
                              <img
                                className="info-tooltip"
                                src={infoTooltip}
                                alt=""
                              />
                            </span>
                          </h3>
                        </div>
                      </div>
                    ) : (
                      <div className="row d-flex justify-content-center align-items-center gap-1">
                        <ul>
                          {todayExercises &&
                            todayExercises.map((exercise) => {
                              return (
                                <li key={exercise._id}>{exercise.title}</li>
                              );
                            })}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : loader ? (
                  <>
                    {" "}
                    <div
                      className="d-flex justify-content-center align-items-center gap-1 "
                      style={{ width: "300px", minHeight: "40vh" }}
                    >
                      <img
                        src={LoaderSVG}
                        className="loader-icon"
                        style={{ width: "60px", height: "60px" }}
                      />
                    </div>
                  </>
                ) : (
                  <>
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
                      <Link to="/workout-plan">
                        <button className="btn btn-primary w-100 mb-3">
                          Add Workout Plan
                        </button>
                      </Link>
                    </>
                  </>
                )
                // User Plan not Exist in the User
              }
            </div>
            <h2 className="mb-3 text-center text-lg-start">
              Interactive Calendar
            </h2>
            <Calendar onChange={onChange} value={value} exercises={exercises} />
            {/* Chart 2: RadarChart */}
            <div className="d-flex flex-column">
              <RadarChart />
            </div>
          </section>
        </div>

        {/* Right Column */}
        {/* col-12 col-lg-8 d-flex flex-column */}
        <div className="col-10 col-lg-8 d-flex flex-column">
          <section className="charts p-3 shadow-sm rounded bg-light flex-grow-1 d-flex flex-column">
            {/* Start Workout Component */}
            <div className="d-flex flex-column justify-content-center align-items-center my-2 py-2">
              <h2> COMPONENT START WORKOUT</h2>
              <StartWorkoutComponent />
            </div>
            <div className="d-flex align-items-center justify-content-center my-2">
              <div className="dropdown">
                <button
                  style={{ position: "relative", width: "300px" }}
                  id="select-exercise"
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdown((x) => !x);
                  }}
                >
                  {selectedExercise || "Select exercise"}
                </button>

                {dropdown && (
                  <ul className="dropdown-menu dropdown-menu-end show">
                    {exercises.length > 0 ? (
                      exercises.map((exercise) => {
                        return (
                          <li key={exercise._id}>
                            <button
                              className="dropdown-item text-capitalize"
                              style={{ width: "300px" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedExercise(exercise.title);
                                setDropdown((e) => !e);
                              }}
                            >
                              {exercise.title}
                            </button>
                          </li>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* --------Filter -------- */}
            <div className="btn-group" role="group" aria-label="Time Filter">
              <input
                type="radio"
                className="btn-check"
                name="timefilter"
                id="3d"
                onClick={() => setFilterRange("1")}
                checked={filterRange === "1" ? true : false}
              />
              <label className="btn btn-outline-primary" for="3d">
                3D
              </label>

              <input
                type="radio"
                class="btn-check"
                name="timefilter"
                id="7d"
                onClick={() => setFilterRange("2")}
                checked={filterRange === "2" ? true : false}
              />
              <label className="btn btn-outline-primary" for="7d">
                7D
              </label>

              <input
                type="radio"
                class="btn-check"
                name="timefilter"
                id="14d"
                onClick={() => setFilterRange("3")}
                checked={filterRange === "3" ? true : false}
              />
              <label className="btn btn-outline-primary" for="14d">
                14D
              </label>

              <input
                type="radio"
                class="btn-check"
                name="timefilter"
                id="30d"
                onClick={() => setFilterRange("4")}
                checked={filterRange === "4" ? true : false}
              />
              <label className="btn btn-outline-primary" for="30d">
                30D
              </label>
            </div>

            {/* Workout Chart Analysis */}
            <div className="d-flex flex-column">
              <div className="d-flex flex-column align-items-center">
                <LineChart style={{ width: "475px", height: "270px" }} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
