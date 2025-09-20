import createCategorySchema from "@/components/createCategorySchema"
import prisma from "@/lib/prisma"
import { parseColor } from "@/lib/utils"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"




export const POST = async(req:Request) => {
  try {
      const auth = await currentUser()

    if(!auth) {
        return NextResponse.json({
            message:"not authenticated"
        }, {
            status:401
        })
    }

    const user = await prisma.user.findUnique({
        where:{
            externalId:auth.id
        }
    })

    if(!user) {
        return NextResponse.json({
            message:"user is not logged in"
        }, {
            status:401
        })
    }

    const body = await req.json()
    const parsedData = createCategorySchema.parse(body)
    if(!parsedData) {
        return NextResponse.json({
            message:"parsed data is not found"
        }, {
            status:401
        })
    }

    const {color, name, emoji} = parsedData
    const eventCategory = await prisma.eventCategory.create({
        data:{
            name:name.toLowerCase(),
            color:parseColor(color),
            emoji:emoji,
            userId:user.id
        }
    })

    return NextResponse.json({
        eventCategory
    })

  } catch (error) {
    return NextResponse.json({
        message:"error creating event category"
    },{
        status:401
    })
  }



}