'use client'

import LoadingSpinner from "@/components/loading-spinner"
import { useQuery } from "@tanstack/react-query"
import superjson from "superjson"


interface EventCategory {
    id: string
    name: string
    emoji: string | null
    color: number
    updatedAt: Date
    createdAt: Date
    uniqueFieldCount: number
    eventsCount: number
    lastPing: Date | null
}


export const DashboardContentPage = () => {

    const {data:categories, isPending:isEventCategoriesLoading} = useQuery({
        queryKey:["user-event-categories"],
        queryFn:async () => {
            const res= await fetch ("/api/category/getEventCategories")

            const responseText = await res.text()
           const data = superjson.parse(responseText) as { categories: EventCategory[] }
            console.log('Parsed data:', data)
            
            return data.categories

        }
    })

    if(isEventCategoriesLoading) {
        return (<div className="flex items-center justify-center flex-1 h-full w-full">
            <LoadingSpinner />

        </div>)
    }

    if(!categories || categories.length === 0) {
        return <div>Empty State</div>
    }
    return (
        <ul className="grid max-w-6xl grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ga-6 ">

           {categories.map((category) => (
            <li key={category.id} className="relative group transition-all duration-200 hover:-translate-y-0.5 h-24">
                <div className="absolute  inset-px rounded-lg bg-white" />
                <div className="  absolute inset-px rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md ring-1 ring-black/5">
                <div className="relative p-6 z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="size-12 rounded-full" style={{backgroundColor:category.color ? `#${category.color.toString(16).padStart(6, "0")}`: "#f3f4f6"}} />
                            

                     <div className="flex flex-col">
                            <h3 className="font-semibold text-gray-900">{category.name}</h3>
                            </div>

                    </div>

                </div>

                </div>

              
            </li>

           ))}
        </ul>
    )
}