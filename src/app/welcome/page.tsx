'use client'
import React from 'react'
import Page from './(welcomepage)/page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const page = () => {
    const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
     <Page />
    </QueryClientProvider>
   
  )
}

export default page