import type { Metadata } from "next"
import { ClientChat } from "@/components/client-chat"

export const metadata: Metadata = {
  title: "Client Chat | RealAI",
  description: "Chat with our AI assistant to find your perfect property",
}

export default function ClientChatPage() {
  return <ClientChat />
}

