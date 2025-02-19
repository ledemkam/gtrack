"use server"
import prisma from "@/lib/prisma";




export async function getTransactionsByEmailAndPeriod(email: string, period: string){
 

    try {
        const now = new Date();
        let dateLimit

        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                budgets: {
                    include: {
                        transactions: {
                            where: {
                                createdAt: {
                                    gte: dateLimit
                                }
                            },
                            orderBy: {
                                createdAt: 'desc'
                            }
                        }
                    }

                }
            }
        })

        if(!user){
            throw new Error("User not found")
        }

        switch (period) {
            case 'last30':
                dateLimit = new Date(now)
                dateLimit.setDate(now.getDate() - 30);
                break
            case 'last90':
                dateLimit = new Date(now)
                dateLimit.setDate(now.getDate() - 90);
                break
            case 'last7':
                dateLimit = new Date(now)
                dateLimit.setDate(now.getDate() - 7);
                break
            case 'last365':
                dateLimit = new Date(now)
                dateLimit.setFullYear(now.getFullYear() - 1);
                break
            default:
                throw new Error('Invalid period.');
        }

        const transactions = user?.budgets.flatMap(budjet =>
            budjet.transactions.map(transaction => ({
                ...transaction,
                budgetName: budjet.name,
                budgetId: budjet.id
            }))
        )

        return transactions
              
    } catch (error) {
        console.error("Error getting transactions by email and period", error)
        throw error
    }

}