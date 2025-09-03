'use client'

import { useQuery } from "@tanstack/react-query"

export const DashboardContentPage = () => {

    const {} = useQuery({
        queryKey:["user-event-categories"],
        queryFn:async () => {
            

        }
    })
    return (
        <div>
            Hello
        </div>
    )
}