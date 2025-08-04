import { useEffect, useState } from "react";
import EmojiPicketPopup from "../EmojiPicketPopup";
import Input from "../Input";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm = ({ onAddIncome, categories, isLoading }) => {
  const [incomeData, setIncomeData] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  useEffect(() => {
    if (categories.length > 0 && !incomeData.categoryId) {
      setIncomeData((prev) => ({
        ...prev,
        categoryId: categoryOptions[0]?.value || "",
      }));
    }
  }, [categories, incomeData.categoryId]);

  return (
    <div className="">
      <EmojiPicketPopup
        icon={incomeData.icon}
        onIconChange={(emoji) => setIncomeData({ ...incomeData, icon: emoji })}
      />

      <div className="flex flex-col gap-3">
        <Input
          value={incomeData.name}
          onChange={(e) =>
            setIncomeData({ ...incomeData, name: e.target.value })
          }
          label="Income Source"
          placeholder="e.g., Salary, Freelance Work"
          type="text"
        />

        <Input
          value={incomeData.categoryId}
          onChange={(e) => {
            setIncomeData({ ...incomeData, categoryId: e.target.value });
          }}
          label="Category"
          isSelect={true}
          options={categoryOptions}
        />

        <Input
          value={incomeData.amount}
          onChange={(e) =>
            setIncomeData({ ...incomeData, amount: e.target.value })
          }
          label="Amount"
          type="number"
          placeholder="e.g., 5000"
        />

        <Input
          value={incomeData.date}
          onChange={(e) =>
            setIncomeData({ ...incomeData, date: e.target.value })
          }
          label="Date"
          type="date"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          disabled={isLoading}
          className={`add-btn-fill flex items-center justify-center gap-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="button"
          onClick={() => onAddIncome(incomeData)}
        >
          {isLoading ? (
            <>
              <LoaderCircle className="animate-spin w-5 h-5" />
              <span>Adding...</span>
            </>
          ) : (
            "Add Income"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
