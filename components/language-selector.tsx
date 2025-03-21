"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/app/contexts/LanguageContext"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex w-full gap-2">
      <Button
        variant={language === 'es' ? 'default' : 'outline'}
        className="flex-1"
        onClick={() => setLanguage('es')}
      >
        🇪🇸 Español
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        className="flex-1"
        onClick={() => setLanguage('en')}
      >
        🇺🇸 English
      </Button>
    </div>
  )
} 