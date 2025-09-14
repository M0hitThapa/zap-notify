'use client'

import { CATEGORY_VALIDATE_NAME } from "@/lib/validators/category-validate"
import { useQueryClient } from "@tanstack/react-query"
import { PropsWithChildren, useState } from "react"
import z from "zod"
import { Modal } from "./ui/modal"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

const EVENT_CATEGORY_VALIDATE = z.object({
    name:CATEGORY_VALIDATE_NAME,
    color:z.string().min(1, "color is required").regex(/^#[0-9A-F]+$/i, "invalid color format"),
    emoji:z.emoji("emoji is required").optional()

})



const COLOR_OPTIONS = [
  "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
  "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
  "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
  "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
  "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
  "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
  "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
  "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
  "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
  "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
]

const EMOJI_OPTIONS = [
  { emoji: "💰", label: "Money (Sale)" },
  { emoji: "👤", label: "User (Sign-up)" },
  { emoji: "🎉", label: "Celebration" },
  { emoji: "📅", label: "Calendar" },
  { emoji: "🚀", label: "Launch" },
  { emoji: "📢", label: "Announcement" },
  { emoji: "🎓", label: "Graduation" },
  { emoji: "🏆", label: "Achievement" },
  { emoji: "💡", label: "Idea" },
  { emoji: "🔔", label: "Notification" },
]

type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATE>



export const CreateContentCategoryModal = ({children}: PropsWithChildren) => {

    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()

   const {register, handleSubmit, formState:{errors}, watch, setValue} = useForm<EventCategoryForm>({
    resolver:zodResolver(EVENT_CATEGORY_VALIDATE)
})

const onSubmit = (data:EventCategoryForm) => {

}

const color = watch("color")
const selectedEmoji = watch("emoji")

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
                <p className="text-sm/7 text-neutral-650">Create a new category to organize the event</p>
            </div>

            <div>
                <Label htmlFor="label">Name</Label>
                <Input autoFocus {...register("name")} placeholder="e.g. signup" className="w-full mt-2" />
                {errors.name ? (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                ):null}


            </div>
            <div>
                <Label>Color</Label>
                {COLOR_OPTIONS.map((premadeColor) => (
                    <button type="button" key={premadeColor} className={cn(`bg-[${premadeColor}]`, "size-10 rounded-full ring-2 ring-offset-2 transition-all ml-2", 
                        color === premadeColor ? "ring-cyan-700 scale-110" : "ring-transparent hover:scale-105"
                    )} 
                    onClick={() => setValue("color", premadeColor)}
                    >
                        
                    </button>

                ))}


                
                {errors.color ? (
                    <p className="mt-1 text-sm text-red-500">{errors.color.message}</p>
                ): null}


                
            </div>

            <div>
                <Label>Emoji</Label>
                {EMOJI_OPTIONS.map(({emoji, label}) => (
                    <button key={emoji} type="button" className={cn("size-10 rounded-md text-xl justify-center items-center transition-all mt-2 ml-2", 
                        selectedEmoji === emoji ? 
                        "bg-cyan-100 ring-2 ring-cyan-700 scale-110"
                        : "bg-cyan-100 hover:bg-cyan-700"
                        
                    )} onClick={() => setValue("emoji", emoji)}>
                        {emoji}

                    </button>
                ))}

                {errors.emoji ? (
                    <p className="text-sm mt-1 text-red-500">{errors.emoji.message}</p>
                ):null}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
                <Button type="submit">
                    Create Category
                </Button>

            </div>

            
            
            </form>
        </Modal>
        </>
    )
}