import { ArrowRight } from "lucide-react"
import TransactionInfoCard from "./TransactionInfoCard"
import moment from "moment"

const Transactions = ({transactions, onMore, type, title}) => {
  return (
    <div className='card'>
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>
        <button onClick={onMore} className="card-btn">
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
            type={type}
            hideDeleteBtn={true}
          />
        ))}
      </div>
    </div>
  )
}

export default Transactions