import Link from "next/link"
import { MaxWidthWrapper } from "./max-width-wrapper"
import { SignOutButton } from "@clerk/nextjs"
import { Button, buttonVariants } from "./ui/button"
import { currentUser } from "@clerk/nextjs/server"

export const Navbar = async() => {
    const user = await currentUser()
    return <div className="sticky h-16 z-[100] top-0 bg-white/80 border-b border-gray-100">
        <MaxWidthWrapper>
            <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex z-40 font-bold text-3xl text-shadow-2xs bg-gradient-to-r from-black via-cyan-800 to-cyan-600 bg-clip-text text-transparent">ZapLink</Link>
                <div className="h-full flex items-center space-x-4">
                    {user ? <>
                    <SignOutButton>
                        <Button variant="ghost" size="lg" >
                            SignOut
                        </Button>
                    </SignOutButton>
                    <Link href="/dashboard" className={buttonVariants({
                        size:"lg",
                        className:"flex items-center gap-1.5"
                    })}>
                        Dashboard
                    </Link>
                    </> : (<>
                    <Link href="/pricing" className={buttonVariants({
                        size:"lg",
                        variant:"ghost"
                    })}>
                        Pricing
                    
                    </Link>
                    <Link href="/sign-in" className={buttonVariants({
                        size:"lg",
                        variant:"ghost"
                    })}>
                   SignIn
                    </Link>
                     <Link href="/sign-up" className={buttonVariants({
                        size:"lg",
                        className:"flex items-center gap-1.5"
                    })}>
                   SignUp
                    </Link>
                    </>)}

                </div>
            </div>
        </MaxWidthWrapper>
        </div>
}