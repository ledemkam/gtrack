"use client"
import { useUser } from "@clerk/nextjs";
import Wrapper from "../components/layout/Wrapper";
import { useEffect, useState } from "react";
import {
  getLastBudgets,
  getLastTransactions,
  getReachedBudgets,
  getTotalTransactionAmount,
  getTotalTransactionCount,
  getUserBudgetData,
} from "./actions";
import Link from "next/link";
import { CircleDollarSign, Landmark, PiggyBank } from "lucide-react";
import { Budget, BudgetsData, Transaction } from "@/lib/types";
import SummaryCard from "../components/shared/SummaryCard";
import StatisticsChart from "../components/ui/StatisticsChart";
import TransactionList from "../components/shared/TransactionList";
import BudgetsItem from "../components/shared/BudgetsItem";

const Page = () => {
  const { user } = useUser();
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [reachedBudgetsRatio, setReachedBudgetsRatio] = useState<string | null>(null);
  const [budgetData, setBudgetData] = useState<BudgetsData[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const email = user?.primaryEmailAddress?.emailAddress as string;
      if (email) {
        const amount = await getTotalTransactionAmount(email);
        const count = await getTotalTransactionCount(email);
        const reachedBudgets = await getReachedBudgets(email);
        const budgetsData = await getUserBudgetData(email);
        const lastTransactions = await getLastTransactions(email);
        const lastBudgets = await getLastBudgets(email);
        setTotalAmount(amount);
        setTotalCount(count);
        setReachedBudgetsRatio(reachedBudgets);
        setBudgetData(budgetsData);
        setTransactions(lastTransactions);
        setBudgets(lastBudgets);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <Wrapper>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <div>
          <div className="grid md:grid-cols-3 gap-4">
            <SummaryCard
              title="Gesamttransaktionen"
              value={totalAmount !== null ? `${totalAmount}€` : "N/A"}
              icon={<CircleDollarSign className="bg-accent w-9 h-9 rounded-full p-1 text-white" />}
            />
            <SummaryCard
              title="Anzahl der Transaktionen"
              value={totalCount !== null ? `${totalCount}` : "N/A"}
              icon={<PiggyBank className="bg-accent w-9 h-9 rounded-full p-1 text-white" />}
            />
            <SummaryCard
              title="Budgets erreicht"
              value={reachedBudgetsRatio || "N/A"}
              icon={<Landmark className="bg-accent w-9 h-9 rounded-full p-1 text-white" />}
            />
          </div>

          <div className="w-full md:flex mt-4">
            <div className="roundex-xl md:w-2/3">
              <StatisticsChart data={budgetData} />
              <TransactionList transactions={transactions} />
            </div>

            <div className="md:w-1/3 ml-4">
              <h3 className="text-lg font-semibold my-4 md:mb-4 md:mt-0">
                Neueste Transaktionen{" "}
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                {budgets.map((budget) => (
                  <Link href={`/budjets/${budget.id}`} key={budget.id}>
                    <BudgetsItem budget={budget} enableHover={1}></BudgetsItem>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Page;