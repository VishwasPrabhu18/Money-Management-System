import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import Modal from "../components/Modal";
import { validateExpense } from "../util/validation";
import toast from "react-hot-toast";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseOverview from "../components/expense/ExpenseOverview";
import ExpenseList from "../components/expense/ExpenseList";
import AddExpenseForm from "../components/expense/AddExpenseForm";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      if (res.status === 200) {
        setExpenseData(res.data);
      }
    } catch (error) {
      console.error("Error fetching expense data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseCategories = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense")
      );
      if (res.status === 200) {
        setCategories(res.data);
      }
    } catch (error) {
      console.error("Error fetching expense categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const validExpense = validateExpense({ expense });

    if (validExpense !== null) {
      toast.error(validExpense);
      return;
    }

    setLoading(true);
    try {
      const res = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, expense);
      if (res.status === 201) {
        toast.success("Expense added successfully!");
        setOpenAddExpenseModal(false);
        fetchExpenseData();
        fetchExpenseCategories();
      }
    } catch (error) {
      toast.error("Error while adding expense");
      console.error("Error adding expense:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    if (!id) {
      toast.error("Invalid expense ID");
      return;
    }
    setLoading(true);
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully!");
      fetchExpenseData();
    } catch (error) {
      console.error("Error deleting expense:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
        responseType: "blob",
      });

      let fileName = "expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Expense details downloaded successfully!");
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again later.");
    }
  };

  const handleEmailExpenseDetails = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if (res.status === 204) {
        toast.success("Expense details emailed successfully!");
      } else {
        toast.error("Failed to email expense details. Please try again later.");
      }
    } catch (error) {
      console.error("Error emailing expense details:", error);
      toast.error("Failed to email expense details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchExpenseData();
    fetchExpenseCategories();
  }, []);

  return (
    <Dashboard>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
          />

          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <AddExpenseForm
              onAddExpense={(expense) => handleAddExpense(expense)}
              categories={categories}
              isLoading={loading}
            />
          </Modal>

          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense details?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
              isLoading={loading}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Expense;
