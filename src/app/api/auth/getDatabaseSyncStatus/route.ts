import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const GET = async () => {
    const auth = await currentUser()
    if(!auth) {
        return new Response(JSON.stringify({isSynced:false}))
    }

    const user = await prisma.user.findFirst({
        where:{
            externalId:auth.id
        }
    })

    if(!user) {
        await prisma.user.create({
            data:{
                quoteLimit:100,
                email:auth.emailAddresses[0].emailAddress,
                externalId:auth.id

            }
        })
        return new Response(JSON.stringify({isSynced:true}))
    }
    return new Response(JSON.stringify({isSynced:true}))
}





