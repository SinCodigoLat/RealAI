import type { Metadata } from "next"
import { AgentDashboard } from "@/components/agent-dashboard"
import { ChatWidget } from "@/components/chat-widget"

export const metadata: Metadata = {
  title: "Dashboard | RealAI",
  description: "Agent dashboard for RealAI platform",
}

export default function DashboardPage() {
  return (
    <div className="relative">
      <AgentDashboard />
      <ChatWidget />
    </div>
  )
}

