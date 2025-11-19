"use client"

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = () => {
    const newLocale = locale === 'pt-BR' ? 'en' : 'pt-BR'
    
    const pathWithoutLocale = pathname.replace(/^\/(pt-BR|en)/, '')
    const newPath = `/${newLocale}${pathWithoutLocale}`
    
    router.push(newPath)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={switchLanguage}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      {locale === 'pt-BR' ? 'EN' : 'PT'}
    </Button>
  )
}