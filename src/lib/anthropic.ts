import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const MODEL_MAP: Record<string, string> = {
  opus: "claude-opus-4-20250514",
  sonnet: "claude-sonnet-4-20250514",
  haiku: "claude-haiku-4-5-20251001",
};

export function getModelId(model: string): string {
  return MODEL_MAP[model] || MODEL_MAP.sonnet;
}

export { client };
