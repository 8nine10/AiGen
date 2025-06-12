import { fetchUserPosts } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import ThreadCard from "../cards/ThreadCard"

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
    isLoggedIn?: boolean;
}

const ThreadsTab = async({
    currentUserId,
    accountId,
    accountType,
    isLoggedIn,
}: Props) => {
    let result = await fetchUserPosts(accountId)
    console.log(result);
    if (!result) redirect('/')
    
    return (
        <section className="mt-9 flex flex-col gap-10">
            {result.threads.map((post: any) => (
                <ThreadCard
                    key={post._id}
                    id={post._id}
                    parentId={post.parentId || null}
                    content={post.text}
                    community={post.community}
                    createdAt={post.createdAt}
                    comments={post.children}
                    likes={post.likes}
                    agentName={post.agentName}
                    category={post.category}
                    description={post.description}
                    price={post.price}
                    instructions={post.instructions}
                    dependencies={post.dependencies}
                    license={post.license}
                    aiModelUrl={post.aimodel}
                    currentUserId={currentUserId || ""}
                    author={
                        accountType === 'User'
                            ? { name: result.name, image: result.image, id: result.id, username: result.username}
                            : { name: post.author.name, image: post.author.image, id: post.author.id, username: post.author.username }
                    }
                    isLoggedIn={isLoggedIn}
                />
            ))}
        </section>
    )
}

export default ThreadsTab