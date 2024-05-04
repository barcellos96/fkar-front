import { Fuel, TrendingDown, TrendingUp, Wrench } from "lucide-react";

import DoughnutChart from "../charts/doughnut";

export default function FinanceSummary() {
  const service = 5000;
  const expense = 9000;
  const incoming = 12000;
  const fuel = 0;

  const total = service + incoming + expense + fuel;

  return (
    <div className="mt-5 mb-7 rounded-xl shadow-lg relative bg-white">
      <h3 className="pl-5 py-2 mb-4 font-semibold bg-green-200 rounded-t-lg">
        RELATÓRIO ULTIMO MÊS
      </h3>
      <div className="flex flex-row items-center justify-around">
        <div className="flex flex-col items-center justify-center">
          <Wrench
            style={{
              background: "#fcd34d80",
              color: "#f8ca32",
              padding: 8,
              borderRadius: "20%",
            }}
            height={40}
            width={40}
          />
          <h5 className="text-sm font-light mt-1">SERVIÇOS</h5>
          <div className="w-14 h-14">
            <DoughnutChart value={service} color="#fcd34d" total={total} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <TrendingDown
            style={{
              background: "#FF555580",
              color: "#ff4444",
              padding: 8,
              borderRadius: "20%",
            }}
            height={40}
            width={40}
          />
          <h5 className="text-sm font-light mt-1">DESPESAS</h5>
          <div className="w-14 h-14">
            <DoughnutChart value={expense} color="#FF5555" total={total} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <TrendingUp
            style={{
              background: "#6CDDA480",
              color: "#40d68b",
              padding: 8,
              borderRadius: "20%",
            }}
            height={40}
            width={40}
          />
          <h5 className="text-sm font-light mt-1">RECEITAS</h5>
          <div className="w-14 h-14">
            <DoughnutChart value={incoming} color="#6CDDA4" total={total} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Fuel
            style={{
              background: "#fdba7480",
              color: "#f99f3f",
              padding: 8,
              borderRadius: "20%",
            }}
            height={40}
            width={40}
          />
          <h5 className="text-sm font-light mt-1">ABASTEC...</h5>
          <div className="w-14 h-14">
            <DoughnutChart value={fuel} color="#fdba74" total={total} />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="bg-green-200 hover:bg-green-300 font-semibold text-base w-full mx-auto py-2  relative top-5 rounded-b-lg transition duration-300 ease-linear"
      >
        VER RELATORIOS COMPLETOS
      </button>
    </div>
  );
}
