import { Budget } from "./types";

export const getTransactionCount = (budget: Budget): number => {
    return budget.transactions ? budget.transactions.length : 0;
  };
  
export const getTotalAmount = (budget: Budget): number => {
    return budget.transactions
      ? budget.transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
      : 0;
  };
  
export const getRemainingAmount = (budget: Budget, totalAmount: number): number => {
    return budget.amount - totalAmount;
  };
  
export const getProgress = (budget: Budget, totalAmount: number): number => {
    return totalAmount > budget.amount ? 100 : (totalAmount / budget.amount) * 100;
  };
  
export   const getHoverClass = (enableHover?: number): string => {
    return enableHover === 1 ? "hover:shadow-xl hover:border-accent" : "";
  };

export const getTotalWithNewTransaction = (budget: Budget, amount: number): number => {
  return getTotalAmount(budget) + amount;
}