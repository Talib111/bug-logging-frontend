import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Share, Download } from 'lucide-react'
import html2canvas from 'html2canvas'

export default function ShareDialog() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const captureContent = async (): Promise<Blob | null> => {
    if (contentRef.current) {
      try {
        const canvas = await html2canvas(contentRef.current)
        return new Promise((resolve) => {
          canvas.toBlob((blob:any) => resolve(blob), 'image/png')
        })
      } catch (error) {
        console.error('Error capturing content:', error)
        setError('Failed to capture content. Please try again.')
        return null
      }
    }
    return null
  }

  const shareContent = async (blob: Blob) => {
    const file = new File([blob], "shareable-content.png", { type: "image/png" })
    if (navigator.share) {
      try {
        await navigator.share({
          files: [file],
          title: 'Check out this content!',
          text: 'I wanted to share this interesting content with you.',
        })
      } catch (error) {
        console.error('Error sharing content:', error)
        if (error instanceof DOMException && error.name === 'AbortError') {
          // User cancelled the share, don't show an error
          return
        }
        setError('Failed to open sharing. You can try downloading and sharing manually.')
      }
    } else {
      setError('Direct sharing is not supported on this device. You can download the image instead.')
    }
  }

  const downloadContent = (blob: Blob) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'shareable-content.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    setError(null)
    const blob = await captureContent()
    if (blob) {
      await shareContent(blob)
    }
  }

  const handleDownload = async () => {
    setError(null)
    const blob = await captureContent()
    if (blob) {
      downloadContent(blob)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Sharable Content</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this content</DialogTitle>
          <DialogDescription>
            Click the share button to open your device's sharing options.
          </DialogDescription>
        </DialogHeader>
        <div ref={contentRef} className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Exciting News!</h2>
          <p className="text-gray-600">
            We're thrilled to announce our latest feature. It's going to revolutionize how you work!
          </p>
          <img src="/placeholder.svg?height=100&width=200" alt="New Feature" className="mt-4 rounded" />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2" role="alert">{error}</p>
        )}
        <div className="flex justify-end mt-4 space-x-2">
          <Button onClick={handleDownload} className="flex items-center">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button onClick={handleShare} className="flex items-center">
            <Share className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

