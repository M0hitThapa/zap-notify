'use client'

import { CATEGORY_VALIDATE_NAME } from "@/lib/validators/category-validate"
import { useQueryClient } from "@tanstack/react-query"
import { PropsWithChildren, useState } from "react"
import z from "zod"
import { Modal } from "./ui/modal"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

const EVENT_CATEGORY_VALIDATE = z.object({
    name:CATEGORY_VALIDATE_NAME,
    color:z.string().min(1, "color is required").regex(/^#[0-9A-F]+$/i, "invalid color format"),
    emoji:z.emoji("emoji is required").optional()

})

type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATE>



export const CreateContentCategoryModal = ({children}: PropsWithChildren) => {

    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()

   const {register, handleSubmit} = useForm<EventCategoryForm>({
    resolver:zodResolver(EVENT_CATEGORY_VALIDATE)
})

const onSubmit = (data:EventCategoryForm) => {

}


    return (
        <>
        <div onClick={() => setIsOpen(true)}>
            {children}
        </div>
        <Modal showModal={isOpen} setShowModal={setIsOpen}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                <h2 className="text-lg/7 font-semibold tracking-tight text-neutral-950">
                    Create new Event
                </h2>
            </div>
            </form>
        </Modal>
        </>
    )
}