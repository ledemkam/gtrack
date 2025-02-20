import { Budget } from "@/lib/types";
import { ReactElement } from "react";

import {
  getHoverClass,
  getProgress,
  getRemainingAmount,
  getTotalAmount,
  getTransactionCount,
} from "@/lib/utils";
import BudgetHeader from "./BudgetHeader";
import BudgetDetails from "./BudgetDetails";
import BudgetProgress from "./BudgetProgress";

interface BudgetsItemProps {
  budget: Budget;
  enableHover?: number;
}

const BudgetsItem = ({
  budget,
  enableHover,
}: BudgetsItemProps): ReactElement => {
  
  const transactionCount = getTransactionCount(budget);
  const totalAmount = getTotalAmount(budget);
  const remainingAmount = getRemainingAmount(budget, totalAmount);
  const progress = getProgress(budget, totalAmount);
  const hoverClass = getHoverClass(enableHover);

  return (
    <li
      key={budget.id}
      className={`p-4 rounded-xl border-2 border-base-300 list-none ${hoverClass}`}
    >
      <BudgetHeader budget={budget} transactionCount={transactionCount} />
      <BudgetDetails
        totalAmount={totalAmount}
        remainingAmount={remainingAmount}
      />
      <BudgetProgress progress={progress} />
    </li>
  );
};

export default BudgetsItem;
