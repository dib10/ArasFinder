import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from 'next-intl'

interface GeneratedUrlCardProps {
  url: string
  platform: "LinkedIn" | "Indeed"
  title: string
}

export function GeneratedUrlCard({ url, platform, title }: GeneratedUrlCardProps) {
  const { toast } = useToast()
  const t = useTranslations('GeneratedUrl')

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: t('copySuccess.title'),
        description: t('copySuccess.description', { platform }),
      })
    } catch (err) {
      toast({
        title: t('copyError.title'),
        description: t('copyError.description'),
        variant: "destructive",
      })
    }
  }

  const openInBrowser = () => {
    window.open(url, "_blank")
  }

  const buttonColor = platform === "LinkedIn" ? "bg-blue-600 hover:bg-blue-700" : "bg-orange-600 hover:bg-orange-700"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700 dark:text-green-400">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea value={url} readOnly className="min-h-[100px] text-sm" />
        <div className="flex gap-3">
          <Button onClick={openInBrowser} className={`flex-1 ${buttonColor}`}>
            <ExternalLink className="mr-2 h-4 w-4" />
            {t('openButton', { platform })}
          </Button>
          <Button onClick={copyToClipboard} variant="outline" className="flex-1">
            <Copy className="mr-2 h-4 w-4" />
            {t('copyButton')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 