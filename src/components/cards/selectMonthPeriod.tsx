"use client";

interface SelectMonthProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

const SelectMonth: React.FC<SelectMonthProps> = ({
  selectedMonth,
  onMonthChange,
}) => {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <div className="flex items-center mt-2 px-2 py-3 justify-between bg-white rounded-lg shadow-md">
      <span className="text-sm slg:text-base text-zinc-400 pl-1 lg:pl-3">
        ALTERAR PERIODO
      </span>

      <span className="border px-3 rounded-lg">
        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(parseInt(e.target.value))}
          className="text-sm slg:text-base bg-transparent py-1  outline-none"
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
};

export default SelectMonth;
