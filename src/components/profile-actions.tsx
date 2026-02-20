import { Button } from "@/components/ui/button"
import { Share2, Check } from "lucide-react"
import { useState } from "react"

export function ShareButton() {
    const [copied, setCopied] = useState(false)

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Button
            variant="outline"
            size="lg"
            className="flex-1 md:flex-none border-white/10 text-white min-w-[3rem]"
            onClick={handleShare}
        >
            {copied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
        </Button>
    )
}
