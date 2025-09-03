import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistema de Diseño - Nuberoupload',
  description: 'Guía completa de componentes, colores y tipografía para Nuberoupload',
}

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}