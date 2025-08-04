import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const RecentTransaction = ({ transactions, onMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transaction</h5>
        <button className="card-btn" onClick={onMore}>
          More <ArrowRight className="text-base" size={15} />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map(transaction => (
          <TransactionInfoCard
            key={transaction.id}
            icon={transaction.icon}
            title={transaction.name}
            date={moment(transaction.date).fromNow("Do MMM YYYY")}
            amount={transaction.amount}
            type={transaction.type}
            hideDeleteBtn={true}
          />
        )) }
      </div>
    </div>
  );
};

export default RecentTransaction;
