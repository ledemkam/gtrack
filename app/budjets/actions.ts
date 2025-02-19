"use server";

import prisma from "@/lib/prisma";
import { getTotalWithNewTransaction } from "@/lib/utils";

export async function getTransactionsByBudgetId(budgetId: string){
    try {
        const budget = await prisma.budget.findUnique({
            where: { 
                id: budgetId
             },
             include: {
                 transactions: true
                }
        })
        if(!budget){
            throw new Error("Budget not found")
        }
        return budget
    } catch (error) {
        console.error("Error getting budget by id", error)
        throw error
    }
}

export async function addTransactionToBugfet(
     budgetId: string,
      amount: number,
       description: string){

    try {
        const budget = await prisma.budget.findUnique({
            where: { 
                id: budgetId
             },
                include: {
                    transactions: true
                    }
        })
        if(!budget){
            throw new Error("Budget not found")
        }

        if(getTotalWithNewTransaction(budget, amount) > budget.amount){
            throw new Error("Transaction amount exceeds budget amount")
        }

        const newsTransaction = await prisma.transaction.create({
            data: {
                amount,
                description,
                emoji: budget.emoji,
                budget: {
                    connect: {
                        id: budget.id
                    }
                }
            }
        })
        return newsTransaction     
    } catch (error) {
        console.error("Error adding transaction", error)
        throw error
    }
}

export async function deleteTransaction(transactionId: string) {
    try {
        console.log(" id de la transact", transactionId)
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: transactionId
            }
        })

        if (!transaction) {
            throw new Error('keine transaktion gefunden.');
        }

        await prisma.transaction.delete({
            where: {
                id: transactionId,
            },
        });
    } catch (error) {
        console.error('Fehler beim Löschen der Transaktion:', error);
        throw error;
    }
}

export async function addBugets(email: string , name: string, amount: number,selectEmoji: string){
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if(user){
            await prisma.budget.create({
                data: {
                    name,
                    amount,
                    emoji: selectEmoji,
                    userId: user.id
                }
            })
        }else{
            throw new Error("User not found")
        }
    } catch (error) {
        console.error("Error adding budget", error)
        throw error
    }
}


export async function getBudgetsByUser(email: string){
    try {
        const user = await prisma.user.findUnique({
            where: {
                 email
                },
            include: {
                budgets: {
                    include: {
                        transactions: true
                    }
                }
            }
        })
        if(user){
            return await prisma.budget.findMany({
                where: { 
                    userId: user.id 
                }
            })
        }else{
            throw new Error("User not found")
        }
    } catch (error) {
        console.error("Error getting budgets", error)
        throw error
    }
}



export const deleteBudget = async (budgetId: string) => {
    try {
        await prisma.transaction.deleteMany({
            where: { budgetId }
        })

        await prisma.budget.delete({
            where: {
                id: budgetId
            }
        })
    } catch (error) {
        console.error('Fehler beim Löschen des Budgets und der zugehörigen Transaktionen: ', error);
        throw error;
    }
}


