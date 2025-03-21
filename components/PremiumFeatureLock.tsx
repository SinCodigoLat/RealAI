"use client"

import { Lock } from "lucide-react"
import { useLanguage } from "@/app/contexts/LanguageContext"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function PremiumFeatureLock() {
  const { t } = useLanguage()
  
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Lock className="h-4 w-4 text-amber-500 cursor-pointer hover:text-amber-600 transition-colors" />
          </TooltipTrigger>
          <TooltipContent side="left" className="max-w-[200px]">
            <p className="text-sm">{t('upgradeRequired')}</p>
            <p className="text-xs text-muted-foreground mt-1">{t('unlockFeatures')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}