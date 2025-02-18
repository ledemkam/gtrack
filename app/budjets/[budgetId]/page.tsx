"use client";
import { useEffect, useState } from "react";
import { Budget } from "@/lib/types";
import BudgetsItem from "@/app/components/BudgetsItem";
import {
  addTransactionToBugfet,
  deleteBudget,
  deleteTransaction,
  getTransactionsByBudgetId,
} from "../actions";
import Wrapper from "@/app/components/Wrapper";
import { Send, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import Notifications from "@/app/components/Notifications";

const Page = ({ params }: { params: Promise<{ budgetId: string }> }) => {
  const [budgetId, setBudgetId] = useState("");
  const [budget, setBudget] = useState<Budget>();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const [notification, setNotification] = useState<string>("");
  const closeNotification = () => {
    setNotification("");
  };

  async function fetchBudgetData(budgetId: string) {
    try {
      if (budgetId) {
        const budgetData: Budget = await getTransactionsByBudgetId(budgetId);
        setBudget(budgetData);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen von Budget und Transaktionen:", error);
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

  const handleAddTransaction = async () => {
    if (!amount || !description) {
      setNotification("Bitte füllen Sie alle Felder aus.");
      return;
    }

    try {
      const amountNumber = parseFloat(amount);
      if (isNaN(amountNumber) || amountNumber <= 0) {
        throw new Error("Der Betrag muss eine positive Zahl sein.");
      }
      const newTransaction = await addTransactionToBugfet(
        budgetId,
        amountNumber,
        description
      );

      setNotification(
        `Transaktion hinzugefügt: ${newTransaction.emoji} - ${newTransaction.amount} €`
      );
      fetchBudgetData(budgetId);
      setAmount("");
      setDescription("");
    } catch (error) {
      if (error instanceof Error) {
        setNotification(error.message);
      } else {
        setNotification("Es ist ein unbekannter Fehler aufgetreten.");
      }
    }
  };

  const handleDeleteBudget = async () => {
    const comfirmed = window.confirm(
      "Sind Sie sicher, dass Sie dieses Budget und alle zugehörigen Transaktionen löschen möchten? ?"
    );
    if (comfirmed) {
      try {
        await deleteBudget(budgetId);
      } catch (error) {
        console.error("Fehler beim Löschen des Budgets:", error);
      }
      redirect("/budjets");
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    const comfirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette transaction ?"
    );
    if (comfirmed) {
      try {
        await deleteTransaction(transactionId);
        fetchBudgetData(budgetId);
        setNotification("Ausgabe entfernt");
      } catch (error) {
        console.error("Fehler beim Löschen des Budgets:", error);
      }
    }
  };

  return (
    <Wrapper>
      {notification && (
        <Notifications
          message={notification}
          type="success"
          onclose={closeNotification}
        ></Notifications>
      )}
      {budget && (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <BudgetsItem budget={budget} enableHover={0} />
            <button className="btn mt-4" onClick={() => handleDeleteBudget()}>
              budjet löschen
            </button>
            <div className="space-y-4 flex flex-col mt-4">
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                className="input input-bordered"
              />

              <input
                type="number"
                id="amount"
                placeholder="Beitrag"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className=" input input-bordered"
              />

              <button onClick={handleAddTransaction} className="btn">
                Fügen Sie Ihre Ausgaben hinzu
              </button>
            </div>
          </div>
          {budget?.transactions && budget.transactions.length > 0 ? (
            <div className="overflow-x-auto md:mt-0 mt-4 md:w-2/3 ml-4">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Beitrag</th>
                    <th>Description</th>
                    <th>Datum</th>
                    <th>Uhrzeit</th>
                    <th>Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {budget?.transactions?.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="text-lg md:text-3xl">
                        {transaction.emoji}
                      </td>
                      <td>
                        <div className="badge badge-accent badge-xs md:badge-sm">
                          - {transaction.amount} €
                        </div>
                      </td>
                      <td>{transaction.description}</td>
                      <td>
                        {transaction.createdAt.toLocaleDateString("de-DE")}
                      </td>
                      <td>
                        {transaction.createdAt.toLocaleTimeString("de-DE", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            handleDeleteTransaction(transaction.id)
                          }
                          className="btn btn-sm"
                        >
                          <Trash className="w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="md:w-2/3 mt-10 md:ml-4 flex items-center justify-center">
              <Send strokeWidth={1.5} className="w-8 h-8 text-accent" />
              <span className="text-gray-500 ml-2">keine transaktion.</span>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Page;
