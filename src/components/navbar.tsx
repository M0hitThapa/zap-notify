import Link from "next/link"
import { MaxWidthWrapper } from "./max-width-wrapper"
import { SignOutButton } from "@clerk/nextjs"

export const Navbar = () => {
    const user = false
    return <div className="sticky h-16 z-[100] top-0 bg-white/80 border-b border-gray-100">
        <MaxWidthWrapper>
            <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex z-40 font-bold text-3xl text-shadow-2xs bg-gradient-to-r from-black via-cyan-800 to-cyan-600 bg-clip-text text-transparent">ZapLink</Link>
                <div className="h-full flex items-center space-x-4">
                    {user ? <>
                    <SignOutButton>
                        <button>
                            
                        </button>
                    </SignOutButton>
                    </> : null}

                </div>
            </div>
        </MaxWidthWrapper>
        </div>
}