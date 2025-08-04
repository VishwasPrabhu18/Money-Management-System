import React from 'react'
import CustomPieChart from './CustomPieChart'
import { formatCurrency } from '../util/validation';

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  
  const COLORS = ["#59168B", "#16a34a", "#dc2626"]; // Purple for balance, Green for income, Red for expense

  const balanceData = [
    {name: "Total Balance", amount: totalBalance},
    {name: "Total Income", amount: totalIncome},
    {name: "Total Expense", amount: totalExpense},
  ]

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Finance Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={formatCurrency(totalBalance)}
        colors={COLORS}
        showTextAnchor={false}
      />
    </div>
  )
}

export default FinanceOverview