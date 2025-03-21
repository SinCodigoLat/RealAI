"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/app/contexts/LanguageContext"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: string
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

export function ClientChat() {
  const { t, language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: t('welcome'),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userPreferences, setUserPreferences] = useState({
    propertyType: "",
    location: "",
    budget: "",
    bedrooms: 0,
    bathrooms: 0,
    features: [] as string[],
  })
  const [showProperties, setShowProperties] = useState(false)
  const [recommendedProperties, setRecommendedProperties] = useState<Property[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Actualizar el mensaje inicial cuando cambia el idioma
  useEffect(() => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: t('welcome'),
      },
    ])
  }, [language])

  // Función para formatear la hora
  const formatTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Sample properties data - Adaptadas según el idioma
  const properties: Property[] = [
    {
      id: "1",
      title: language === 'es' ? "Apartamento de Lujo en el Centro" : "Luxury Downtown Apartment",
      type: language === 'es' ? "Apartamento" : "Apartment",
      price: "$750,000",
      location: language === 'es' ? "Centro" : "Downtown",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: language === 'es' ? "Casa Familiar en Suburbio" : "Suburban Family Home",
      type: language === 'es' ? "Casa" : "House",
      price: "$450,000",
      location: language === 'es' ? "Suburbio" : "Suburbs",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2500,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: language === 'es' ? "Propiedad Frente al Mar" : "Waterfront Property",
      type: language === 'es' ? "Lujo" : "Luxury",
      price: "$1,200,000",
      location: language === 'es' ? "Costa" : "Waterfront",
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
      const updatedPreferences = { ...userPreferences }
      let shouldShowProperties = false

      // Simple pattern matching for demo purposes
      const lowerMessage = userMessage.toLowerCase()
      if (
        (language === 'es' && (lowerMessage.includes("apartamento") || lowerMessage.includes("piso"))) ||
        (language === 'en' && (lowerMessage.includes("apartment") || lowerMessage.includes("condo")))
      ) {
        response = t('apartmentResponse')
        updatedPreferences.propertyType = language === 'es' ? "Apartamento" : "Apartment"
      } else if (
        (language === 'es' && (lowerMessage.includes("casa") || lowerMessage.includes("chalet"))) ||
        (language === 'en' && (lowerMessage.includes("house") || lowerMessage.includes("home")))
      ) {
        response = t('houseResponse')
        updatedPreferences.propertyType = language === 'es' ? "Casa" : "House"
      } else if (
        (language === 'es' && (lowerMessage.includes("centro") || lowerMessage.includes("ciudad"))) ||
        (language === 'en' && (lowerMessage.includes("downtown") || lowerMessage.includes("city")))
      ) {
        response = t('downtownResponse')
        updatedPreferences.location = language === 'es' ? "Centro" : "Downtown"
      } else if (
        (language === 'es' && (lowerMessage.includes("suburbio") || lowerMessage.includes("afueras"))) ||
        (language === 'en' && (lowerMessage.includes("suburb") || lowerMessage.includes("outskirts")))
      ) {
        response = t('suburbResponse')
        updatedPreferences.location = language === 'es' ? "Suburbio" : "Suburbs"
      } else if (
        lowerMessage.includes("$") ||
        (language === 'es' && lowerMessage.includes("presupuesto")) ||
        (language === 'en' && lowerMessage.includes("budget"))
      ) {
        response = t('budgetResponse')
        updatedPreferences.budget = lowerMessage.includes("$")
          ? lowerMessage.split("$")[1].split(" ")[0]
          : "$500,000 - $700,000"
      } else if (
        (language === 'es' && (lowerMessage.includes("habitacion") || lowerMessage.includes("baño"))) ||
        (language === 'en' && (lowerMessage.includes("bedroom") || lowerMessage.includes("bathroom")))
      ) {
        response = t('roomsResponse')

        const bedroomMatch = language === 'es' 
          ? lowerMessage.match(/(\d+)\s*habitacion/i)
          : lowerMessage.match(/(\d+)\s*bed/i)
        const bathroomMatch = language === 'es'
          ? lowerMessage.match(/(\d+)\s*baño/i)
          : lowerMessage.match(/(\d+)\s*bath/i)

        if (bedroomMatch) updatedPreferences.bedrooms = Number.parseInt(bedroomMatch[1])
        if (bathroomMatch) updatedPreferences.bathrooms = Number.parseInt(bathroomMatch[1])

        if (!bedroomMatch && !bathroomMatch) {
          updatedPreferences.bedrooms = 2
          updatedPreferences.bathrooms = 2
        }
      } else if (
        (language === 'es' && (lowerMessage.includes("caracteristica") || lowerMessage.includes("comodidad"))) ||
        (language === 'en' && (lowerMessage.includes("feature") || lowerMessage.includes("amenity")))
      ) {
        response = t('featuresResponse')
        shouldShowProperties = true

        const propertyFeatures = [
          t('modern'),
          t('openFloorPlan'),
          t('yard'),
          t('garage'),
          t('pool'),
          t('propertyView'),
          t('hardwood'),
          t('updatedKitchen'),
        ]
        
        const foundFeatures = propertyFeatures.filter(feature => 
          lowerMessage.includes(feature.toLowerCase())
        )

        if (foundFeatures.length > 0) {
          updatedPreferences.features = foundFeatures
        } else {
          updatedPreferences.features = [t('modern'), t('updatedKitchen')]
        }
      } else {
        response = t('defaultResponse')

        if (updatedPreferences.propertyType || updatedPreferences.location) {
          shouldShowProperties = true
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: response,
          timestamp: formatTime(),
        },
      ])

      setUserPreferences(updatedPreferences)
      if (shouldShowProperties) {
        setShowProperties(true)
        setRecommendedProperties(properties.slice(0, 3))
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
      timestamp: formatTime(),
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
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col">
        <div className="border-b p-4">
          <h1 className="text-2xl font-bold">{t('findDreamHome')}</h1>
          <p className="text-sm text-muted-foreground">
            {t('chatDescription')}
          </p>
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
                    {message.timestamp && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {message.timestamp}
                      </div>
                    )}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>{language === 'es' ? 'Tú' : 'You'}</AvatarFallback>
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
            {showProperties && (
              <div className="mt-8 space-y-4">
                <h2 className="text-lg font-semibold">{t('recommendedProperties')}</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {recommendedProperties.map((property) => (
                    <Card key={property.id}>
                      <img
                        src={property.image}
                        alt={property.title}
                        className="h-48 w-full object-cover"
                      />
                      <CardContent className="p-4">
                        <h3 className="font-medium">{property.title}</h3>
                        <p className="text-lg font-bold">{property.price}</p>
                        <p className="text-sm text-muted-foreground">{property.location}</p>
                        <div className="mt-2 text-sm">
                          <span>{property.bedrooms} {t('rooms')} | </span>
                          <span>{property.bathrooms} {t('baths')} | </span>
                          <span>{property.sqft} {t('sqft')}</span>
                        </div>
                        <Button
                          className="mt-3 w-full"
                          onClick={() => {
                            setInput(language === 'es' 
                              ? `Me interesa la propiedad ${property.title}`
                              : `I'm interested in ${property.title}`
                            )
                            handleSend()
                          }}
                        >
                          {t('interested')}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              placeholder={t('typeMessage')}
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
    </div>
  )
}

