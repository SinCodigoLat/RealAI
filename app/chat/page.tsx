import type { Metadata } from "next"
import { AIChat } from "@/components/ai-chat"

export const metadata: Metadata = {
  title: "AI Chat | RealAI",
  description: "Chat with AI assistant to qualify leads",
}

export default function ChatPage() {
  return <AIChat />
}

