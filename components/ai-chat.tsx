"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Building2, Home, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

type Property = {
  id: string
  title: string
  type: string
  price: string
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  image: string
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "👋 Hi there! I'm your AI assistant for RealAI. I can help you find your dream property and answer any questions you might have. What are you looking for today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [leadProfile, setLeadProfile] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    timeframe: "",
    preferences: [],
    score: 0,
    status: "Not Qualified",
    statusColor: "bg-muted",
  })
  const [recommendedProperties, setRecommendedProperties] = useState<Property[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample properties data
  const properties: Property[] = [
    {
      id: "1",
      title: "Luxury Condo Downtown",
      type: "Condo",
      price: "$750,000",
      location: "Downtown",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "Suburban Family Home",
      type: "Single Family",
      price: "$450,000",
      location: "Suburbia",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2500,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "Waterfront Property",
      type: "Luxury",
      price: "$1,200,000",
      location: "Waterfront",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3800,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate AI response
  const simulateResponse = (userMessage: string) => {
    setIsTyping(true)

    setTimeout(() => {
      let response = ""
      const updatedProfile = { ...leadProfile }
      let updatedProperties: Property[] = []

      // Simple pattern matching for demo purposes
      if (userMessage.toLowerCase().includes("looking for") || userMessage.toLowerCase().includes("search")) {
        response =
          "Great! I can help you find the perfect property. Could you tell me your budget range and what type of property you're interested in?"
      } else if (userMessage.toLowerCase().includes("budget")) {
        response =
          "Thanks for sharing your budget. What areas are you interested in, and do you have a specific timeframe for your purchase?"
        updatedProfile.budget = userMessage.includes("$")
          ? userMessage.split("$")[1].split(" ")[0]
          : "$500,000 - $700,000"
        updatedProfile.score += 25
      } else if (userMessage.toLowerCase().includes("month") || userMessage.toLowerCase().includes("timeframe")) {
        response =
          "Got it. Could you share your contact information so we can keep you updated on new listings that match your criteria?"
        updatedProfile.timeframe = "3-6 months"
        updatedProfile.score += 20
      } else if (
        userMessage.toLowerCase().includes("@") ||
        userMessage.toLowerCase().includes("email") ||
        userMessage.toLowerCase().includes("phone")
      ) {
        response =
          "Thank you! Based on your preferences, I've found some properties you might be interested in. Would you like to see them?"
        updatedProfile.name = "Alex Smith"
        updatedProfile.email = "alex.smith@example.com"
        updatedProfile.phone = "(555) 123-4567"
        updatedProfile.score += 30
        updatedProperties = properties
      } else if (userMessage.toLowerCase().includes("yes") || userMessage.toLowerCase().includes("show")) {
        response =
          "Here are some properties that match your criteria. You can click on any of them to see more details. Would you like to schedule a viewing for any of these properties?"
        updatedProperties = properties
        updatedProfile.preferences = ["Modern", "Open floor plan", "Near amenities"]
        updatedProfile.score += 15
      } else if (userMessage.toLowerCase().includes("schedule") || userMessage.toLowerCase().includes("viewing")) {
        response =
          "Excellent! I've noted your interest in viewing these properties. A real estate agent will contact you shortly to arrange the viewings. Is there anything else you'd like to know about these properties or the buying process?"
        updatedProfile.score += 10
      } else {
        response = "Thank you for your message. How else can I help you with your property search today?"
      }

      // Update lead status based on score
      if (updatedProfile.score >= 80) {
        updatedProfile.status = "Hot"
        updatedProfile.statusColor = "bg-success"
      } else if (updatedProfile.score >= 50) {
        updatedProfile.status = "Warm"
        updatedProfile.statusColor = "bg-warning"
      } else if (updatedProfile.score > 0) {
        updatedProfile.status = "Cold"
        updatedProfile.statusColor = "bg-destructive"
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ])

      setLeadProfile(updatedProfile)
      if (updatedProperties.length > 0) {
        setRecommendedProperties(updatedProperties)
      }

      setIsTyping(false)
    }, 1500)
  }

  const handleSend = () => {
    if (input.trim() === "") return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    simulateResponse(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex flex-1 flex-col border-r">
        <div className="border-b p-4">
          <h1 className="text-2xl font-bold">AI Chat Assistant</h1>
          <p className="text-sm text-muted-foreground">Chat with our AI to find your perfect property</p>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex max-w-[80%] items-start space-x-2 rounded-lg p-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div className="text-sm">{message.content}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] items-start space-x-2 rounded-lg bg-muted p-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
            />
            <Button onClick={handleSend} disabled={isTyping || input.trim() === ""}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full border-t md:w-[350px] md:border-l md:border-t-0">
        <Tabs defaultValue="lead">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lead">Lead Profile</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>
          <TabsContent value="lead" className="p-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Lead Qualification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{leadProfile.name || "New Lead"}</h3>
                    <Badge className={`${leadProfile.statusColor} text-white`} variant="outline">
                      {leadProfile.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Qualification Score</span>
                      <span>{leadProfile.score}%</span>
                    </div>
                    <Progress value={leadProfile.score} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-medium uppercase text-muted-foreground">Contact Information</h4>
                    <div className="grid grid-cols-[1fr_2fr] gap-1 text-sm">
                      <div className="text-muted-foreground">Name:</div>
                      <div>{leadProfile.name || "Not provided"}</div>
                      <div className="text-muted-foreground">Email:</div>
                      <div>{leadProfile.email || "Not provided"}</div>
                      <div className="text-muted-foreground">Phone:</div>
                      <div>{leadProfile.phone || "Not provided"}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-medium uppercase text-muted-foreground">Property Preferences</h4>
                    <div className="grid grid-cols-[1fr_2fr] gap-1 text-sm">
                      <div className="text-muted-foreground">Budget:</div>
                      <div>{leadProfile.budget || "Not specified"}</div>
                      <div className="text-muted-foreground">Timeframe:</div>
                      <div>{leadProfile.timeframe || "Not specified"}</div>
                      <div className="text-muted-foreground">Preferences:</div>
                      <div>
                        {leadProfile.preferences.length > 0 ? leadProfile.preferences.join(", ") : "Not specified"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-medium uppercase text-muted-foreground">Qualification Factors</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Budget Clarity</span>
                        <span>{leadProfile.budget ? "75%" : "0%"}</span>
                      </div>
                      <Progress value={leadProfile.budget ? 75 : 0} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Decision Timeframe</span>
                        <span>{leadProfile.timeframe ? "80%" : "0%"}</span>
                      </div>
                      <Progress value={leadProfile.timeframe ? 80 : 0} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Contact Information</span>
                        <span>{leadProfile.email && leadProfile.phone ? "100%" : "0%"}</span>
                      </div>
                      <Progress value={leadProfile.email && leadProfile.phone ? 100 : 0} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Preference Specificity</span>
                        <span>{leadProfile.preferences.length > 0 ? "60%" : "0%"}</span>
                      </div>
                      <Progress value={leadProfile.preferences.length > 0 ? 60 : 0} className="h-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="properties" className="p-4">
            <div className="space-y-4">
              {recommendedProperties.length > 0 ? (
                recommendedProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="h-40 w-full object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="font-medium">{property.title}</h3>
                      <p className="text-lg font-bold">{property.price}</p>
                      <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <Home className="mr-1 h-4 w-4" />
                        <span>
                          {property.bedrooms} bd | {property.bathrooms} ba | {property.sqft} sqft
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{property.location}</p>
                      <Button className="mt-3 w-full" size="sm">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex h-[400px] flex-col items-center justify-center text-center">
                  <Building2 className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No properties yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Share your preferences to see recommended properties
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

