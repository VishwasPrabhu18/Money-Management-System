import { LoaderCircle } from "lucide-react";

const DeleteAlert = ({ content, onDelete, isLoading }) => {
  return (
    <div>
      <p className="text-sm">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          onClick={onDelete}
          disabled={isLoading}
          className={`add-btn-fill flex items-center justify-center gap-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="button"
        >
          {isLoading ? (
            <>
              <LoaderCircle className="animate-spin w-5 h-5" />
              <span>Deleting...</span>
            </>
          ) : (
            "Delete Income"
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
