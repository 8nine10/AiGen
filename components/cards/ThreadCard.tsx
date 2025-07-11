import Image from "next/image";
import Link from "next/link";
import DeleteThread from "../forms/DeleteThread";
import LikeThread from "../forms/LikeThread";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | '';
    content: string;
    author: {
        name: string;
        username: string;
        image: string;
        id: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        }
    }[];
    isComment?: boolean;
    likes: {
        id: string;
    }[];
    isLoggedIn?: boolean;
    agentName?: string;
    aiModelUrl?: string;
    category: string;
    description: string;
    price: string;
    instructions: string;
    dependencies: string;
    license: string;
}

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
    likes,
    isLoggedIn,
    agentName,
    aiModelUrl,
    category,
    description,
    price,
    instructions,
    dependencies,
    license
}: Props) => {
    return (
        <article className={`flex w-full flex-col rounded-xl ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'}`}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                            <Image  
                                src={author.image} 
                                alt="Profile image"
                                width={48}
                                height={48}
                                className="rounded-full cursor-pointer w-auto h-auto"
                            />
                        </Link>
                        <div className="thread-card_bar" />
                    </div>
                    <div className="w-full flex flex-col">
                        <Link href={`/profile/${author.id}`}>
                            <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                            <h4 className="cursor-pointer text-small-regular text-light-4">@{author.username}</h4>
                            <h4 className="cursor-pointer text-heading3-bold text-light-1">{agentName}</h4>
                            <h4 className="cursor-pointer text-heading4-medium text-light-1">{category}</h4>
                        </Link>
                        <p className="mt-2 text-base-semibold text-light-2">{description}</p>
                        <p className="mt-2 text-small-regular text-light-2">Price : {price}</p>
                        <p className="mt-2 text-small-regular text-light-2">Instructions: {instructions}</p>
                        <p className="mt-2 text-small-regular text-light-2">Dependencies: {dependencies}</p>
                        <p className="mt-2 text-tiny-medium text-light-2">License: {license}</p>
                        <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
                            <div className="flex gap-3.5">
                                <LikeThread
                                    threadId={JSON.stringify(id)}
                                    currentUserId={currentUserId}
                                    isLiked={likes.some(like => like.id === currentUserId)}
                                    likeCount={likes.length}
                                    isLoggedIn={isLoggedIn}
                                />
                                {aiModelUrl && (
                                    <a href={aiModelUrl} download className="cursor-pointer">
                                        <Image
                                            src='/assets/file-arrow-down-solid.svg'
                                            alt='download'
                                            width={16}
                                            height={16}
                                            className="object-contain"
                                        />
                                    </a>
                                )}
                                <Image src='/assets/repost.svg' alt='repost' width={24} height={24} className="cursor-pointer object-contain"/>
                                <Image src='/assets/share.svg' alt='share' width={24} height={24} className="cursor-pointer object-contain"/>
                            </div>
                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">
                                        {comments.length} replies
                                    </p>
                                </Link>
                            )}    
                        </div>                    
                    </div>
                </div>
                <DeleteThread
                    threadId={JSON.stringify(id)}
                    currentUserId={currentUserId}
                    authorId={author.id}
                    parentId={parentId}
                    isComment={isComment}
                />
            </div>
            {!isComment && comments.length > 0 && (
                <div className='ml-1 mt-3 flex items-center gap-2'>
                    {comments.slice(0, 2).map((comment, index) => (
                        <Image
                            key={index}
                            src={comment.author.image}
                            alt={`user_${index}`}
                            width={24}
                            height={24}
                            className={`${index !== 0 && "-ml-5"} rounded-full object-cover h-auto w-auto`}
                        />
                    ))}
                    <Link href={`/thread/${id}`}>
                        <p className='mt-1 text-subtle-medium text-gray-1'>
                            {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                        </p>
                    </Link>
                </div>
            )}
        </article>
    );
}

export default ThreadCard;
