'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import MainPage from "./maindashboard/page"

 const Page = () => {

    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <div>
        <MainPage />
    </div>
        </QueryClientProvider>
    )
}

export default Page