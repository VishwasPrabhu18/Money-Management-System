import { useState } from "react";
import Input from "./Input";
import EmojiPicketPopup from "./EmojiPicketPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, isLoading }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  return (
    <div className="p-4">
      <EmojiPicketPopup
        icon={category.icon}
        onIconChange={(icon) => setCategory({ ...category, icon })}
      />

      <div className="flex flex-col gap-3">
        <Input
          value={category.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
          label="Category Name"
          placeholder="e.g., Freelance, Salary"
          type="text"
        />

        <Input
          options={categoryTypeOptions}
          label="Category Type"
          value={category.type}
          onChange={(e) => setCategory({ ...category, type: e.target.value })}
          isSelect={true}
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          disabled={isLoading}
          className={`add-btn-fill flex items-center justify-center gap-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="button"
          onClick={() => onAddCategory(category)}
        >
          {isLoading ? (
            <>
              <LoaderCircle className="animate-spin w-5 h-5" />
              <span>Adding...</span>
            </>
          ) : (
            "Add Category"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
