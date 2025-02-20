"use server";
import prisma from "@/lib/prisma";
import { getTotalAmount } from "@/lib/utils";

export async function getTotalTransactionAmount(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                budgets: {
                    include: {
                        transactions: true
                    }
                }
            }
        })

        if (!user) throw new Error("Utilisateur non trouvé");

        const totalAmount = user.budgets.reduce((sum, budgets) => {
            return sum + budgets.transactions.reduce((budjeSum, transaction) => budjeSum + transaction.amount, 0)
        }, 0)

        return totalAmount

    } catch (error) {
        console.error("Erreur lors du calcul du montant total des transactions:", error);
        throw error;
    }
}


export async function getTotalTransactionCount(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                budgets: {
                    include: {
                        transactions: true
                    }
                }
            }
        })

        if (!user) throw new Error("User not found.");

        const totalCount = user.budgets.reduce((count, budget) => {
            return count + budget.transactions.length
        }, 0)

        return totalCount
    } catch (error) {
        console.error("Fehler beim Zählen der Transaktionen:", error);
        throw error;
    }

}


export async function getReachedBudgets(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                budgets: {
                    include: {
                        transactions: true
                    }
                }
            }
        })

        if (!user) throw new Error("User not found.");

        const totalBudgets = user.budgets.length;
        const reachedBudgets = user.budgets.filter(budjet => {           
            return getTotalAmount(budjet) >= budjet.amount
        }).length

        return `${reachedBudgets}/${totalBudgets}`
    } catch (error) {
        console.error("Fehler bei der Berechnung der erreichten Budgets:", error);
        throw error;
    }

}

export async function getUserBudgetData(email: string) {
    try {

        const user = await prisma.user.findUnique({
            where: { email },
            include: { budgets: { include: { transactions: true } } },
        });

        if (!user) {
            throw new Error("User not found.");
        }

        const data = user.budgets.map(budget => {
            return {
                budgetName: budget.name,
                totalBudgetAmount : budget.amount,
                getTotalAmount: getTotalAmount(budget),
            }
        })
        
        return data

    } catch (error) {
        console.error("Fehler beim Abrufen der Budgetdaten:", error);
        throw error;
    }
}

export const getLastTransactions = async (email: string) => {
    try {
        const transactions = await prisma.transaction.findMany({
            where : {
                budget : {
                    user: {
                       email : email 
                    }
                }
            },
            orderBy : {
                createdAt: 'desc',
            },
            take: 10 , 
            include: {
                budget : {
                    select: {
                        name : true
                    }
                }
            }

        })

        const transactionsWithBudgetName = transactions.map(transaction => ({
            ...transaction,
            budgetName: transaction.budget?.name || 'N/A', 
        }));


        return transactionsWithBudgetName

    } catch (error) {
        console.error('Fehler beim Abrufen der letzten Transaktionen: ', error);
        throw error;
    }
}

export const getLastBudgets = async (email: string) => {
    try {
         const  budgets = await prisma.budget.findMany({
            where : {
                user : {
                    email
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
            take : 3,
            include: {
                transactions: true
            }

         })

         return budgets

    } catch (error) {
        console.error('Fehler beim Abrufen der neuesten Budgets: ', error);
        throw error;
    }
}