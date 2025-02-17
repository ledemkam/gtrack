import { Budget } from "@/lib/types";
import { ReactElement } from "react";

interface BudgetsItemProps {
  budget: Budget;
  enableHover? : number
}

const BudgetsItem = ({ budget , enableHover}: BudgetsItemProps): ReactElement => {
  const transactionCount = budget.transactions ? budget.transactions.length : 0;
  const totalAmount = budget.transactions
    ? budget.transactions?.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      )
    : 0;

  const remainingAmount = budget.amount - totalAmount;

  const progress =
    totalAmount > budget.amount ? 100 : (totalAmount / budget.amount) * 100;

  const hoverClass = 
     enableHover === 1 ? "hover:shadow-xl hover:border-accent" : ""; 
  return (
    <li
      key={budget.id}
      className={`p-4 rounded-xl border-2 border-base-300 list-none ${hoverClass}`}	
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-accent/20 text-xl h-10 w-10 rounded-full justify-center items-center flex">
            {budget.emoji}
          </div>
          <div className="flex flex-col ml-3">
            <span className="font-bold text-xl">{budget.name}</span>
            <span className="text-gray-500 text-sm">
              {transactionCount} Transaktion(en)
            </span>
          </div>
        </div>
        <div className="text-xl font-bold text-accent">{budget.amount} €</div>
      </div>
      <div className="flex justify-between mt-4 items-center text-gray-500 text-sm">
        <span>{totalAmount} € ausgaben</span>
        <span>{remainingAmount} € übrig</span>
      </div>
      <div>
        <progress
          className="progress progress-accent w-full mt-4"
          value={progress}
          max="100"
        ></progress>
      </div>
    </li>
  );
};

export default BudgetsItem;
