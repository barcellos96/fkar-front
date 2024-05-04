"use client";

import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(ArcElement, Legend);

interface Props {
  value: number;
  total: number;
  color: string;
}

export default function DoughnutChart({ value, color, total }: Props) {
  const defaultValue = value - total;
  const data = {
    datasets: [
      {
        data: [value, defaultValue],
        backgroundColor: [color, `${color}30`],
        borderColor: [color, `${color}30`],
      },
    ],
  };

  const options = {};

  return <Doughnut data={data} options={options}></Doughnut>;
}
