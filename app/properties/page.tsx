import type { Metadata } from "next"
import { PropertiesPage } from "@/components/properties-page"

export const metadata: Metadata = {
  title: "Propiedades | RealAI",
  description: "Explora y gestiona propiedades con asistencia de IA",
}

export default function Page() {
  return <PropertiesPage />
}

