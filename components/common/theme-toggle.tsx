'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { ClientOnly } from './client-only'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <ClientOnly fallback={
      <Button variant="ghost" size="icon">
        <Sun className="h-5 w-5" />
      </Button>
    }>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
        <span className="sr-only">Alternar tema</span>
      </Button>
    </ClientOnly>
  )
}