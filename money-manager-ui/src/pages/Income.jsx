import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import IncomeList from "../components/income/IncomeList";
import Modal from "../components/Modal";
import AddIncomeForm from "../components/income/AddIncomeForm";
import { validateIncome } from "../util/validation";
import toast from "react-hot-toast";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/income/IncomeOverview";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (res.status === 200) {
        setIncomeData(res.data);
      }
    } catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIncomeCategories = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income")
      );
      if (res.status === 200) {
        setCategories(res.data);
      }
    } catch (error) {
      console.error("Error fetching income categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const validIncome = validateIncome({ income });

    if (validIncome !== null) {
      toast.error(validIncome);
      return;
    }

    setLoading(true);
    try {
      const res = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, income);
      if (res.status === 201) {
        toast.success("Income added successfully!");
        setOpenAddIncomeModal(false);
        fetchIncomeData();
        fetchIncomeCategories();
      }
    } catch (error) {
      toast.error("Error while adding income");
      console.error("Error adding income:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteIncome = async (id) => {
    if (!id) {
      toast.error("Invalid income ID");
      return;
    }
    setLoading(true);
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully!");
      fetchIncomeData();
    } catch (error) {
      console.error("Error deleting income:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {
        responseType: "blob",
      });

      let fileName = "income_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Income details downloaded successfully!");
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details. Please try again later.");
    }
  };

  const handleEmailIncomeDetails = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
      if (res.status === 204) {
        toast.success("Income details emailed successfully!");
      } else {
        toast.error("Failed to email income details. Please try again later.");
      }
    } catch (error) {
      console.error("Error emailing income details:", error);
      toast.error("Failed to email income details. Please try again later.");
    }
  };

  useEffect(() => {
    fetchIncomeData();
    fetchIncomeCategories();
  }, []);

  return (
    <Dashboard>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
          />

          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <AddIncomeForm
              onAddIncome={(income) => handleAddIncome(income)}
              categories={categories}
              isLoading={loading}
            />
          </Modal>

          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
          >
            <DeleteAlert
              content="Are you sure you want to delete this income details?"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
              isLoading={loading}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
