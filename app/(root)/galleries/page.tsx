"use client"

import { useState } from "react"
import { GalleryFolderCard } from "@/components/galleries/gallery-folder-card"
import { GalleryModal } from "@/components/galleries/gallery-modal"
import Heading from "@/components/global/Heading"

interface Gallery {
  id: string
  name: string
  description: string
  imageCount: number
  thumbnail: string
  images: string[]
  createdDate: string
}

const SAMPLE_GALLERIES: Gallery[] = [
  {
    id: "1",
    name: "Summer Vacation 2024",
    description: "Beautiful moments from our summer trip",
    imageCount: 12,
    thumbnail:"/logo.jpeg",
    images: [
      "/logo.jpeg",
      "/logo.jpeg",
      "/logo.jpeg",
      "/logo.jpeg",
      "/logo.jpeg",
      "/logo.jpeg",
      "/logo.jpeg",
      "/logo.jpeg",
      "/logo.jpeg",
      "/logo.jpeg",
      "/logo.jpeg",
      "/logo.jpeg"
    ],
    createdDate: "2024-06-15",
  },
  {
    id: "2",
    name: "Mountain Adventure",
    description: "Hiking and exploring mountain peaks",
    imageCount: 8,
    thumbnail:'/logo.jpeg',
    images: [
      "/mountain-peak-snow.jpg",
      "/forest-hiking-trail.png",
      "/mountain-valley-view.jpg",
      "/alpine-meadow-flowers.jpg",
      "/majestic-mountain-sunset.png",
      "/rocky-mountain-landscape.jpg",
      "/mountain-lake-reflection.png",
      "/mountain-forest-trail.png",
    ],
    createdDate: "2024-07-20",
  },
  {
    id: "3",
    name: "City Exploration",
    description: "Urban photography and street scenes",
    imageCount: 15,
    thumbnail:"/logo.jpeg",
    images: [
      "/city-skyline-night.png",
      "/urban-street-photography.png",
      "/modern-architecture-building.png",
      "/city-street-cafe.png",
      "/downtown-urban-landscape.jpg",
      "/city-lights-night.png",
      "/placeholder.svg?height=400&width=400",
      "/urban-park-city.jpg",
      "/placeholder.svg?height=400&width=400",
      "/downtown-buildings.jpg",
      "/city-street-corner.jpg",
      "/urban-photography-street.png",
      "/city-market-street.jpg",
      "/modern-city-skyline.png",
      "/city-evening-lights.jpg",
    ],
    createdDate: "2024-08-10",
  },
  {
    id: "4",
    name: "Nature & Wildlife",
    description: "Animals and natural landscapes",
    imageCount: 10,
    thumbnail:"/logo.jpeg",
    images: [
      "/wildlife-lion-safari.jpg",
      "/bird-flying-nature.jpg",
      "/forest-landscape-trees.jpg",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/deer-forest-wildlife.jpg",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    createdDate: "2024-05-22",
  },
  {
    id: "5",
    name: "Food & Dining",
    description: "Culinary adventures and restaurant visits",
    imageCount: 9,
    thumbnail: "/logo.jpeg",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    createdDate: "2024-09-05",
  },
  {
    id: "6",
    name: "Events & Celebrations",
    description: "Special moments and celebrations",
    imageCount: 11,
    thumbnail: "/logo.jpeg",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    createdDate: "2024-04-18",
  },
]

export default function GalleriesPage() {
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null)
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const handleSelectImage = (image: string) => {
    setSelectedImages((prev) => (prev.includes(image) ? prev.filter((img) => img !== image) : [...prev, image]))
  }

  const handleClearSelection = () => {
    setSelectedImages([])
  }

  return (
    <main className="min-h-screen py-15  font-poppins">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center text-white">
          {/* <h1 className="text-4xl font-bold text-foreground">My Galleries</h1> */}
          <Heading title="Galleries"/>
          <p className="mt-3 text-lg text-black">Organize and explore your photo collections</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_GALLERIES.map((gallery) => (
            <GalleryFolderCard key={gallery.id} gallery={gallery} onOpen={() => setSelectedGallery(gallery)} />
          ))}
        </div>

        {/* Empty State */}
        {SAMPLE_GALLERIES.length === 0 && (
          <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
            <div className="text-center">
              <p className="text-lg font-medium text-foreground">No galleries yet</p>
              <p className="mt-2 text-sm text-muted-foreground">Create your first gallery to get started</p>
            </div>
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      {selectedGallery && (
        <GalleryModal
          gallery={selectedGallery}
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
