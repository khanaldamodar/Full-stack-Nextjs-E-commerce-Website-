"use client"

import { useState, useEffect } from "react"
import { GalleryFolderCard } from "@/components/galleries/gallery-folder-card"
import { GalleryModal } from "@/components/galleries/gallery-modal"
import Heading from "@/components/global/Heading"

interface ImageType {
  id: number
  url: string
  title: string
}

interface Gallery {
  id: number
  title: string
  description: string
  thumbnail?: string
  images: ImageType[]
}

export default function GalleriesPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null)
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await fetch("/api/gallery")
        if (!res.ok) throw new Error("Failed to fetch galleries")
        const data = await res.json()
        setGalleries(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleries()
  }, [])

  const handleSelectImage = (image: string) => {
    setSelectedImages((prev) =>
      prev.includes(image) ? prev.filter((img) => img !== image) : [...prev, image]
    )
  }

  const handleClearSelection = () => setSelectedImages([])

  if (loading) return <div className="p-5">Loading galleries...</div>
  if (error) return <div className="p-5 text-red-500">{error}</div>

  return (
    <main className="min-h-screen py-15 font-poppins">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center text-white">
          <Heading title="Galleries" />
          <p className="mt-3 text-lg text-black">Organize and explore your photo collections</p>
        </div>

        {galleries.length === 0 ? (
          <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
            <div className="text-center">
              <p className="text-lg font-medium text-foreground">No galleries yet</p>
              <p className="mt-2 text-sm text-muted-foreground">Create your first gallery to get started</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleries.map((gallery) => (
              <GalleryFolderCard
                key={gallery.id}
                gallery={{
                  id: gallery.id.toString(),
                  name: gallery.title,
                  description: gallery.description,
                  thumbnail: gallery.images[0]?.url,
                  imageCount: gallery.images.length,
                  createdDate: "", 
                }}
                onOpen={() => setSelectedGallery(gallery)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedGallery && (
        <GalleryModal
          gallery={{
            id: selectedGallery.id.toString(),
            name: selectedGallery.title,
            images: selectedGallery.images.map((img) => img.url),
          }}
          selectedImages={selectedImages}
          onSelectImage={handleSelectImage}
          onClearSelection={handleClearSelection}
          onClose={() => {
            setSelectedGallery(null)
            setSelectedImages([])
          }}
        />
      )}
    </main>
  )
}
