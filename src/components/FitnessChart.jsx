import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { CDBContainer } from "cdbreact";
import { aggregateExercisesData } from "../utils/aggregateExercisesData";
import "@/ChartConfig";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFitnessStats } from "../hooks/useFitnessStats";

//! TODO: Update this into dynamic
export const DynamicBarChart = () => {
  const [data, setData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(194, 116, 161, 0.5)",
        borderColor: "rgb(194, 116, 161)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(71, 225, 167, 0.5)",
        pointHoverBorderColor: "rgb(71, 225, 167)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  });

  useEffect(() => {
    setInterval(function () {
      var oldDataSet = data.datasets[0];
      var newData = [];

      for (var x = 0; x < data.labels.length; x++) {
        newData.push(Math.floor(Math.random() * 100));
      }

      var newDataSet = {
        ...oldDataSet,
      };

      newDataSet.data = newData;

      var newState = {
        ...data,
        datasets: [newDataSet],
      };

      setData(newState);
    }, 5000);
  }, []);

  return (
    <CDBContainer>
      <h3 className="mt-5">Dynamicly Refreshed Bar chart</h3>
      <Bar data={data} options={{ responsive: true }} />
    </CDBContainer>
  );
};

// export default DynamicBarChart;
// ! TODO: Date must be according to the filter e.g: 3D = 3Days ago it must show the previous dates
// ! and the weights / sets and repetition that in those particular days

export function WorkoutLineChart({ workoutSessions, days = 7 }) {
  const chartData = aggregateExercisesData(workoutSessions, days);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sets"
            stroke="#8884d8"
            name="Highest Sets"
          />
          <Line
            type="monotone"
            dataKey="reps"
            stroke="#82ca9d"
            name="Highest Reps"
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#ff7300"
            name="Highest Weight"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export function FitnessRadar({ workoutSessions }) {
  const stats = useFitnessStats({ workoutSessions });

  const radarData = [
    { subject: "Strength", score: stats.strengthScore },
    { subject: "Cardio", score: stats.cardioScore },
    { subject: "Mobility", score: stats.mobilityScore },
    { subject: "Volume", score: stats.volumeScore },
    { subject: "Consistency", score: stats.consistencyScore },
  ];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Radar
            name="Workout Stats"
            dataKey="score"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// export default RadarChart;
