



import { QueryClientProviderWrapper } from "@/components/query-client-provider-wrapper"
import { DashboardPage } from "@/components/dashboard-page"
import { DashboardContentPage } from "./maindashboard/dashboard-content-page"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

 const Page = async() => {

    const auth = await currentUser()

    if(!auth) {
        redirect('/sign-in')
    }

    const user = await prisma.user.findUnique({
        where:{
            externalId:auth.id
        }
    })
    if(!user) {
        redirect('/welcome')
    }


    return (
        <QueryClientProviderWrapper>
            <DashboardPage title="Dashboard"><DashboardContentPage /></DashboardPage>
        </QueryClientProviderWrapper>
    )
}

export default Page