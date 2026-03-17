import { getAgents } from "@/lib/agents";
import { AgentCard } from "@/components/agent-card";

export default function Dashboard() {
  const agents = getAgents();

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="border-b border-white/10 px-6 py-8">
        <h1 className="text-2xl font-bold text-white">
          Agent Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {agents.length} agents ready to go
        </p>
      </header>
      <main className="mx-auto max-w-6xl p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} />
          ))}
        </div>
      </main>
    </div>
  );
}
