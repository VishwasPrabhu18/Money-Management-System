import { Download, LoaderCircle, Mail } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import TransactionInfoCard from "../TransactionInfoCard";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [emailLoader, setEmailLoader] = useState(false);
  const [downloadLoader, setDownloadLoader] = useState(false);

  const handleEmailSend = async () => {
    setEmailLoader(true);
    try {
      await onEmail();
    } finally {
      setEmailLoader(false);
    }
  };

  const handleDownload = async () => {
    setDownloadLoader(true);
    try {
      await onDownload();
    } finally {
      setDownloadLoader(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Source</h5>

        <div className="flex items-center justify-end gap-5">
          <button disabled={emailLoader} className="card-btn" onClick={handleEmailSend}>
            {emailLoader ? (
              <>
                <LoaderCircle size={15} className="animate-spin" />
                Emailing...
              </>
            ) : (
              <>
                <Mail size={15} className="text-base" />
                Email
              </>
            )}
          </button>
          <button disabled={downloadLoader} className="card-btn" onClick={handleDownload}>
            {downloadLoader ? (
              <>
                <LoaderCircle size={15} className="animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={15} className="text-base" />
                Download
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        {transactions?.map((transaction) => (
          <TransactionInfoCard
            key={transaction.id}
            icon={transaction.icon}
            title={transaction.name}
            date={moment(transaction.date).format("DD MMM YYYY")}
            amount={transaction.amount}
            type="income"
            // hideDeleteBtn={true}
            onDelete={() => onDelete(transaction.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
