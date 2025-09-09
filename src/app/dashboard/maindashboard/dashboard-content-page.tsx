'use client'

import LoadingSpinner from "@/components/loading-spinner"
import { Button, buttonVariants } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { format, formatDistanceToNow, isValid } from "date-fns"
import { ArrowRight, BarChart2, Clock, Database, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
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

    const [deletingCategory, setDeletingCategory] = useState<string | null>(null)

    const queryClient = useQueryClient()

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





    const {mutate:deleteCategory, isPending:isDeletingCategory} = useMutation({
        mutationFn:async(name:string) => {
          const response = await fetch(`/api/category/deleteCategory/${name}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["user-event-categories"]})
            setDeletingCategory(null)
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
      <>
        <ul className="grid max-w-6xl geid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((category) => (
            <li key={category.id} className="relative group z-10 transition-all duration-200 hover:-translate-x-0.5">
                <div className="absolute z-0 inset-px rounded-lg bg-white" />
                <div className="pointer-events-none z-0 absolute inset-px rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md ring-1 ring-black/5" />
                <div className="relative p-6 z-10">
                    <div className="flex items-center gap-4 mb-6">
                    <div className="size-12 rounded-full" style={{backgroundColor:category.color ? `#${category.color.toString(16).padStart(6,"0")}`: "#f3f4f6"}} />
                            
                            <h3 className="text-lg/7 font-medium tracking-tight text-gray-900">{category.emoji || "📂"} {category.name}</h3>

                            <p className="text-sm/7 text-gray-600">
                            {format(category.createdAt, "MMM d, yyyy")}
                            </p>


                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm/6 text-gray-600">
                        <Clock className="size-4 mr-2 text-teal-600" />
                        <span className="font-medium">
                            Last Ping:

                        </span>
                        <span className="ml-1">
                            {category.lastPing && isValid(new Date(category.lastPing)) 
        ? formatDistanceToNow(new Date(category.lastPing)) + " ago"
        : "never"}

                        </span>

                        </div>
                        <div className="flex items-center text-sm/6 text-gray-600">
                        <Database className="size-4 mr-2 text-teal-600" />
                        <span className="font-medium">
                          Unique Fields:

                        </span>
                        <span className="ml-1">
                            {category.uniqueFieldCount || 0}

                        </span>

                        </div>
                        <div className="flex items-center text-sm/6 text-gray-600">
                        <BarChart2 className="size-4 mr-2 text-teal-600" />
                        <span className="font-medium">
                            Events This Month:

                        </span>
                        <span className="ml-1">
                            {category.eventsCount || 0}

                        </span>

                        </div>

                    </div>
                      <div className="flex items-center justify-between mt-4">
                    <Link href={`/dashboard/category/${category.name}`} className={buttonVariants({variant:"outline", size:"lg" ,className:"flex items-center gap-2 text-sm"})}>
                    view all <ArrowRight className="size-4" />
                    
                    </Link>
                    <Button onClick={() => setDeletingCategory(category.name)} variant="ghost" size="sm" className="text-gray-500 hover:text-red-600 transition-colors" aria-label={`Delete ${category.name} category`}>
                        <Trash2 className="size-5" />
                    </Button>

                </div>



                </div>

                </li>

              
           

           ))}
        </ul>

      <Modal showModal={!!deletingCategory}
      setShowModal={() => setDeletingCategory(null)}
      className="max-w-md p-8" >
        <div className="space-y-6">
            <div>
                <h2 className="text-lg/7 font-medium tracking-tight text-gray-900">Delete Category</h2>
                <p>Are you sure you want to delete the category "{deletingCategory}"?
                    This cannot be undone.
                </p>
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setDeletingCategory(null)}>
                    Cancel
                </Button>
         <Button variant="destructive" onClick={() => deletingCategory && deleteCategory(deletingCategory)} disabled={isDeletingCategory}>
                       {isDeletingCategory ? "Deleting..." :"Delete"}
                    </Button>


            </div>

        </div>

      </Modal>
        
        </>
        
    )
}