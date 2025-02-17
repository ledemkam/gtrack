'use server';

import prisma from "@/lib/prisma";

export async function checkAndAddUser(email : string | undefined){
    if(!email) return

    try {
         const existingUser = await prisma.user.findUnique({
            where: { email }
         })
            if(!existingUser){
                await prisma.user.create({
                    data: {
                        email
                    }
                })
                console.log("User checked and added");
            }else{
                console.log("User already exists");
            }
            
    } catch (error) {
        console.error("Error checking user", error)
    }
    
}

