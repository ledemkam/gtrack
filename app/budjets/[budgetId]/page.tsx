"use client";
import { useEffect, useState } from "react";
import { Budget } from "@/lib/types";
import BudgetsItem from "@/app/components/BudgetsItem";
import { getTransactionsByBudgetId } from "../actions";

const Page = ({ params }: { params: Promise<{ budgetId: string }> }) => {
  const [budgetId, setBudgetId] = useState("");
  const [budget, setBudget] = useState<Budget>();

  async function fetchBudgetData(budgetId: string) {
    try {
      if (budgetId) {
        const budgetData: Budget = await getTransactionsByBudgetId(budgetId);
        setBudget(budgetData);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du budget et des transactions:",
        error
      );
    }
  }

  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params;
      setBudgetId(resolvedParams.budgetId);
      fetchBudgetData(resolvedParams.budgetId);
    };
    getId();
  }, [params]);

  console.log(budgetId);
  console.log(budget);

  return <div>{budget && <BudgetsItem budget={budget} enableHover={0} />}</div>;
};

export default Page;
