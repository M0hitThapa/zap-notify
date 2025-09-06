import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import {startOfMonth} from "date-fns"
import superjson from 'superjson';

export const GET = async () => {
    const auth = await currentUser()

    if(!auth) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
const user = await prisma.user.findUnique({
    where: {
        externalId:auth.id
    }
})

if(!user) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
}

const categories = await prisma.eventCategory.findMany({
    where: {
        userId:user.id
    },
    select: {
        id:true,
        name:true,
        emoji:true,
        color:true,
        updatedAt:true,
        createdAt:true,
    },
    orderBy:{updatedAt:"desc"}
})

const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
        const now  = new Date()
        const firstDayOfMonth = startOfMonth(now)

        const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([
            prisma.event.findMany({
                where:{
                    EventCategory:{id:category.id},
                    createdAt: {gte:firstDayOfMonth}
                },
                select: {fields:true},
                distinct:["fields"]
            }).then((events) => {
                const fieldNames = new Set<string>()
                events.forEach((event) => {
                    Object.keys(event.fields as object).forEach
                    ((fieldName) => {
                        fieldNames.add(fieldName)
                    })
                })

                return fieldNames.size

            }),
            prisma.event.count({
                where: {
                      EventCategory:{id:category.id},
                    createdAt: {gte:firstDayOfMonth},
                }
            }),
            prisma.event.findFirst({
                where: {
                    EventCategory:{id:category.id}
                },
                orderBy:{
                    createdAt:"desc"
                },
                select:{
                    createdAt:true
                }
            })
        ])
        return {
            ...category,
            uniqueFieldCount,
            eventsCount,
            lastPing:lastPing?.createdAt || null,
        }

    })
)
//  const serializedData = superjson.serialize({
//     categories:categoriesWithCounts
// });
//  return NextResponse.json(serializedData);

return new Response (superjson.stringify({
    categories:categoriesWithCounts
}))

}