



import { QueryClientProviderWrapper } from "@/components/query-client-provider-wrapper"
import { DashboardPage } from "@/components/dashboard-page"
import { DashboardContentPage } from "./maindashboard/dashboard-content-page"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { CreateContentCategoryModal } from "@/components/create-event-category-modal"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

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
            <DashboardPage cta={<CreateContentCategoryModal>
               <Button>
                <PlusIcon className="size-4 mr-2" />
                 Add Category
               </Button>
            </CreateContentCategoryModal>}  title="Dashboard"><DashboardContentPage />
            </DashboardPage>
        </QueryClientProviderWrapper>
    )
}

export default Page