import { SignIn } from "@clerk/nextjs"

const signIn =() => {
    return <div className="flex w-full justify-center items-center flex-1">
        <SignIn />
    </div>
}

export default signIn