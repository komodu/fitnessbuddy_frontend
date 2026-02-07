import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { CDBContainer } from "cdbreact";
import { Line, Radar } from "react-chartjs-2";
import "@/ChartConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

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
export const LineChart = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // const getCurrentDate = () => {
  //   const month = currentDate.getMonth();
  //   const year = currentDate.getFullYear();
  //   const day = currentDate.getDate();
  //   return { month, year, day };
  // };
  // const { currentMonth, currentYear, currentDay } = getCurrentDate();

  // const dateToday = new Date(currentYear, currentMonth, currentDay).getDate();
  console.log("lchart: ", new Date(currentDate));
  // setCurrentDate(dateToday);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Weight (KG)",
        data: labels.map(() => faker.datatype.number({ min: 5, max: 40 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Repetition",
        data: labels.map(() => faker.datatype.number({ min: 8, max: 25 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Sets",
        data: labels.map(() => faker.datatype.number({ min: 2, max: 5 })),
        borderColor: "#00ff00",
        backgroundColor: "#15c215",
      },
    ],
  };
  return (
    <CDBContainer>
      <Line options={options} data={data} />
    </CDBContainer>
  );
};

export const RadarChart = () => {
  const [data] = useState({
    labels: ["Strength", "Consistency", "Volume", "Cardio", "Mobility"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(194, 116, 161, 0.5)",
        borderColor: "rgb(194, 116, 161)",
        data: [65, 59, 90, 81, 56],
      },
      {
        label: "My Second dataset",
        backgroundColor: "rgba(71, 225, 167, 0.5)",
        borderColor: "rgb(71, 225, 167)",
        data: [28, 48, 40, 19, 96],
      },
    ],
  });

  return (
    <CDBContainer>
      <h3 className="mt-5">Radar chart</h3>
      <Radar data={data} options={{ responsive: true }} />
    </CDBContainer>
  );
};

// export default RadarChart;
