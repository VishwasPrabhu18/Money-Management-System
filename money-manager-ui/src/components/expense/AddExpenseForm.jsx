import { useEffect, useState } from "react";
import EmojiPicketPopup from "../EmojiPicketPopup";
import Input from "../Input";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({ onAddExpense, categories, isLoading }) => {
  const [expenseData, setExpenseData] = useState({
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
    if (categories.length > 0 && !expenseData.categoryId) {
      setExpenseData((prev) => ({
        ...prev,
        categoryId: categoryOptions[0]?.value || "",
      }));
    }
  }, [categories, expenseData.categoryId]);

  return (
    <div className="">
      <EmojiPicketPopup
        icon={expenseData.icon}
        onIconChange={(emoji) => setExpenseData({ ...expenseData, icon: emoji })}
      />

      <div className="flex flex-col gap-3">
        <Input
          value={expenseData.name}
          onChange={(e) =>
            setExpenseData({ ...expenseData, name: e.target.value })
          }
          label="Expense Source"
          placeholder="e.g., Rent, Groceries"
          type="text"
        />

        <Input
          value={expenseData.categoryId}
          onChange={(e) => {
            setExpenseData({ ...expenseData, categoryId: e.target.value });
          }}
          label="Category"
          isSelect={true}
          options={categoryOptions}
        />

        <Input
          value={expenseData.amount}
          onChange={(e) =>
            setExpenseData({ ...expenseData, amount: e.target.value })
          }
          label="Amount"
          type="number"
          placeholder="e.g., 5000"
        />

        <Input
          value={expenseData.date}
          onChange={(e) =>
            setExpenseData({ ...expenseData, date: e.target.value })
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
          onClick={() => onAddExpense(expenseData)}
        >
          {isLoading ? (
            <>
              <LoaderCircle className="animate-spin w-5 h-5" />
              <span>Adding...</span>
            </>
          ) : (
            "Add Expense"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
