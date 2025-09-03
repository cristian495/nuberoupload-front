'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check, Palette, Type, Square, MousePointer, Code2 } from 'lucide-react'
import { CodeBlock } from '@/components/common/code-block'
import { ThemeToggle } from '@/components/common/theme-toggle'
import DashboardLayout from '@/components/layout/dashboard-layout'
import SectionHeader from '@/components/layout/section-header'

export default function DesignSystemPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: 'color' | 'code') => {
    navigator.clipboard.writeText(text)
    if (type === 'color') {
      setCopiedColor(text)
      setTimeout(() => setCopiedColor(null), 2000)
    } else {
      setCopiedCode(text)
      setTimeout(() => setCopiedCode(null), 2000)
    }
  }

  const colors = {
    primary: {
      name: 'Azul Principal',
      colors: [
        { name: 'blue-300', value: 'hsl(217, 91%, 78%)', class: 'bg-blue-300', style: { backgroundColor: 'hsl(217, 91%, 78%)' } },
        { name: 'blue-400', value: 'hsl(217, 91%, 65%)', class: 'bg-blue-400', style: { backgroundColor: 'hsl(217, 91%, 65%)' } },
        { name: 'blue-500', value: 'hsl(217, 91%, 60%)', class: 'bg-blue-500', style: { backgroundColor: 'hsl(217, 91%, 60%)' } },
        { name: 'blue-600', value: 'hsl(217, 91%, 55%)', class: 'bg-blue-600', style: { backgroundColor: 'hsl(217, 91%, 55%)' } },
        { name: 'blue-700', value: 'hsl(217, 85%, 45%)', class: 'bg-blue-700', style: { backgroundColor: 'hsl(217, 85%, 45%)' } },
      ]
    },
    accent: {
      name: 'Morado Acento',
      colors: [
        { name: 'purple-300', value: 'hsl(264, 85%, 80%)', class: 'bg-purple-300', style: { backgroundColor: 'hsl(264, 85%, 80%)' } },
        { name: 'purple-400', value: 'hsl(264, 83%, 75%)', class: 'bg-purple-400', style: { backgroundColor: 'hsl(264, 83%, 75%)' } },
        { name: 'purple-500', value: 'hsl(264, 83%, 70%)', class: 'bg-purple-500', style: { backgroundColor: 'hsl(264, 83%, 70%)' } },
        { name: 'purple-600', value: 'hsl(264, 80%, 65%)', class: 'bg-purple-600', style: { backgroundColor: 'hsl(264, 80%, 65%)' } },
        { name: 'purple-700', value: 'hsl(264, 75%, 55%)', class: 'bg-purple-700', style: { backgroundColor: 'hsl(264, 75%, 55%)' } },
      ]
    },
    neutral: {
      name: 'Grises Neutros',
      colors: [
        { name: 'gray-100', value: 'hsl(220, 13%, 88%)', class: 'bg-gray-100', style: { backgroundColor: 'hsl(220, 13%, 88%)' } },
        { name: 'gray-300', value: 'hsl(220, 9%, 65%)', class: 'bg-gray-300', style: { backgroundColor: 'hsl(220, 9%, 65%)' } },
        { name: 'gray-500', value: 'hsl(220, 9%, 45%)', class: 'bg-gray-500', style: { backgroundColor: 'hsl(220, 9%, 45%)' } },
        { name: 'gray-700', value: 'hsl(224, 15%, 25%)', class: 'bg-gray-700', style: { backgroundColor: 'hsl(224, 15%, 25%)' } },
        { name: 'gray-900', value: 'hsl(224, 15%, 12%)', class: 'bg-gray-900', style: { backgroundColor: 'hsl(224, 15%, 12%)' } },
      ]
    }
  }

  const typographyExamples = [
    { class: 'text-display', name: 'Display', example: 'Título Principal Display' },
    { class: 'text-heading-1', name: 'Heading 1', example: 'Título Principal H1' },
    { class: 'text-heading-2', name: 'Heading 2', example: 'Título Secundario H2' },
    { class: 'text-heading-3', name: 'Heading 3', example: 'Título Terciario H3' },
    { class: 'text-body-large', name: 'Body Large', example: 'Texto de cuerpo grande para destacar información importante.' },
    { class: 'text-body', name: 'Body', example: 'Texto de cuerpo regular para contenido principal.' },
    { class: 'text-body-small', name: 'Body Small', example: 'Texto de cuerpo pequeño para información secundaria.' },
    { class: 'text-caption', name: 'Caption', example: 'Texto de etiqueta o metadatos' },
  ]

  const buttonExamples = [
    { variant: 'default', name: 'Primary (Morado Oscuro)', code: '<Button variant="default">Primary</Button>' },
    { variant: 'secondary', name: 'Secondary (Oscuro)', code: '<Button variant="secondary">Secondary</Button>' },
    { variant: 'accent', name: 'Accent', code: '<Button variant="accent">Accent</Button>' },
    { variant: 'outline', name: 'Outline', code: '<Button variant="outline">Outline</Button>' },
    { variant: 'ghost', name: 'Ghost', code: '<Button variant="ghost">Ghost</Button>' },
    { variant: 'link', name: 'Link', code: '<Button variant="link">Link</Button>' },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <SectionHeader
          title="Sistema de Diseño"
          description="Guía completa de componentes, colores y tipografía para el proyecto Nuberoupload"
          action={<ThemeToggle />}
        />

        {/* Navigation Tabs */}
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Colores
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Tipografía
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Square className="w-4 h-4" />
              Componentes
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Código
            </TabsTrigger>
            <TabsTrigger value="interactive" className="flex items-center gap-2">
              <MousePointer className="w-4 h-4" />
              Playground
            </TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-8">
            <div className="grid gap-8">
              {Object.entries(colors).map(([key, colorGroup]) => (
                <Card key={key} className="card-modern">
                  <CardHeader>
                    <CardTitle>{colorGroup.name}</CardTitle>
                    <CardDescription>
                      Paleta de colores {colorGroup.name.toLowerCase()} para el sistema de diseño
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {colorGroup.colors.map((color) => (
                        <div key={color.name} className="space-y-2">
                          <div 
                            className={`h-20 rounded-lg border border-border cursor-pointer transition-transform hover:scale-105`}
                            style={color.style}
                            onClick={() => copyToClipboard(color.value, 'color')}
                          />
                          <div className="space-y-1">
                            <p className="text-body-small font-medium">{color.name}</p>
                            <p className="text-caption text-muted-foreground">{color.value}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(color.value, 'color')}
                              className="w-full h-8"
                            >
                              {copiedColor === color.value ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-8">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Escalas Tipográficas</CardTitle>
                <CardDescription>
                  Jerarquía de texto usando la fuente Inter con pesos ligeros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {typographyExamples.map((typo) => (
                  <div key={typo.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{typo.name}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(typo.class, 'code')}
                      >
                        {copiedCode === typo.class ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                    <div className={typo.class}>
                      {typo.example}
                    </div>
                    <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      .{typo.class}
                    </code>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-8">
            {/* Buttons Section */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Botones</CardTitle>
                <CardDescription>
                  Variantes de botones con tipografía ligera y transiciones suaves
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {buttonExamples.map((btn) => (
                    <div key={btn.variant} className="space-y-3">
                      <Button variant={btn.variant as any} className="w-full">
                        {btn.name}
                      </Button>
                      <div className="space-y-1">
                        <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded block">
                          {btn.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(btn.code, 'code')}
                          className="w-full h-8"
                        >
                          {copiedCode === btn.code ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cards Section */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Tarjetas</CardTitle>
                <CardDescription>
                  Diferentes estilos de tarjetas con backdrop blur y tipografía ligera
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-6">
                <Card className="card-modern">
                  <CardHeader>
                    <CardTitle>Tarjeta Moderna</CardTitle>
                    <CardDescription>
                      Estilo básico con bordes sutiles y sombra ligera
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body-small">Contenido de ejemplo</p>
                  </CardContent>
                </Card>

                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Tarjeta Elevada</CardTitle>
                    <CardDescription>
                      Sombra más pronunciada para mayor jerarquía
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body-small">Contenido de ejemplo</p>
                  </CardContent>
                </Card>

                <Card className="card-floating">
                  <CardHeader>
                    <CardTitle>Tarjeta Flotante</CardTitle>
                    <CardDescription>
                      Con backdrop blur para efecto de vidrio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body-small">Contenido de ejemplo</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code" className="space-y-8">
            <div className="grid gap-8">
              {/* Installation */}
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle>Instalación y Configuración</CardTitle>
                  <CardDescription>
                    Pasos para implementar el sistema de diseño en tu proyecto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-heading-3 mb-3">1. Configuración de Tailwind</h4>
                    <CodeBlock
                      title="tailwind.config.ts"
                      code={`// Agregar colores personalizados
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    colors: {
      blue: {
        400: 'hsl(217, 91%, 65%)',
        500: 'hsl(217, 91%, 60%)',
        600: 'hsl(217, 91%, 55%)',
      },
      purple: {
        400: 'hsl(264, 83%, 75%)',
        500: 'hsl(264, 83%, 70%)',
        600: 'hsl(264, 80%, 65%)',
      }
    }
  }
}`}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-heading-3 mb-3">2. CSS Variables</h4>
                    <CodeBlock
                      title="globals.css"
                      code={`.dark {
  --background: 224 15% 8%;
  --foreground: 220 13% 92%;
  --primary: 217 91% 65%;
  --accent: 264 83% 75%;
  --card: 224 15% 10%;
  --border: 224 15% 18%;
}`}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Component Examples */}
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle>Ejemplos de Componentes</CardTitle>
                  <CardDescription>
                    Código de ejemplo para implementar los componentes del sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-heading-3 mb-3">Botones</h4>
                    <CodeBlock
                      title="Ejemplo de uso"
                      code={`import { Button } from '@/components/ui/button'

// Botón principal (morado oscuro con texto blanco)
<Button variant="default">
  Acción Principal
</Button>

// Botón secundario (oscuro con texto blanco)
<Button variant="secondary">
  Acción Secundaria
</Button>

// Botón con acento
<Button variant="accent">
  Acción Destacada
</Button>`}
                    />
                  </div>

                  <div>
                    <h4 className="text-heading-3 mb-3">Tarjetas</h4>
                    <CodeBlock
                      title="Card con sistema de diseño"
                      code={`import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

<Card className="card-modern">
  <CardHeader>
    <CardTitle>Título de la Tarjeta</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-body">
      Contenido de la tarjeta con tipografía ligera
    </p>
  </CardContent>
</Card>`}
                    />
                  </div>

                  <div>
                    <h4 className="text-heading-3 mb-3">Tipografía</h4>
                    <CodeBlock
                      title="Clases de tipografía"
                      code={`// Títulos con tipografía extraligera
<h1 className="text-heading-1">Título Principal</h1>
<h2 className="text-heading-2">Título Secundario</h2>
<h3 className="text-heading-3">Título Terciario</h3>

// Texto de cuerpo con tipografía ligera
<p className="text-body">Párrafo principal</p>
<p className="text-body-small">Texto secundario</p>
<span className="text-caption">Etiqueta o metadato</span>`}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Custom Utilities */}
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle>Utilidades Personalizadas</CardTitle>
                  <CardDescription>
                    Clases CSS personalizadas para casos específicos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-heading-3 mb-3">Estilos de Tarjetas</h4>
                    <CodeBlock
                      code={`// Tarjeta moderna básica
.card-modern {
  @apply bg-card border border-border rounded-xl shadow-sm backdrop-blur-sm;
}

// Tarjeta elevada
.card-elevated {
  @apply bg-card border border-border rounded-xl shadow-lg backdrop-blur-sm;
}

// Tarjeta flotante con transparencia
.card-floating {
  @apply bg-card/80 border border-border/50 rounded-xl shadow-xl backdrop-blur-md;
}`}
                    />
                  </div>

                  <div>
                    <h4 className="text-heading-3 mb-3">Botones Personalizados</h4>
                    <CodeBlock
                      code={`// Botón principal (morado oscuro)
.btn-primary {
  @apply bg-primary hover:bg-primary/85 text-primary-foreground 
         font-light px-6 py-2.5 rounded-md transition-all duration-200 
         shadow-sm hover:shadow-md;
}

// Botón secundario (oscuro)
.btn-secondary {
  @apply bg-secondary hover:bg-secondary/85 text-secondary-foreground 
         font-light px-6 py-2.5 rounded-md transition-all duration-200 
         shadow-sm hover:shadow-md;
}

// Botón con acento
.btn-accent {
  @apply bg-accent hover:bg-accent/90 text-accent-foreground 
         font-light px-6 py-2.5 rounded-md transition-all duration-200 
         shadow-sm hover:shadow-md;
}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Interactive Tab */}
          <TabsContent value="interactive" className="space-y-8">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle>Playground Interactivo</CardTitle>
                <CardDescription>
                  Experimenta con los componentes del sistema de diseño
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Button Playground */}
                <div className="space-y-4">
                  <h3 className="text-heading-3">Prueba los Botones</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button>Botón Principal</Button>
                    <Button variant="accent">Botón Acento</Button>
                    <Button variant="secondary">Secundario</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </div>

                {/* Input Playground */}
                <div className="space-y-4">
                  <h3 className="text-heading-3">Inputs Modernos</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input className="input-modern" placeholder="Input con estilo moderno" />
                    <Input placeholder="Input estándar" />
                  </div>
                </div>

                {/* Typography Showcase */}
                <div className="space-y-4">
                  <h3 className="text-heading-3">Jerarquía Tipográfica</h3>
                  <div className="space-y-3">
                    <h1 className="text-heading-1">Título Principal H1</h1>
                    <h2 className="text-heading-2">Título Secundario H2</h2>
                    <p className="text-body">
                      Este es un párrafo de ejemplo usando la clase text-body. 
                      La tipografía utiliza la fuente Inter con peso ligero para 
                      una apariencia moderna y profesional.
                    </p>
                    <p className="text-body-small text-muted-foreground">
                      Texto secundario con información adicional.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}