"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Building2, Calendar, ChevronDown, Home, MessageSquare, Settings, Users } from "lucide-react"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PremiumFeatureLock } from "./PremiumFeatureLock"
import { LanguageSelector } from "./language-selector"
import { useLanguage } from "@/app/contexts/LanguageContext"

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)
  const { t } = useLanguage()

  const isActive = (path: string) => pathname === path

  return (
    <SidebarComponent>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">RealAI</h1>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('main')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")}>
                  <Link href="/">
                    <Home className="h-5 w-5" />
                    <span>{t('dashboard')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/leads")}>
                  <Link href="/leads">
                    <Users className="h-5 w-5" />
                    <span>{t('leads')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/properties")}>
                  <Link href="/properties">
                    <Building2 className="h-5 w-5" />
                    <span>{t('properties')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/client-chat")}>
                  <Link href="/client-chat">
                    <MessageSquare className="h-5 w-5" />
                    <span>{t('clientChat')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="relative">
                <SidebarMenuButton className="cursor-not-allowed opacity-75" isActive={isActive("/analytics")}>
                  <BarChart3 className="h-5 w-5" />
                  <span>{t('analytics')}</span>
                </SidebarMenuButton>
                <PremiumFeatureLock />
              </SidebarMenuItem>
              <SidebarMenuItem className="relative">
                <SidebarMenuButton className="cursor-not-allowed opacity-75" isActive={isActive("/calendar")}>
                  <Calendar className="h-5 w-5" />
                  <span>{t('calendar')}</span>
                </SidebarMenuButton>
                <PremiumFeatureLock />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-4">
          <LanguageSelector />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/88.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">{t('premiumAgent')}</span>
                </div>
                <ChevronDown className="ml-auto h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>{t('settings')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>{t('signOut')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </SidebarComponent>
  )
}

