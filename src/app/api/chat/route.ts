import { getAgent } from "@/lib/agents";
import { client, getModelId } from "@/lib/anthropic";
import { Message } from "@/lib/types";

export async function POST(req: Request) {
  const { slug, messages } = (await req.json()) as {
    slug: string;
    messages: Message[];
  };

  const agent = getAgent(slug);
  if (!agent) {
    return new Response("Agent not found", { status: 404 });
  }

  const stream = await client.messages.stream({
    model: getModelId(agent.model),
    max_tokens: 4096,
    system: agent.systemPrompt,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
