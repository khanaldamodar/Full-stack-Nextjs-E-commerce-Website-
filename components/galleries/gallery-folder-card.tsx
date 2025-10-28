"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderOpen, ImageIcon } from "lucide-react"

interface Gallery {
  id: string
  name: string
  description: string
  imageCount: number
  thumbnail: string
  createdDate: string
}

interface GalleryFolderCardProps {
  gallery: Gallery
  onOpen: () => void
}

export function GalleryFolderCard({ gallery, onOpen }: GalleryFolderCardProps) {
  const createdDate = new Date(gallery.createdDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Card
      className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
      onClick={onOpen}
    >
      {/* Thumbnail Image */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img
          src={gallery.thumbnail || "/placeholder.svg"}
          alt={gallery.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/40 flex items-center justify-center">
          <FolderOpen className="h-12 w-12 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">{gallery.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{gallery.description}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ImageIcon className="h-4 w-4" />
            <span>{gallery.imageCount} images</span>
          </div>
          <span className="text-xs text-muted-foreground">{createdDate}</span>
        </div>

        {/* Open Button */}
        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation()
            onOpen()
          }}
        >
          View Gallery
        </Button>
      </div>
    </Card>
  )
}
