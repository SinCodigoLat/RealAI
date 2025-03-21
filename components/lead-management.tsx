"use client"

import { useState } from "react"
import { ArrowUpDown, Calendar, ChevronDown, MoreHorizontal, Search, User, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useLanguage } from "@/app/contexts/LanguageContext"

export function LeadManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedLead, setSelectedLead] = useState<string | null>(null)
  const { t } = useLanguage()

  const formatTimeAgo = (timeStr: string) => {
    if (timeStr.includes("hours")) {
      const hours = timeStr.split(" ")[0]
      return t('hoursAgo').replace('{hours}', hours)
    } else if (timeStr.includes("days")) {
      const days = timeStr.split(" ")[0]
      return t('daysAgo').replace('{days}', days)
    }
    return timeStr
  }

  const leads = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 123-4567",
      status: "Hot",
      statusColor: "bg-success",
      score: 92,
      property: "Luxury Condo Downtown",
      budget: "$750,000 - $850,000",
      timeframe: "1-3 months",
      lastContact: "2 hours ago",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      initials: "SJ",
      notes: "Very interested in waterfront properties. Has financing pre-approved.",
      qualificationFactors: {
        budgetClarity: 95,
        decisionTimeframe: 90,
        contactInformation: 100,
        preferenceSpecificity: 85,
        engagementLevel: 90,
      },
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "m.chen@example.com",
      phone: "(555) 987-6543",
      status: "Warm",
      statusColor: "bg-warning",
      score: 78,
      property: "Suburban Family Home",
      budget: "$450,000 - $550,000",
      timeframe: "3-6 months",
      lastContact: "1 day ago",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      initials: "MC",
      notes: "Looking for a family home with good school district. Still comparing options.",
      qualificationFactors: {
        budgetClarity: 80,
        decisionTimeframe: 70,
        contactInformation: 100,
        preferenceSpecificity: 75,
        engagementLevel: 65,
      },
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      phone: "(555) 234-5678",
      status: "Hot",
      statusColor: "bg-success",
      score: 95,
      property: "Waterfront Property",
      budget: "$1,200,000 - $1,500,000",
      timeframe: "1-2 months",
      lastContact: "3 hours ago",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      initials: "ER",
      notes: "Ready to make an offer. Has visited the property twice. Very motivated buyer.",
      qualificationFactors: {
        budgetClarity: 100,
        decisionTimeframe: 95,
        contactInformation: 100,
        preferenceSpecificity: 90,
        engagementLevel: 90,
      },
    },
    {
      id: "4",
      name: "David Wilson",
      email: "d.wilson@example.com",
      phone: "(555) 876-5432",
      status: "Cold",
      statusColor: "bg-destructive",
      score: 45,
      property: "Studio Apartment",
      budget: "$200,000 - $250,000",
      timeframe: "6-12 months",
      lastContact: "5 days ago",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      initials: "DW",
      notes: "Just browsing options. Not ready to commit. Budget constraints.",
      qualificationFactors: {
        budgetClarity: 50,
        decisionTimeframe: 30,
        contactInformation: 80,
        preferenceSpecificity: 40,
        engagementLevel: 25,
      },
    },
    {
      id: "5",
      name: "Jessica Taylor",
      email: "j.taylor@example.com",
      phone: "(555) 345-6789",
      status: "Warm",
      statusColor: "bg-warning",
      score: 72,
      property: "Townhouse",
      budget: "$350,000 - $400,000",
      timeframe: "2-4 months",
      lastContact: "2 days ago",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      initials: "JT",
      notes: "First-time homebuyer. Interested in townhouses with low maintenance.",
      qualificationFactors: {
        budgetClarity: 75,
        decisionTimeframe: 65,
        contactInformation: 90,
        preferenceSpecificity: 70,
        engagementLevel: 60,
      },
    },
    {
      id: "6",
      name: "Robert Kim",
      email: "r.kim@example.com",
      phone: "(555) 456-7890",
      status: "Hot",
      statusColor: "bg-success",
      score: 88,
      property: "Modern Loft",
      budget: "$600,000 - $700,000",
      timeframe: "1-2 months",
      lastContact: "1 day ago",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      initials: "RK",
      notes: "Looking for investment property. Has purchased multiple properties before.",
      qualificationFactors: {
        budgetClarity: 90,
        decisionTimeframe: 85,
        contactInformation: 100,
        preferenceSpecificity: 80,
        engagementLevel: 85,
      },
    },
  ]

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.property.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || lead.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const getSelectedLead = () => {
    return leads.find((lead) => lead.id === selectedLead)
  }

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('leadManagement')}</h1>
          <p className="text-muted-foreground">{t('leadManagementDescription')}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <User className="mr-2 h-4 w-4" />
            {t('addLead')}
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="md:w-3/4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <CardTitle>{t('leads')}</CardTitle>
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={t('searchLeads')}
                      className="pl-8 w-full sm:w-[200px] md:w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder={t('filterByStatus')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('allLeads')}</SelectItem>
                      <SelectItem value="hot">{t('hotLeads')}</SelectItem>
                      <SelectItem value="warm">{t('warmLeads')}</SelectItem>
                      <SelectItem value="cold">{t('coldLeads')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">
                      <Button variant="ghost" className="p-0 hover:bg-transparent">
                        <span>{t('name')}</span>
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="w-[120px]">{t('status')}</TableHead>
                    <TableHead className="w-[100px]">{t('score')}</TableHead>
                    <TableHead className="w-[250px]">{t('propertyInterest')}</TableHead>
                    <TableHead className="w-[150px]">{t('lastContact')}</TableHead>
                    <TableHead className="w-[100px] text-right">{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={lead.avatar} />
                            <AvatarFallback>{lead.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">{lead.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${lead.statusColor} text-white`} variant="outline">
                          {t(lead.status.toLowerCase() + 'Leads').split(' ')[0]}
                        </Badge>
                      </TableCell>
                      <TableCell>{lead.score}%</TableCell>
                      <TableCell className="truncate max-w-[250px]">{lead.property}</TableCell>
                      <TableCell>{formatTimeAgo(lead.lastContact)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedLead(lead.id)}>
                              <User className="mr-2 h-4 w-4" />
                              {t('viewDetails')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              {t('startChat')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        {selectedLead && (
          <div className="md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>{t('qualificationFactors')}</CardTitle>
              </CardHeader>
              <CardContent>
                {getSelectedLead() && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{t('budgetClarity')}</div>
                        <div className="text-sm text-muted-foreground">
                          {getSelectedLead()?.qualificationFactors.budgetClarity}%
                        </div>
                      </div>
                      <Progress value={getSelectedLead()?.qualificationFactors.budgetClarity} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{t('decisionTimeframe')}</div>
                        <div className="text-sm text-muted-foreground">
                          {getSelectedLead()?.qualificationFactors.decisionTimeframe}%
                        </div>
                      </div>
                      <Progress value={getSelectedLead()?.qualificationFactors.decisionTimeframe} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{t('contactInformation')}</div>
                        <div className="text-sm text-muted-foreground">
                          {getSelectedLead()?.qualificationFactors.contactInformation}%
                        </div>
                      </div>
                      <Progress value={getSelectedLead()?.qualificationFactors.contactInformation} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{t('preferenceSpecificity')}</div>
                        <div className="text-sm text-muted-foreground">
                          {getSelectedLead()?.qualificationFactors.preferenceSpecificity}%
                        </div>
                      </div>
                      <Progress value={getSelectedLead()?.qualificationFactors.preferenceSpecificity} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{t('engagementLevel')}</div>
                        <div className="text-sm text-muted-foreground">
                          {getSelectedLead()?.qualificationFactors.engagementLevel}%
                        </div>
                      </div>
                      <Progress value={getSelectedLead()?.qualificationFactors.engagementLevel} className="h-2" />
                    </div>
                    <div className="pt-4 space-y-4">
                      <div>
                        <div className="text-sm font-medium">{t('notes')}</div>
                        <div className="text-sm text-muted-foreground mt-1">{getSelectedLead()?.notes}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{t('budget')}</div>
                        <div className="text-sm text-muted-foreground mt-1">{getSelectedLead()?.budget}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{t('timeframe')}</div>
                        <div className="text-sm text-muted-foreground mt-1">{getSelectedLead()?.timeframe}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{t('email')}</div>
                        <div className="text-sm text-muted-foreground mt-1">{getSelectedLead()?.email}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{t('phone')}</div>
                        <div className="text-sm text-muted-foreground mt-1">{getSelectedLead()?.phone}</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

