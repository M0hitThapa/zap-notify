import { ReactNode } from "react"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"
import { Heading } from "./heading"

interface DashboardPageProps {
    title:string,
    children?:ReactNode,
    cta?:ReactNode,
    hideBackButton?:boolean
}


export const DashboardPage = ({title, cta, hideBackButton,children}: DashboardPageProps) => {
    return (
        <section className="flex flex-col flex-1 h-full w-full">
            <div className="flex p-6 sm:p-8 justify-between border-b border-gray-200">
                <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-6 ">
                     <div className="flex items-center gap-8">
                    {hideBackButton ? null : (<Button className="bg-white w-fit" variant="outline">
                        <ArrowLeft className="size-4" />
                    </Button>)}
                    <Heading className="lg:text-5xl md:text-3xl text-xl">{title}</Heading>
                    {cta ? <div>{cta}</div> : null}
                    </div>

                </div>

            </div>

            
<div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">
    {children}

</div>
        </section>
    )
}