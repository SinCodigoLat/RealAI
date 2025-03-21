"use client"

import { useState } from "react"
import {
  Bath,
  Bed,
  Building2,
  Calendar,
  ChevronDown,
  Filter,
  Heart,
  Home,
  MapPin,
  Plus,
  Search,
  Share,
  X,
} from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Slider } from "@/components/ui/slider"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/app/contexts/LanguageContext"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"

type Property = {
  id: string
  title: string
  type: string
  price: string
  priceNumeric: number
  location: string
  address: string
  bedrooms: number
  bathrooms: number
  sqft: number
  yearBuilt: number
  description: string
  features: string[]
  status: "forSale" | "forRent" | "sold" | "pending"
  statusColor: string
  image: string
  images: string[]
  agent: {
    name: string
    phone: string
    email: string
    avatar: string
    initials: string
  }
}

export function PropertyListing() {
  const { t } = useLanguage()
  const isMobile = useIsMobile()
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyType, setPropertyType] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 2000000])
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const properties: Property[] = [
    {
      id: "1",
      title: "Luxury Condo Downtown",
      type: "Condo",
      price: "$750,000",
      priceNumeric: 750000,
      location: "Downtown",
      address: "123 Main St, Downtown, City",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      yearBuilt: 2018,
      description:
        "Modern luxury condo in the heart of downtown with stunning city views. Features high-end finishes, floor-to-ceiling windows, and a private balcony. Building amenities include a fitness center, rooftop pool, and 24-hour concierge.",
      features: [
        "hardwoodFloors",
        "stainlessSteel",
        "quartzCountertops",
        "walkInCloset",
        "inUnitLaundry",
        "centralAir",
        "balcony",
        "parkingSpace"
      ],
      status: "forSale",
      statusColor: "bg-info",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
      ],
      agent: {
        name: "John Doe",
        phone: "(555) 123-4567",
        email: "john.doe@example.com",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        initials: "JD"
      }
    },
    {
      id: "2",
      title: "Suburban Family Home",
      type: "Single Family",
      price: "$450,000",
      priceNumeric: 450000,
      location: "Suburbia",
      address: "456 Oak Lane, Suburbia, City",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2500,
      yearBuilt: 2005,
      description:
        "Spacious family home in a quiet suburban neighborhood with excellent schools. Features an open floor plan, updated kitchen, and large backyard with a deck. Perfect for families looking for space and comfort.",
      features: [
        "updatedKitchen",
        "finishedBasement",
        "attachedGarage",
        "fencedYard",
        "fireplace",
        "deck",
        "centralAir",
        "hardwoodFloors"
      ],
      status: "forSale",
      statusColor: "bg-info",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
      ],
      agent: {
        name: "Jane Smith",
        phone: "(555) 987-6543",
        email: "jane.smith@example.com",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        initials: "JS"
      }
    },
    {
      id: "3",
      title: "Waterfront Property",
      type: "Luxury",
      price: "$1,200,000",
      priceNumeric: 1200000,
      location: "Waterfront",
      address: "789 Shoreline Dr, Waterfront, City",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3800,
      yearBuilt: 2015,
      description:
        "Stunning waterfront property with panoramic views and private dock. This luxury home features high-end finishes throughout, a gourmet kitchen, home theater, and expansive outdoor living spaces perfect for entertaining.",
      features: [
        "waterfront",
        "privateDock",
        "gourmetKitchen",
        "homeTheater",
        "wineCellar",
        "outdoorKitchen",
        "smartHome",
        "attachedGarage"
      ],
      status: "forSale",
      statusColor: "bg-info",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&h=600&fit=crop"
      ],
      agent: {
        name: "Robert Kim",
        phone: "(555) 456-7890",
        email: "robert.kim@example.com",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        initials: "RK"
      }
    },
    {
      id: "4",
      title: "Modern Loft Apartment",
      type: "Condo",
      price: "$550,000",
      priceNumeric: 550000,
      location: "Arts District",
      address: "101 Gallery Way, Arts District, City",
      bedrooms: 1,
      bathrooms: 2,
      sqft: 1100,
      yearBuilt: 2010,
      description:
        "Stylish loft apartment in the vibrant Arts District. Features exposed brick walls, high ceilings, and industrial-chic design elements. Building includes a co-working space, fitness center, and rooftop lounge.",
      features: [
        "exposedBrick",
        "highCeilings",
        "openFloorPlan",
        "largeWindows",
        "stainlessSteel",
        "inUnitLaundry",
        "buildingSecurity",
        "bikeStorage"
      ],
      status: "forRent",
      statusColor: "bg-success",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop"
      ],
      agent: {
        name: "Emily Rodriguez",
        phone: "(555) 234-5678",
        email: "emily.r@example.com",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        initials: "ER"
      }
    },
    {
      id: "5",
      title: "Charming Craftsman Bungalow",
      type: "Single Family",
      price: "$385,000",
      priceNumeric: 385000,
      location: "Historic District",
      address: "222 Heritage St, Historic District, City",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      yearBuilt: 1925,
      description:
        "Beautifully restored craftsman bungalow with original character and modern updates. Features include built-in cabinetry, hardwood floors, and a covered front porch. Updated kitchen and bathrooms blend vintage charm with modern convenience.",
      features: [
        "originalWoodwork",
        "builtInCabinetry",
        "coveredPorch",
        "updatedKitchen",
        "clawfootTub",
        "fencedYard",
        "detachedGarage",
        "gardenSpace"
      ],
      status: "pending",
      statusColor: "bg-warning",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
      ],
      agent: {
        name: "Michael Chen",
        phone: "(555) 987-6543",
        email: "m.chen@example.com",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        initials: "MC"
      }
    },
    {
      id: "6",
      title: "Luxury Penthouse Suite",
      type: "Condo",
      price: "$1,850,000",
      priceNumeric: 1850000,
      location: "Downtown",
      address: "888 Skyline Ave, Downtown, City",
      bedrooms: 3,
      bathrooms: 3.5,
      sqft: 2800,
      yearBuilt: 2020,
      description:
        "Exclusive penthouse with panoramic city views and luxury finishes throughout. Features include a chef's kitchen, private elevator access, and a large terrace. Building amenities include concierge service, spa, and private wine storage.",
      features: [
        "privateElevator",
        "chefsKitchen",
        "smartHome",
        "largeWindows",
        "marbleBathrooms",
        "largeTerrace",
        "wineStorage",
        "conciergeService"
      ],
      status: "forSale",
      statusColor: "bg-info",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop"
      ],
      agent: {
        name: "Sarah Johnson",
        phone: "(555) 123-4567",
        email: "sarah.j@example.com",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        initials: "SJ"
      }
    }
  ]

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = propertyType === "all" || property.type.toLowerCase() === propertyType.toLowerCase()

    const matchesPrice = property.priceNumeric >= priceRange[0] && property.priceNumeric <= priceRange[1]

    return matchesSearch && matchesType && matchesPrice
  })

  const getSelectedProperty = () => {
    return properties.find((property) => property.id === selectedProperty?.id)
  }

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property)
  }

  const handlePropertyClose = () => {
    setSelectedProperty(null)
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">{t('propertyType')}</h4>
        <div className="flex space-x-2">
          <Button
            variant={propertyType === "all" ? "default" : "outline"}
            onClick={() => setPropertyType("all")}
            className="flex-1"
          >
            {t('allProperties')}
          </Button>
          <Button
            variant={propertyType === "forSale" ? "default" : "outline"}
            onClick={() => setPropertyType("forSale")}
            className="flex-1"
          >
            {t('forSale')}
          </Button>
          <Button
            variant={propertyType === "forRent" ? "default" : "outline"}
            onClick={() => setPropertyType("forRent")}
            className="flex-1"
          >
            {t('forRent')}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">{t('priceRange')}</h4>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
          </span>
        </div>
        <Slider
          defaultValue={[0, 2000000]}
          max={2000000}
          step={50000}
          value={priceRange}
          onValueChange={setPriceRange}
        />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">{t('bedrooms')}</h4>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, "5+"].map((num) => (
            <Button key={num} variant="outline" className="flex-1" size="sm">
              {num}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">{t('bathrooms')}</h4>
        <div className="flex space-x-2">
          {[1, 2, 3, "4+"].map((num) => (
            <Button key={num} variant="outline" className="flex-1" size="sm">
              {num}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">{t('status')}</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-info text-white">
            {t('forSale')}
          </Badge>
          <Badge variant="outline" className="bg-success text-white">
            {t('forRent')}
          </Badge>
          <Badge variant="outline" className="bg-warning text-white">
            {t('pending')}
          </Badge>
          <Badge variant="outline" className="bg-muted text-muted-foreground">
            {t('sold')}
          </Badge>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => {
            setPropertyType("all")
            setPriceRange([0, 2000000])
            setIsFilterOpen(false)
          }}
          className="flex-1"
        >
          {t('resetFilters')}
        </Button>
        <Button onClick={() => setIsFilterOpen(false)} className="flex-1">
          {t('applyFilters')}
        </Button>
      </div>
    </div>
  )

  const PropertyDetailDialog = () => {
    const property = getSelectedProperty()
    if (!property) return null

    return (
      <div className="space-y-6">
        <div className="relative">
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            className="h-[300px] w-full rounded-lg object-cover"
          />
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <Button size="icon" variant="secondary" className="rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full">
              <Share className="h-4 w-4" />
            </Button>
          </div>
          <Badge className={`${property.statusColor} absolute left-4 top-4 text-white`} variant="outline">
            {t(property.status)}
          </Badge>
        </div>

        <div>
          <h2 className="text-2xl font-bold">{property.title}</h2>
          <div className="mt-1 flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{property.address}</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold">{property.price}</span>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Bed className="mr-1 h-4 w-4" />
                <span>{property.bedrooms} {t('bedrooms')}</span>
              </div>
              <div className="flex items-center">
                <Bath className="mr-1 h-4 w-4" />
                <span>{property.bathrooms} {t('bathrooms')}</span>
              </div>
              <div className="flex items-center">
                <Home className="mr-1 h-4 w-4" />
                <span>{property.sqft} {t('sqft')}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">{t('description')}</h3>
          <p className="mt-2 text-muted-foreground">{property.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium">{t('features')}</h3>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {property.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <ChevronDown className="mr-2 h-4 w-4 text-primary" />
                <span>{t(feature.toLowerCase().replace(/\s+/g, ''))}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">{t('contactAgent')}</h3>
          <div className="mt-2 flex items-center space-x-4 rounded-lg border p-4">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <img
                src={property.agent.avatar || "/placeholder.svg"}
                alt={property.agent.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{property.agent.name}</h4>
              <p className="text-sm text-muted-foreground">{property.agent.phone}</p>
              <p className="text-sm text-muted-foreground">{property.agent.email}</p>
            </div>
            <Button>{t('contactAgent')}</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('properties')}</h1>
          <p className="text-muted-foreground">{t('propertyManagementDescription')}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t('addProperty')}
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="relative w-full md:w-[350px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('searchProperties')}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          {isMobile ? (
            <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  {t('filter')}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{t('filter')}</DrawerTitle>
                  <DrawerDescription>{t('filterByType')}</DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                  <FilterContent />
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">{t('cancel')}</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ) : (
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  {t('filter')}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('filter')}</DialogTitle>
                  <DialogDescription>{t('filterByType')}</DialogDescription>
                </DialogHeader>
                <FilterContent />
              </DialogContent>
            </Dialog>
          )}
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('sort')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{t('newest')}</SelectItem>
              <SelectItem value="price-asc">{t('priceLowToHigh')}</SelectItem>
              <SelectItem value="price-desc">{t('priceHighToLow')}</SelectItem>
              <SelectItem value="sqft">{t('squareFootage')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="h-[200px] w-full object-cover"
              />
              <Badge className={`${property.statusColor} absolute left-2 top-2 text-white`} variant="outline">
                {t(property.status)}
              </Badge>
              <div className="absolute bottom-2 right-2 flex space-x-1">
                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">{property.title}</h3>
              <p className="text-lg font-bold">{property.price}</p>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{property.location}</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Bed className="mr-1 h-4 w-4" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="mr-1 h-4 w-4" />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center">
                  <Home className="mr-1 h-4 w-4" />
                  <span>{property.sqft} {t('sqft')}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{property.yearBuilt}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              {isMobile ? (
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button onClick={() => handlePropertySelect(property)} className="w-full">
                      {t('viewDetails')}
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="max-h-[90vh] overflow-auto">
                    <DrawerHeader>
                      <DrawerTitle>{t('propertyDetails')}</DrawerTitle>
                    </DrawerHeader>
                    <div className="px-4 pb-8">
                      <PropertyDetailDialog />
                    </div>
                  </DrawerContent>
                </Drawer>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => handlePropertySelect(property)} className="w-full">
                      {t('viewDetails')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] max-w-3xl overflow-auto">
                    <DialogHeader>
                      <DialogTitle>{t('propertyDetails')}</DialogTitle>
                    </DialogHeader>
                    <PropertyDetailDialog />
                  </DialogContent>
                </Dialog>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed">
          <Building2 className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">{t('noPropertiesFound')}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t('adjustSearchFilters')}</p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setPropertyType("all")
              setPriceRange([0, 2000000])
            }}
          >
            {t('resetFilters')}
          </Button>
        </div>
      )}

      {selectedProperty && (
        <Sheet open={!!selectedProperty} onOpenChange={handlePropertyClose}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{t('propertyDetails')}</SheetTitle>
            </SheetHeader>
            <PropertyDetailDialog />
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}

