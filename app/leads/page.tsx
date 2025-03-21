import type { Metadata } from "next"
import { LeadsContent } from "./leads-content"

export const metadata: Metadata = {
  title: "Gestión de Contactos | RealAI",
  description: "Gestiona y califica contactos con IA",
}

export default function LeadsPage() {
  return <LeadsContent />
}

