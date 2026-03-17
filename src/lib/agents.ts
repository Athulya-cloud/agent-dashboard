import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Agent } from "./types";

const AGENTS_DIR = path.join(process.cwd(), "agents");

function extractEmojiAndTitle(body: string): { emoji: string; title: string } {
  const match = body.match(/^#\s+(\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)\s*(.+)/mu);
  if (match) {
    return { emoji: match[1], title: match[2].replace(/^[—–-]\s*/, "").trim() };
  }
  return { emoji: "🤖", title: "" };
}

export function getAgents(): Agent[] {
  const files = fs.readdirSync(AGENTS_DIR).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(AGENTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const { emoji, title } = extractEmojiAndTitle(content);
    return {
      slug: file.replace(".md", ""),
      name: data.name || file.replace(".md", ""),
      description: data.description || "",
      model: data.model || "sonnet",
      tools: data.tools || [],
      emoji,
      title: title || data.name || file.replace(".md", ""),
      systemPrompt: content,
    };
  });
}

export function getAgent(slug: string): Agent | undefined {
  return getAgents().find((a) => a.slug === slug);
}
