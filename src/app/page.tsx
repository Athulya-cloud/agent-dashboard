import { getAgents } from "@/lib/agents";
import { AgentCard } from "@/components/agent-card";

export default function Dashboard() {
  const agents = getAgents();

  return (
    <div className="min-h-screen">
      <header className="relative px-6 pt-10 pb-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Agent Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {agents.length} agents ready to go
          </p>
        </div>
        <div className="header-glow absolute bottom-0 left-0 right-0" />
      </header>
      <main className="mx-auto max-w-6xl p-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} />
          ))}
        </div>
      </main>
    </div>
  );
}
