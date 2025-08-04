import { useEffect, useState } from "react";
import { prepareIncomeOrExpenseLineChartData } from "../../util/validation";
import { Plus } from "lucide-react";
import CustomAreaLineChart from "../CustomAreaLineChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const res = prepareIncomeOrExpenseLineChartData(transactions);
    setChartData(res);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex  items-start justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <div>
          <button className="add-btn" onClick={onAddIncome}>
            <Plus size={15} className="text-lg" /> Add Income
          </button>
        </div>
      </div>
      <CustomAreaLineChart data={chartData} />
    </div>
  );
};

export default IncomeOverview;
