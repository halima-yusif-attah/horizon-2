"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";

ChartJs.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ accounts }: DoughnutChartProps) {
  const accountBalances = accounts.map((account) => account.currentBalance);
  const accountNames = accounts.map((account) => account.name);

  const data = {
    labels: accountNames,
    datasets: [
      {
        label: "Banks",
        data: accountBalances,
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
  };
  return (
 
       <Doughnut 
      data={data} 
      options={{
        cutout: "60%",
        plugins: {
            legend: {
                display: false
            }
        }
      }}
      />
    
  );
}

export default DoughnutChart;
