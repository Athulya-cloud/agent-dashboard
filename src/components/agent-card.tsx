import Link from "next/link";
import { Agent } from "@/lib/types";

const MODEL_STYLES: Record<string, { badge: string; glow: string }> = {
  opus: {
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    glow: "group-hover:shadow-purple-500/10",
  },
  sonnet: {
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    glow: "group-hover:shadow-blue-500/10",
  },
  haiku: {
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    glow: "group-hover:shadow-emerald-500/10",
  },
};

export function AgentCard({ agent }: { agent: Agent }) {
  const style = MODEL_STYLES[agent.model] || MODEL_STYLES.sonnet;

  return (
    <Link href={`/agent/${agent.slug}`}>
      <div
        className={`group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] hover:shadow-xl ${style.glow} hover:-translate-y-0.5`}
      >
        <div className="mb-3 flex items-center gap-3">
          <span className="text-3xl drop-shadow-lg">{agent.emoji}</span>
          <div className="min-w-0">
            <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors truncate">
              {agent.name.toUpperCase()}
            </h3>
            <p className="text-xs text-gray-500 truncate">{agent.title}</p>
          </div>
        </div>
        <p className="mb-4 text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {agent.description}
        </p>
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${style.badge}`}
          >
            {agent.model}
          </span>
          <span className="text-[11px] text-gray-600">
            {agent.tools.length} tool{agent.tools.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}
