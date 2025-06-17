import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { fetchUser } from "@/lib/actions/user.actions"
import PostThread from "@/components/forms/PostThread"


async function Page() {
    const user = await currentUser()

    if (!user) return null
    
    const userInfo = await fetchUser(user.id)

    if (!userInfo?.onboarded) redirect('/onboarding')

    return (
        <>
            <h1 className="head-text">Submit your AI agents</h1>
            <h1 className="body-semibold text-light-2">Share your AI agent with the world and start earning.</h1>
            <PostThread userId={JSON.stringify(userInfo._id)} />
        </>
    )
}

export default Page