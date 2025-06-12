export const dynamic = 'force-dynamic';

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";
import Card from "@/components/Card";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { Brain, BarChart2, Pencil, Bot, Search } from "lucide-react";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  try {
    // Fetch the posts and current user concurrently

    const [result, user] = await Promise.all([fetchPosts(searchParams.page? +searchParams.page : 1, 30), currentUser()]);

    const topRatedAgents = [
      { name: "Agent Name 1", rating: 4.8, icon: "🧑‍💻" },
      { name: "Agent Name 2", rating: 4.7, icon: "📊" },
      { name: "Agent Name 3", rating: 4.6, icon: "✏️" },
      { name: "Agent Name 4", rating: 4.5, icon: "🧠" },
    ];

    const featuredCategories = [
      { label: "Data Analysis", icon: "📅" },
      { label: "Image Generation", icon: "🌄" },
      { label: "Text Processing", icon: "🌐" },
      { label: "Code Helpers", icon: "</>" },
    ];
    // Render the component
    return (
      <>
      <main className="p-8 bg-black min-h-screen text-white space-y-12">
        <h1 className="head-text text-left">Home</h1>
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to AiGen</h1>
          <p className="text-gray-400 text-lg">Crafting the evolution</p>
          <p className="text-gray-300">Discover powerful AI agents ready to enhance your workflow</p>
        </section>

        {/* AI Agent Bundles */}
        <section>
          <h2 className="text-2xl font-bold mb-4">AI Agent Bundles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Bundle */}
            <div className="rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-48 flex items-center justify-center text-6xl">
                <Pencil size={48} />
              </div>
              <div className="bg-zinc-900 p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Productivity Suite</h3>
                  <p className="text-sm text-gray-400">A complete suite of productivity AI agents</p>
                </div>
                <span className="text-white font-bold text-lg">$99.99</span>
              </div>
            </div>

            {/* Second Bundle */}
            <div className="rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-48 flex items-center justify-center text-6xl">
                <Brain size={48} />
              </div>
              <div className="bg-zinc-900 p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Creative AI Pack</h3>
                  <p className="text-sm text-gray-400">Unleash your creativity with AI-powered tools</p>
                </div>
                <span className="text-white font-bold text-lg">$129.99</span>
              </div>
            </div>
          </div>
        </section>

        {/* Top Rated */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Top Rated</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card title="Agent Name 1" icon="🤖" rating={4.8} bgColor="bg-gradient-to-br from-pink-500 to-red-500"/>
            <Card title="Agent Name 2" icon="📈" rating={4.7} bgColor="bg-gradient-to-r from-green-400 to-emerald-500"/>
            <Card title="Agent Name 3" icon="✏️" rating={4.6} bgColor="bg-gradient-to-br from-pink-500 to-red-500"/>
            <Card title="Agent Name 4" icon="🧠" rating={4.5} bgColor="bg-gradient-to-r from-green-400 to-emerald-500"/>
          </div>
        </section>

        {/* Featured Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Featured Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card title="Data Analysis" icon="📊" bgColor="bg-gradient-to-br from-pink-500 to-red-500"/>
            <Card title="Image Generation" icon="🖼️" bgColor="bg-gradient-to-r from-green-400 to-emerald-500"/>
            <Card title="Text Processing" icon="🔤" bgColor="bg-gradient-to-br from-pink-500 to-red-500"/>
            <Card title="Code Helpers" icon="</>" bgColor="bg-gradient-to-r from-green-400 to-emerald-500"/>
          </div>
        </section>
      </main>
        <section className="mt-9 flex flex-col gap-10">
          <h2 className="text-2xl font-bold mb-4">All Model</h2>
          {result.posts.length === 0 ? (
            <p className="no-result">No Comments found</p>
          ) : (
            result.posts.map((post) => {
              if (post.parentId === null) {
                return (
                  <ThreadCard
                    key={post._id}
                    id={post._id}
                    currentUserId={user?.id || ""}
                    parentId={post.parentId || null}
                    content={post.text}
                    author={post.author}
                    community={post.community}
                    createdAt={post.createdAt}
                    comments={post.children}
                    likes={post.likes}
                    isLoggedIn={user ? true : false}
                    agentName={post.agentName}
                    category={post.category}
                    description={post.description}
                    price={post.price}
                    instructions={post.instructions}
                    dependencies={post.dependencies}
                    license={post.license}
                    aiModelUrl={post.aimodel}
                  />
                )
              }
            })
          )}
        </section>
        <Pagination
          path='/'
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <>
        <h1 className="head-text text-left">Home</h1>
        <p className="error-message">Failed to load Comments. Please try again later.</p>
      </>
    );
  }
}
