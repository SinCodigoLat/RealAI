"use client"

import React, { createContext, useContext, useState } from 'react'

type Language = 'es' | 'en'

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    leads: "Leads",
    properties: "Properties",
    clientChat: "Client Chat",
    analytics: "Analytics",
    calendar: "Calendar",
    main: "Main",
    
    // Dashboard
    welcomeBack: "Welcome back, {name}. Here's your lead qualification overview.",
    timeRange: "Select time range",
    lastDays: "Last {days} days",
    customRange: "Custom Range",
    totalLeads: "Total Leads",
    qualifiedLeads: "Qualified Leads",
    propertiesListed: "Properties Listed",
    potentialRevenue: "Potential Revenue",
    fromLastMonth: "from last month",
    target: "Target",
    overview: "Overview",
    recentLeads: "Recent Leads",
    leadQualificationTrends: "Lead Qualification Trends",
    leadQualificationDistribution: "Lead Qualification Distribution",
    recentActivity: "Recent Activity",
    
    // User Profile
    myAccount: "My Account",
    settings: "Settings",
    signOut: "Sign out",
    premiumAgent: "Premium Agent",
    
    // Chat messages
    welcome: "👋 Hi there! I'm your AI real estate assistant. I can help you find your dream property based on your preferences. What type of property are you looking for?",
    apartmentResponse: "Apartments are great choices! What area or neighborhood are you interested in?",
    houseResponse: "Single family homes are popular choices! What area or neighborhood are you interested in?",
    downtownResponse: "Downtown is a vibrant area! What's your budget range for a property?",
    suburbResponse: "The suburbs offer great value and space! What's your budget range for a property?",
    budgetResponse: "Thanks for sharing your budget. How many bedrooms and bathrooms are you looking for?",
    roomsResponse: "Got it. Are there any specific features or amenities you're looking for in your new home?",
    featuresResponse: "Based on your preferences, I've found some properties you might be interested in. Take a look!",
    defaultResponse: "Thank you for your message. How else can I help you with your property search today?",
    
    // UI elements
    findDreamHome: "Find Your Dream Home",
    chatDescription: "Chat with our AI assistant to discover properties that match your needs",
    typeMessage: "Type your message...",
    recommendedProperties: "Recommended Properties",
    interested: "I'm Interested",
    rooms: "rooms",
    baths: "baths",
    sqft: "sqft",
    
    // Common actions
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    
    // Status
    active: "Active",
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",

    // Lead Management
    leadManagement: "Lead Management",
    leadManagementDescription: "Manage and qualify your leads with AI assistance.",
    addLead: "Add Lead",
    searchLeads: "Search leads...",
    filterByStatus: "Filter by status",
    allLeads: "All Leads",
    hotLeads: "Hot Leads",
    warmLeads: "Warm Leads",
    coldLeads: "Cold Leads",
    name: "Name",
    status: "Status",
    score: "Score",
    propertyInterest: "Property Interest",
    lastContact: "Last Contact",
    actions: "Actions",
    viewDetails: "View Details",
    startChat: "Start Chat",
    qualificationFactors: "Qualification Factors",
    budgetClarity: "Budget Clarity",
    decisionTimeframe: "Decision Timeframe",
    contactInformation: "Contact Information",
    preferenceSpecificity: "Preference Specificity",
    engagementLevel: "Engagement Level",
    notes: "Notes",
    budget: "Budget",
    timeframe: "Timeframe",
    email: "Email",
    phone: "Phone",
    hoursAgo: "{hours} hours ago",
    daysAgo: "{days} days ago",

    // Property Management
    propertyManagement: "Property Management",
    propertyManagementDescription: "Browse and manage properties with AI assistance",
    addProperty: "Add Property",
    searchProperties: "Search properties...",
    filterByType: "Filter by type",
    allProperties: "All Properties",
    priceRange: "Price Range",
    applyFilters: "Apply Filters",
    resetFilters: "Reset Filters",
    forSale: "For Sale",
    forRent: "For Rent",
    sold: "Sold",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    yearBuilt: "Year Built",
    location: "Location",
    address: "Address",
    description: "Description",
    features: "Features",
    propertyType: "Property Type",
    contactAgent: "Contact Agent",
    shareProperty: "Share Property",
    saveProperty: "Save Property",
    propertyDetails: "Property Details",
    newest: "Newest",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    squareFootage: "Square Footage",
    noPropertiesFound: "No properties found",
    adjustSearchFilters: "Try adjusting your search or filters",
    
    // Property Types
    condo: "Condo",
    singleFamily: "Single Family",
    luxury: "Luxury",
    townhouse: "Townhouse",
    apartment: "Apartment",
    
    // Property Features
    hardwoodFloors: "Hardwood floors",
    stainlessSteel: "Stainless steel appliances",
    quartzCountertops: "Quartz countertops",
    walkInCloset: "Walk-in closet",
    inUnitLaundry: "In-unit laundry",
    centralAir: "Central air",
    balcony: "Balcony",
    parkingSpace: "Parking space",
    updatedKitchen: "Updated kitchen",
    finishedBasement: "Finished basement",
    attachedGarage: "Attached garage",
    fencedYard: "Fenced yard",
    fireplace: "Fireplace",
    deck: "Deck",
    waterfront: "Waterfront",
    privateDock: "Private dock",
    gourmetKitchen: "Gourmet kitchen",
    homeTheater: "Home theater",
    wineCellar: "Wine cellar",
    outdoorKitchen: "Outdoor kitchen",
    smartHome: "Smart home system",
    exposedBrick: "Exposed brick",
    highCeilings: "High ceilings",
    openFloorPlan: "Open floor plan",
    largeWindows: "Large windows",
    buildingSecurity: "Building security",
    bikeStorage: "Bike storage",
    originalWoodwork: "Original woodwork",
    builtInCabinetry: "Built-in cabinetry",
    coveredPorch: "Covered porch",
    clawfootTub: "Clawfoot tub",
    detachedGarage: "Detached garage",
    gardenSpace: "Garden space",
    privateElevator: "Private elevator",
    chefsKitchen: "Chef's kitchen",
    marbleBathrooms: "Marble bathrooms",
    largeTerrace: "Large terrace",
    wineStorage: "Wine storage",
    conciergeService: "Concierge service",

    // Premium Features
    premiumFeature: "Premium Feature",
    upgradeRequired: "Upgrade to Premium Agent to access this feature",
    unlockFeatures: "Unlock advanced features to grow your business",
  },
  es: {
    // Navegación
    dashboard: "Panel Principal",
    leads: "Contactos",
    properties: "Propiedades",
    clientChat: "Chat del Cliente",
    analytics: "Análisis",
    calendar: "Calendario",
    main: "Principal",
    
    // Panel Principal
    welcomeBack: "Bienvenido de nuevo, {name}. Aquí está tu resumen de calificación de contactos.",
    timeRange: "Seleccionar rango de tiempo",
    lastDays: "Últimos {days} días",
    customRange: "Rango Personalizado",
    totalLeads: "Total de Contactos",
    qualifiedLeads: "Contactos Calificados",
    propertiesListed: "Propiedades Listadas",
    potentialRevenue: "Ingresos Potenciales",
    fromLastMonth: "desde el mes pasado",
    target: "Meta",
    overview: "Resumen",
    recentLeads: "Contactos Recientes",
    leadQualificationTrends: "Tendencias de Calificación",
    leadQualificationDistribution: "Distribución de Calificaciones",
    recentActivity: "Actividad Reciente",
    
    // Perfil de Usuario
    myAccount: "Mi Cuenta",
    settings: "Configuración",
    signOut: "Cerrar Sesión",
    premiumAgent: "Agente Premium",
    
    // Mensajes del Chat
    welcome: "👋 ¡Hola! Soy tu asistente inmobiliario AI. Puedo ayudarte a encontrar tu propiedad ideal basada en tus preferencias. ¿Qué tipo de propiedad estás buscando?",
    apartmentResponse: "¡Los apartamentos son una excelente opción! ¿En qué zona o barrio estás interesado?",
    houseResponse: "¡Las casas unifamiliares son muy populares! ¿En qué zona o barrio estás interesado?",
    downtownResponse: "El centro es una zona muy dinámica. ¿Cuál es tu presupuesto para la propiedad?",
    suburbResponse: "Los suburbios ofrecen gran valor y espacio. ¿Cuál es tu presupuesto para la propiedad?",
    budgetResponse: "Gracias por compartir tu presupuesto. ¿Cuántas habitaciones y baños necesitas?",
    roomsResponse: "Entiendo. ¿Hay alguna característica o comodidad específica que busques en tu nueva casa?",
    featuresResponse: "Basado en tus preferencias, he encontrado algunas propiedades que podrían interesarte. ¡Échales un vistazo!",
    defaultResponse: "Gracias por tu mensaje. ¿Cómo más puedo ayudarte con tu búsqueda de propiedad hoy?",
    
    // Elementos de UI
    findDreamHome: "Encuentra tu Casa Ideal",
    chatDescription: "Chatea con nuestro asistente AI para descubrir propiedades que se ajusten a tus necesidades",
    typeMessage: "Escribe tu mensaje...",
    recommendedProperties: "Propiedades Recomendadas",
    interested: "Me Interesa",
    rooms: "hab",
    baths: "baños",
    sqft: "m²",
    
    // Acciones comunes
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    view: "Ver",
    search: "Buscar",
    filter: "Filtrar",
    sort: "Ordenar",
    
    // Estado
    active: "Activo",
    pending: "Pendiente",
    completed: "Completado",
    cancelled: "Cancelado",

    // Gestión de Contactos
    leadManagement: "Gestión de Contactos",
    leadManagementDescription: "Gestiona y califica tus contactos con asistencia de IA.",
    addLead: "Agregar Contacto",
    searchLeads: "Buscar contactos...",
    filterByStatus: "Filtrar por estado",
    allLeads: "Todos los Contactos",
    hotLeads: "Contactos Calientes",
    warmLeads: "Contactos Tibios",
    coldLeads: "Contactos Fríos",
    name: "Nombre",
    status: "Estado",
    score: "Puntuación",
    propertyInterest: "Interés en Propiedad",
    lastContact: "Último Contacto",
    actions: "Acciones",
    viewDetails: "Ver Detalles",
    startChat: "Iniciar Chat",
    qualificationFactors: "Factores de Calificación",
    budgetClarity: "Claridad de Presupuesto",
    decisionTimeframe: "Tiempo de Decisión",
    contactInformation: "Información de Contacto",
    preferenceSpecificity: "Especificidad de Preferencias",
    engagementLevel: "Nivel de Compromiso",
    notes: "Notas",
    budget: "Presupuesto",
    timeframe: "Plazo",
    email: "Correo",
    phone: "Teléfono",
    hoursAgo: "hace {hours} horas",
    daysAgo: "hace {days} días",

    // Gestión de Propiedades
    propertyManagement: "Gestión de Propiedades",
    propertyManagementDescription: "Explora y gestiona propiedades con asistencia de IA",
    addProperty: "Agregar Propiedad",
    searchProperties: "Buscar propiedades...",
    filterByType: "Filtrar por tipo",
    allProperties: "Todas las Propiedades",
    priceRange: "Rango de Precio",
    applyFilters: "Aplicar Filtros",
    resetFilters: "Restablecer Filtros",
    forSale: "En Venta",
    forRent: "En Alquiler",
    sold: "Vendido",
    bedrooms: "Habitaciones",
    bathrooms: "Baños",
    yearBuilt: "Año Construcción",
    location: "Ubicación",
    address: "Dirección",
    description: "Descripción",
    features: "Características",
    propertyType: "Tipo de Propiedad",
    contactAgent: "Contactar Agente",
    shareProperty: "Compartir Propiedad",
    saveProperty: "Guardar Propiedad",
    propertyDetails: "Detalles de la Propiedad",
    newest: "Más Recientes",
    priceLowToHigh: "Precio: Menor a Mayor",
    priceHighToLow: "Precio: Mayor a Menor",
    squareFootage: "Metros Cuadrados",
    noPropertiesFound: "No se encontraron propiedades",
    adjustSearchFilters: "Intenta ajustar tu búsqueda o filtros",
    
    // Tipos de Propiedad
    condo: "Condominio",
    singleFamily: "Casa Unifamiliar",
    luxury: "Lujo",
    townhouse: "Casa Adosada",
    apartment: "Apartamento",
    
    // Características de Propiedad
    hardwoodFloors: "Suelos de madera",
    stainlessSteel: "Electrodomésticos de acero inoxidable",
    quartzCountertops: "Encimeras de cuarzo",
    walkInCloset: "Vestidor",
    inUnitLaundry: "Lavadora/secadora en unidad",
    centralAir: "Aire central",
    balcony: "Balcón",
    parkingSpace: "Plaza de aparcamiento",
    updatedKitchen: "Cocina actualizada",
    finishedBasement: "Sótano acabado",
    attachedGarage: "Garaje adjunto",
    fencedYard: "Patio cercado",
    fireplace: "Chimenea",
    deck: "Terraza",
    waterfront: "Frente al agua",
    privateDock: "Muelle privado",
    gourmetKitchen: "Cocina gourmet",
    homeTheater: "Cine en casa",
    wineCellar: "Bodega",
    outdoorKitchen: "Cocina exterior",
    smartHome: "Sistema domótico",
    exposedBrick: "Ladrillo visto",
    highCeilings: "Techos altos",
    openFloorPlan: "Planta abierta",
    largeWindows: "Ventanales",
    buildingSecurity: "Seguridad del edificio",
    bikeStorage: "Almacenamiento de bicicletas",
    originalWoodwork: "Carpintería original",
    builtInCabinetry: "Armarios empotrados",
    coveredPorch: "Porche cubierto",
    clawfootTub: "Bañera con patas",
    detachedGarage: "Garaje independiente",
    gardenSpace: "Espacio para jardín",
    privateElevator: "Ascensor privado",
    chefsKitchen: "Cocina de chef",
    marbleBathrooms: "Baños de mármol",
    largeTerrace: "Terraza grande",
    wineStorage: "Almacén de vinos",
    conciergeService: "Servicio de conserjería",

    // Características Premium
    premiumFeature: "Característica Premium",
    upgradeRequired: "Actualiza a Agente Premium para acceder a esta función",
    unlockFeatures: "Desbloquea funciones avanzadas para hacer crecer tu negocio",
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 