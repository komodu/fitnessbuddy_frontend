import { useState } from "react";
import Calendar from "../components/Calendar";


import { LineChart, DynamicBarChart, RadarChart } from "../components/Charts";

const Dashboard = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="home d-flex justify-content-center py-4">
      <div
        className="dashboard-row row g-4"
        style={{ maxWidth: "1200px", width: "100%" }}
      >
        {/* Left Column: Charts */}
        <div className="col-12 col-lg-8 d-flex flex-column">
          <section className="charts p-3 shadow-sm rounded bg-light flex-grow-1 d-flex flex-column">
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
              <div className="d-flex flex-column">
                <LineChart />
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
