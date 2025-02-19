"use client";
import { useUser } from "@clerk/nextjs";
import Wrapper from "../components/Wrapper";
import { useEffect, useState } from "react";
import { Transaction } from "@/lib/types";
import { getTransactionsByEmailAndPeriod } from "./actions";
import TransactionItem from "../components/TransactionItem";

const Page = () => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTransactions = async (period: string) => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setLoading(true);
      try {
        const transactionsData = await getTransactionsByEmailAndPeriod(
          user.primaryEmailAddress.emailAddress,
          period
        );
        setTransactions(transactionsData);
        setLoading(false);
      } catch (error) {
        console.error("Fehler während der transaktionen",error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTransactions("last30");
  }, [user?.primaryEmailAddress?.emailAddress]);

  console.log(transactions);
  

  return (
      <Wrapper>
        <div className='flex justify-end mb-5 '>
        <select
          className='input input-bordered input-md'
          defaultValue="last30"
          onChange={(e) => fetchTransactions(e.target.value)}
        >
          <option value="last7">Letzte 7 tagen</option>
          <option value="last30">letzte 30 tagen</option>
          <option value="last90">letzte 90 tagen</option>
          <option value="last365">letzte 365 tagen</option>
        </select>
      </div>
      <div className='overflow-x-auto w-full bg-base-200/35 p-5 rounded-xl'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : transactions.length === 0 ? (
          <div className='flex justify-center items-center h-full'>
            <span className='text-gray-500 text-sm'>
              Keine transaction verfügbar.
            </span>
          </div>
        ) : (
          <ul className='divide-y divide-base-300'>
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}>
              </TransactionItem>
            ))}
          </ul>
        )}
      </div>
      </Wrapper>
  );
};

export default Page;
