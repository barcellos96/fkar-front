"use client";

import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJs.register(ArcElement, Legend, ChartDataLabels);

interface Props {
  value: number;
  total: number;
  color: string;
}

export default function DoughnutChart({ value, color, total }: Props) {
  const defaultValue = total - value; // Corrigido: total - value
  const percentage = total ? ((value / total) * 100).toFixed(1) : 0;

  const data = {
    datasets: [
      {
        data: [value, defaultValue],
        backgroundColor: [color, `${color}30`],
        borderColor: [color, `${color}30`],
        datalabels: {
          display: true,
          color: "black",
          formatter: function (value: number, context: any) {
            return context.dataIndex === 0 ? `${Number(percentage)}%` : "";
          },
          align: "start" as "center" | "end" | "start",
          anchor: "start" as "center" | "end" | "start", // Ajustado aqui
        },
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
      },
    },
  };
  return <Doughnut data={data} options={options}></Doughnut>;
}
