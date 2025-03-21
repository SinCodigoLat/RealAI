"use client"

import { useLanguage } from "@/app/contexts/LanguageContext"
import { PropertyListing } from "@/components/property-listing"
import { ChatWidget } from "@/components/chat-widget"

export function PropertiesPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <PropertyListing />
      </main>
      <ChatWidget />
    </div>
  )
} 