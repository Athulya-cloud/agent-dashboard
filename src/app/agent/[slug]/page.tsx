import { getAgent, getAgents } from "@/lib/agents";
import { ChatInterface } from "@/components/chat-interface";
import Link from "next/link";
import { notFound } from "next/navigation";

const MODEL_COLORS: Record<string, string> = {
  opus: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  sonnet: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  haiku: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

export function generateStaticParams() {
  return getAgents().map((a) => ({ slug: a.slug }));
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();

  return (
    <div className="flex h-screen flex-col bg-[#0a0a0f]">
      <header className="flex items-center gap-4 border-b border-white/10 px-6 py-4">
        <Link
          href="/"
          className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-gray-400 transition-colors hover:border-white/20 hover:text-white"
        >
          &larr; Back
        </Link>
        <span className="text-2xl">{agent.emoji}</span>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-semibold text-white">
              {agent.name.toUpperCase()}
            </h1>
            <span
              className={`rounded-full border px-2 py-0.5 text-xs font-medium ${MODEL_COLORS[agent.model] || MODEL_COLORS.sonnet}`}
            >
              {agent.model}
            </span>
          </div>
          <p className="text-xs text-gray-500 line-clamp-1">
            {agent.title}
          </p>
        </div>
        <span className="text-xs text-gray-600">
          {agent.tools.length} tools
        </span>
      </header>
      <ChatInterface slug={agent.slug} />
    </div>
  );
}
