export interface Agent {
  slug: string;
  name: string;
  description: string;
  model: "opus" | "sonnet" | "haiku";
  tools: string[];
  emoji: string;
  title: string;
  systemPrompt: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}
