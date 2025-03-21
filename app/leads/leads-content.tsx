"use client"

import { LeadManagement } from "@/components/lead-management"
import { ChatWidget } from "@/components/chat-widget"
import { useLanguage } from "@/app/contexts/LanguageContext"

export function LeadsContent() {
  const { t } = useLanguage()

  return (
    <div className="relative">
      <LeadManagement />
      <ChatWidget />
    </div>
  )
} 