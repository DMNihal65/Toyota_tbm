import React from 'react'
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

function GraphAbnormality(props) {

  const labels = props.labels;

  const data = {
    labels: labels,
    datasets: [
      {
        // label: "Machine wise data",
        backgroundColor: ["rgb(0, 0, 255)", "rgb(0, 255, 0)", "rgb(255, 0,0)", "rgb(255, 110,255)"],
        // backgroundColor: "rgb(255, 99, 99)",
        borderColor: "rgb(255, 99, 99)",
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
    <div style={{ height: "15vh" ,  width:"30vw" }} className="m-3">    
    <Bar data={data} options={options} />
  </div>
  )
}

export default GraphAbnormality