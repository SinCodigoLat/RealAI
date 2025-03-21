"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Building2, Calendar, DollarSign, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { PremiumFeatureLock } from "@/components/PremiumFeatureLock"
import { useLanguage } from "@/app/contexts/LanguageContext"

export function AgentDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const { t } = useLanguage()

  const formatLastDays = (days: string) => {
    return t('lastDays').replace('{days}', days)
  }

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('dashboard')}</h1>
          <p className="text-muted-foreground">{t('welcomeBack').replace('{name}', 'John')}</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('timeRange')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">{formatLastDays('7')}</SelectItem>
              <SelectItem value="30d">{formatLastDays('30')}</SelectItem>
              <SelectItem value="90d">{formatLastDays('90')}</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            {t('customRange')}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t('totalLeads')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                12% {t('fromLastMonth')}
              </span>
            </p>
            <div className="mt-4 h-1 w-full bg-muted">
              <div className="h-1 bg-primary" style={{ width: "75%" }}></div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <div>0</div>
              <div>{t('target')}: 330</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t('qualifiedLeads')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                18% {t('fromLastMonth')}
              </span>
            </p>
            <div className="mt-4 h-1 w-full bg-muted">
              <div className="h-1 bg-success" style={{ width: "65%" }}></div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <div>0</div>
              <div>{t('target')}: 130</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t('propertiesListed')}</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive flex items-center">
                <ArrowDown className="mr-1 h-3 w-3" />
                3% {t('fromLastMonth')}
              </span>
            </p>
            <div className="mt-4 h-1 w-full bg-muted">
              <div className="h-1 bg-info" style={{ width: "85%" }}></div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <div>0</div>
              <div>{t('target')}: 50</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t('potentialRevenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success flex items-center">
                <ArrowUp className="mr-1 h-3 w-3" />
                24% {t('fromLastMonth')}
              </span>
            </p>
            <div className="mt-4 h-1 w-full bg-muted">
              <div className="h-1 bg-secondary" style={{ width: "60%" }}></div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <div>$0</div>
              <div>{t('target')}: $2M</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
          <TabsTrigger value="analytics">{t('analytics')}</TabsTrigger>
          <TabsTrigger value="leads">{t('recentLeads')}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>{t('leadQualificationTrends')}</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart
                    data={[
                      { name: "Jan", hot: 12, warm: 18, cold: 5 },
                      { name: "Feb", hot: 15, warm: 20, cold: 8 },
                      { name: "Mar", hot: 18, warm: 22, cold: 10 },
                      { name: "Apr", hot: 20, warm: 25, cold: 12 },
                      { name: "May", hot: 22, warm: 28, cold: 15 },
                      { name: "Jun", hot: 25, warm: 30, cold: 18 },
                      { name: "Jul", hot: 28, warm: 32, cold: 20 },
                    ]}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      name={t('hotLeads')}
                      dataKey="hot"
                      stackId="1"
                      stroke="hsl(var(--success))"
                      fill="hsl(var(--success))"
                    />
                    <Area
                      type="monotone"
                      name={t('warmLeads')}
                      dataKey="warm"
                      stackId="1"
                      stroke="hsl(var(--warning))"
                      fill="hsl(var(--warning))"
                    />
                    <Area
                      type="monotone"
                      name={t('coldLeads')}
                      dataKey="cold"
                      stackId="1"
                      stroke="hsl(var(--destructive))"
                      fill="hsl(var(--destructive))"
                    />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>{t('leadQualificationDistribution')}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: t('hotLeads'), value: 35, color: "var(--success)" },
                        { name: t('warmLeads'), value: 45, color: "var(--warning)" },
                        { name: t('coldLeads'), value: 20, color: "var(--destructive)" },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: t('hotLeads'), value: 35, color: "hsl(var(--success))" },
                        { name: t('warmLeads'), value: 45, color: "hsl(var(--warning))" },
                        { name: t('coldLeads'), value: 20, color: "hsl(var(--destructive))" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>{t('recentActivity')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "New Lead",
                      name: "Sarah Johnson",
                      time: "10 minutes ago",
                      score: "Hot",
                      scoreColor: "bg-success",
                      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
                      initials: "SJ",
                    },
                    {
                      type: "Property View",
                      name: "Michael Chen",
                      time: "45 minutes ago",
                      score: "Warm",
                      scoreColor: "bg-warning",
                      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
                      initials: "MC",
                    },
                    {
                      type: "Chat Conversation",
                      name: "Emily Rodriguez",
                      time: "2 hours ago",
                      score: "Hot",
                      scoreColor: "bg-success",
                      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
                      initials: "ER",
                    },
                    {
                      type: "Property Inquiry",
                      name: "David Wilson",
                      time: "3 hours ago",
                      score: "Cold",
                      scoreColor: "bg-destructive",
                      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
                      initials: "DW",
                    },
                    {
                      type: "New Lead",
                      name: "Jessica Taylor",
                      time: "5 hours ago",
                      score: "Warm",
                      scoreColor: "bg-warning",
                      avatar: "/placeholder.svg?height=40&width=40",
                      initials: "JT",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 rounded-md border p-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activity.avatar} />
                        <AvatarFallback>{activity.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.type} • {activity.time}
                        </p>
                      </div>
                      <Badge className={`${activity.scoreColor} text-white`} variant="outline">
                        {activity.score}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Qualification Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Budget Clarity</div>
                      <div className="text-sm text-muted-foreground">78%</div>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Decision Timeframe</div>
                      <div className="text-sm text-muted-foreground">65%</div>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Contact Information</div>
                      <div className="text-sm text-muted-foreground">92%</div>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Preference Specificity</div>
                      <div className="text-sm text-muted-foreground">54%</div>
                    </div>
                    <Progress value={54} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Engagement Level</div>
                      <div className="text-sm text-muted-foreground">81%</div>
                    </div>
                    <Progress value={81} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Lead Source Performance</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={[
                      { name: "Website", leads: 85, qualified: 42 },
                      { name: "Referral", leads: 65, qualified: 38 },
                      { name: "Social", leads: 45, qualified: 20 },
                      { name: "Email", leads: 30, qualified: 12 },
                      { name: "Events", leads: 23, qualified: 10 },
                    ]}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leads" fill="hsl(var(--primary))" name="Total Leads" />
                    <Bar dataKey="qualified" fill="hsl(var(--success))" name="Qualified" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Chat Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Conversations</div>
                    <div className="text-sm font-medium">156</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Avg. Duration</div>
                    <div className="text-sm font-medium">4m 32s</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Lead Capture Rate</div>
                    <div className="text-sm font-medium">68%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Qualification Rate</div>
                    <div className="text-sm font-medium">42%</div>
                  </div>
                  <div className="pt-4">
                    <h4 className="mb-2 text-sm font-medium">Sentiment Analysis</h4>
                    <ResponsiveContainer width="100%" height={100}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Positive", value: 65, color: "hsl(var(--success))" },
                            { name: "Neutral", value: 25, color: "hsl(var(--info))" },
                            { name: "Negative", value: 10, color: "hsl(var(--destructive))" },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {[
                            { name: "Positive", value: 65, color: "hsl(var(--success))" },
                            { name: "Neutral", value: 25, color: "hsl(var(--info))" },
                            { name: "Negative", value: 10, color: "hsl(var(--destructive))" },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 text-xs">
                      <div className="flex items-center">
                        <div className="mr-1 h-3 w-3 rounded-full bg-success"></div>
                        <span>Positive</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-1 h-3 w-3 rounded-full bg-info"></div>
                        <span>Neutral</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-1 h-3 w-3 rounded-full bg-destructive"></div>
                        <span>Negative</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Sarah Johnson",
                    email: "sarah.j@example.com",
                    phone: "(555) 123-4567",
                    status: "Hot",
                    statusColor: "bg-success",
                    property: "Luxury Condo Downtown",
                    budget: "$750,000 - $850,000",
                    timeframe: "1-3 months",
                    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
                    initials: "SJ",
                  },
                  {
                    name: "Michael Chen",
                    email: "m.chen@example.com",
                    phone: "(555) 987-6543",
                    status: "Warm",
                    statusColor: "bg-warning",
                    property: "Suburban Family Home",
                    budget: "$450,000 - $550,000",
                    timeframe: "3-6 months",
                    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
                    initials: "MC",
                  },
                  {
                    name: "Emily Rodriguez",
                    email: "emily.r@example.com",
                    phone: "(555) 234-5678",
                    status: "Hot",
                    statusColor: "bg-success",
                    property: "Waterfront Property",
                    budget: "$1,200,000 - $1,500,000",
                    timeframe: "1-2 months",
                    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
                    initials: "ER",
                  },
                  {
                    name: "David Wilson",
                    email: "d.wilson@example.com",
                    phone: "(555) 876-5432",
                    status: "Cold",
                    statusColor: "bg-destructive",
                    property: "Studio Apartment",
                    budget: "$200,000 - $250,000",
                    timeframe: "6-12 months",
                    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
                    initials: "DW",
                  },
                ].map((lead, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 rounded-md border p-4 sm:flex-row sm:space-y-0 sm:space-x-4"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={lead.avatar} />
                      <AvatarFallback>{lead.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{lead.name}</h4>
                        <Badge className={`${lead.statusColor} text-white`} variant="outline">
                          {lead.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {lead.email} • {lead.phone}
                      </div>
                      <div className="mt-2 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
                        <div>
                          <span className="font-medium">Interest: </span>
                          {lead.property}
                        </div>
                        <div>
                          <span className="font-medium">Budget: </span>
                          {lead.budget}
                        </div>
                        <div>
                          <span className="font-medium">Timeframe: </span>
                          {lead.timeframe}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="opacity-50 pointer-events-none">
            <div className="p-4 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold">Analítica</h2>
            </div>
          </div>
          <PremiumFeatureLock />
        </div>

        <div className="relative">
          <div className="opacity-50 pointer-events-none">
            <div className="p-4 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold">Calendario</h2>
            </div>
          </div>
          <PremiumFeatureLock />
        </div>
      </div>
    </div>
  )
}

