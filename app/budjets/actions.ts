"use server";

import prisma from "@/lib/prisma";


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