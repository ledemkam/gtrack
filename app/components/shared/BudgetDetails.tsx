import { ReactElement } from "react";

interface BudgetDetailsProps {
    totalAmount: number;
    remainingAmount: number;
  }
  
  const BudgetDetails = ({ totalAmount, remainingAmount }: BudgetDetailsProps): ReactElement => {

    return (
        <div className="flex justify-between mt-4 items-center text-gray-500 text-sm">
          <span>{totalAmount} € ausgaben</span>
          <span>{remainingAmount} € übrig</span>
        </div>
      );
  }

export default BudgetDetails;