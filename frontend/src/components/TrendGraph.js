import React from "react";
import { Line } from "react-chartjs-2";

function TrendGraph(props) {
  const labels = props.labels;

  const data = {
    labels: labels,
    datasets: [
      {
        // label: "Machine wise data",
        backgroundColor: "rgb(0, 0, 255)",
        // backgroundColor: "rgb(255, 99, 99)",
        borderColor: "rgb(0, 0, 255)",
        data: props.data,
      },
    ],
  };
  const options = {
    legend: {
      display: false,
    },
    maintainAspectRatio: false, // Don't maintain w/h ratio
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //       },
    //     },
    //   ],
    // },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ height: "90%", width: "90%" }} className="m-3">
      <Line data={data} options={options} />
    </div>
  );
}

export default TrendGraph;
