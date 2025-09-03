# Sistema de Diseño - Nuberoupload

## Paleta de Colores

### Tema Oscuro (Principal)
- **Background**: `hsl(224, 15%, 8%)` - Fondo principal muy oscuro
- **Foreground**: `hsl(220, 13%, 92%)` - Texto principal claro
- **Primary**: `hsl(217, 91%, 65%)` - Azul principal para acciones primarias
- **Accent**: `hsl(264, 83%, 75%)` - Morado para acentos y destacados

### Colores Personalizados

#### Azul (Principal)
- `blue-400`: `hsl(217, 91%, 65%)` - Para botones y enlaces principales
- `blue-500`: `hsl(217, 91%, 60%)` - Estado hover de elementos principales
- `blue-600`: `hsl(217, 91%, 55%)` - Estado activo
- `blue-700`: `hsl(217, 85%, 45%)` - Elementos de menor prioridad

#### Morado (Acento)
- `purple-400`: `hsl(264, 83%, 75%)` - Para acentos y elementos destacados
- `purple-500`: `hsl(264, 83%, 70%)` - Estado hover de acentos
- `purple-600`: `hsl(264, 80%, 65%)` - Estado activo de acentos

#### Grises (Neutros)
- `gray-100`: `hsl(220, 13%, 88%)` - Texto secundario claro
- `gray-300`: `hsl(220, 9%, 65%)` - Texto terciario
- `gray-600`: `hsl(220, 9%, 35%)` - Bordes y elementos sutiles
- `gray-800`: `hsl(224, 15%, 18%)` - Fondos de tarjetas
- `gray-900`: `hsl(224, 15%, 12%)` - Fondos de elementos elevados

## Tipografía

### Fuente Principal
- **Inter**: Fuente principal con pesos ligeros para apariencia profesional y moderna
- **Peso base**: `300` (light) para el cuerpo del texto
- **Títulos**: `200` (extralight) para crear jerarquía visual elegante

### Clases de Tipografía

#### Display y Títulos
```css
.text-display      /* text-4xl-6xl font-thin */
.text-heading-1    /* text-3xl-5xl font-extralight */
.text-heading-2    /* text-2xl-4xl font-extralight */
.text-heading-3    /* text-xl-3xl font-light */
```

#### Cuerpo de Texto
```css
.text-body-large   /* text-lg font-light */
.text-body         /* text-base font-light */
.text-body-small   /* text-sm font-light */
.text-caption      /* text-xs font-normal uppercase */
```

## Componentes

### Tarjetas
```css
.card-modern      /* Tarjeta básica con bordes sutiles */
.card-elevated    /* Tarjeta con sombra elevada */
.card-floating    /* Tarjeta flotante con backdrop blur */
```

### Botones
```css
.btn-primary      /* Botón principal morado oscuro con texto blanco */
.btn-secondary    /* Botón secundario oscuro con texto blanco */
.btn-accent       /* Botón con acento morado */
.btn-ghost        /* Botón transparente */
```

### Inputs
```css
.input-modern     /* Input con estilo moderno y focus ring */
```

## Principios de Diseño

### 1. Minimalismo Profesional
- Uso extensivo de espacios en blanco
- Elementos limpios sin decoraciones innecesarias
- Enfoque en la funcionalidad y usabilidad

### 2. Tipografía Ligera
- Pesos de fuente delgados para apariencia moderna
- Jerarquía clara sin saturación visual
- Tracking ajustado para mejor legibilidad

### 3. Colores Selectivos
- Paleta limitada de azul y morado
- No se utilizan gradientes lineales
- Acentos de color usados estratégicamente

### 4. Elementos Flotantes
- Uso sutil de backdrop-blur para profundidad
- Sombras suaves en lugar de bordes duros
- Transparencias controladas para crear capas

## Uso Recomendado

### Botones Principales
Usar `btn-primary` (morado oscuro con texto blanco) para acciones principales como:
- Subir archivos
- Guardar cambios
- Confirmar acciones

### Botones Secundarios
Usar `btn-secondary` (oscuro con texto blanco) para:
- Acciones secundarias importantes
- Elementos de navegación
- Acciones complementarias

### Botones de Acento
Usar `btn-accent` para:
- Elementos destacados especiales
- CTAs promocionales
- Acciones de menor jerarquía

### Tarjetas
- `card-modern`: Para contenido general
- `card-elevated`: Para elementos importantes
- `card-floating`: Para modales y overlays

### Tipografía
- `text-heading-1`: Para títulos de página
- `text-heading-2`: Para secciones principales
- `text-body`: Para contenido general
- `text-caption`: Para metadatos y etiquetas