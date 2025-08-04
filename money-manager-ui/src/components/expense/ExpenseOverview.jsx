import { useEffect, useState } from "react";
import { prepareIncomeOrExpenseLineChartData } from "../../util/validation";
import { Plus } from "lucide-react";
import CustomAreaLineChart from "../CustomAreaLineChart";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
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
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your expenses over time and analyze your spending trends.
          </p>
        </div>
        <div>
          <button className="add-btn" onClick={onAddExpense}>
            <Plus size={15} className="text-lg" /> Add Expense
          </button>
        </div>
      </div>
      <CustomAreaLineChart data={chartData} chartType="expense" />
    </div>
  );
};

export default ExpenseOverview;
