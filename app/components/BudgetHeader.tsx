import { Budget } from "@/lib/types";
import { ReactElement } from "react";

interface BudgetHeaderProps {
    budget: Budget;
    transactionCount: number;
  }
  
  const BudgetHeader = ({ budget, transactionCount }: BudgetHeaderProps): ReactElement => {

    
     return  (
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
      );
  }

    export default BudgetHeader;