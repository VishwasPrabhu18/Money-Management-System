import { LoaderCircle, Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import Input from "../components/Input";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const Filter = () => {
  const [filterData, setFilterData] = useState({
    type: "income",
    startDate: "",
    endDate: "",
    keyword: "",
    sortField: "date",
    sortOrder: "asc",
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosConfig.post(
        API_ENDPOINTS.APPLY_FILTERS,
        filterData
      );
      setTransactions(response.data);
      setType(filterData.type);
    } catch (error) {
      console.error("Error fetching filtered transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard>
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Filter Transactions</h2>
        </div>
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">Select the filters</h5>
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <Input
              label="Type"
              labelClassName="text-sm font-medium mb-1"
              isSelect={true}
              options={[
                { label: "Income", value: "income" },
                { label: "Expense", value: "expense" },
              ]}
              value={filterData.type}
              onChange={(e) =>
                setFilterData({ ...filterData, type: e.target.value })
              }
            />

            <Input
              label="Start Date"
              type="date"
              labelClassName="text-sm font-medium mb-1"
              placeholder="Select start date"
              value={filterData.startDate}
              onChange={(e) =>
                setFilterData({ ...filterData, startDate: e.target.value })
              }
            />

            <Input
              label="End Date"
              type="date"
              labelClassName="text-sm font-medium mb-1"
              placeholder="Select end date"
              value={filterData.endDate}
              onChange={(e) =>
                setFilterData({ ...filterData, endDate: e.target.value })
              }
            />

            <Input
              label="Sort Field"
              labelClassName="text-sm font-medium mb-1"
              isSelect={true}
              options={[
                { label: "Date", value: "date" },
                { label: "Amount", value: "amount" },
                { label: "Type", value: "type" },
              ]}
              value={filterData.sortField}
              onChange={(e) =>
                setFilterData({ ...filterData, sortField: e.target.value })
              }
            />

            <Input
              label="Sort Order"
              labelClassName="text-sm font-medium mb-1"
              isSelect={true}
              options={[
                { label: "Ascending", value: "asc" },
                { label: "Descending", value: "desc" },
              ]}
              value={filterData.sortOrder}
              onChange={(e) =>
                setFilterData({ ...filterData, sortOrder: e.target.value })
              }
            />

            <div className="col-span-1 flex items-end">
              <Input
                label="Search"
                labelClassName="text-sm font-medium mb-1"
                placeholder="Search"
                value={filterData.keyword}
                onChange={(e) =>
                  setFilterData({ ...filterData, keyword: e.target.value })
                }
              />
              <button
                type="button"
                disabled={loading}
                onClick={handleSearch}
                className={`ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-800 text-white rounded flex items-center justify-center cursor-pointer" ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <LoaderCircle size={20} className="animate-spin" />
                ) : (
                  <Search size={20} />
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="card p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Transactions ({transactions.length})</h2>
          </div>
          {transactions.length === 0 && !loading ? (
            <p className="text-gray-500">
              Select the filters and click apply to filter the transactions
            </p>
          ) : (
           ""
          )}
          {loading ? (
            <div>
              <LoaderCircle size={24} className="animate-spin text-purple-600" />
              <p className="text-gray-500">Loading transactions...</p>
            </div>
          ) : ("")}
          
          {
            transactions.map(transaction => (
              <TransactionInfoCard
                key={transaction.id}
                icon={transaction.icon}
                title={transaction.name}
                date={moment(transaction.date).format("DD MMM YYYY")}
                amount={transaction.amount}
                type={type}
                hideDeleteBtn={true}
                onDelete={() => {}}
              />
            ))
          }
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
