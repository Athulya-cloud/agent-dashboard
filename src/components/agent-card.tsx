import Link from "next/link";
import { Agent } from "@/lib/types";

const MODEL_COLORS: Record<string, string> = {
  opus: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  sonnet: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  haiku: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link href={`/agent/${agent.slug}`}>
      <div className="group relative rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-purple-500/40 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/5">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-3xl">{agent.emoji}</span>
          <div>
            <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
              {agent.name.toUpperCase()}
            </h3>
            <p className="text-xs text-gray-500">{agent.title}</p>
          </div>
        </div>
        <p className="mb-4 text-sm text-gray-400 line-clamp-2">
          {agent.description}
        </p>
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${MODEL_COLORS[agent.model] || MODEL_COLORS.sonnet}`}
          >
            {agent.model}
          </span>
          <span className="text-xs text-gray-600">
            {agent.tools.length} tool{agent.tools.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}
