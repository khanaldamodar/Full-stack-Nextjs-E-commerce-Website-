"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Download, Trash2 } from "lucide-react"

interface Gallery {
  id: string
  name: string
  images: string[]
}

interface GalleryModalProps {
  gallery: Gallery
  selectedImages: string[]
  onSelectImage: (image: string) => void
  onClearSelection: () => void
  onClose: () => void
}

export function GalleryModal({ gallery, selectedImages, onSelectImage, onClearSelection, onClose }: GalleryModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGridView, setIsGridView] = useState(true)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") handlePrevImage()
      if (e.key === "ArrowRight") handleNextImage()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentImageIndex])

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.images.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? gallery.images.length - 1 : prev - 1))
  }

  const [image, setImage]=useState("");

  const downloadSelectedImages = async () => {
  if (selectedImages.length === 0) return;

  for (const img of selectedImages) {
    try {
      const response = await fetch(img);
      if (!response.ok) {
        console.error("Failed to fetch image:", img);
        continue;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = img.split("/").pop() || "image.jpg";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading image:", img, err);
    }
  }
};

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative h-full w-full max-w-6xl rounded-xl bg-background shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{gallery.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {gallery.images.length} images
                {selectedImages.length > 0 && ` • ${selectedImages.length} selected`}
              </p>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              {selectedImages.length > 0 && (
                <>
                  <Button variant="outline" size="sm" onClick={onClearSelection} className="gap-2 bg-transparent">
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                  <Button
  variant="outline"
  size="sm"
  className="gap-2 bg-transparent"
  onClick={downloadSelectedImages} 
>
  <Download className="h-4 w-4" />
  Download
</Button>

                  
                </>
              )}
              <Button variant="ghost" size="icon" onClick={onClose} className="h-10 w-10">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {isGridView ? (
              // Grid View
              <div className="overflow-y-auto p-6">
                <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {gallery.images.map((image, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 border-border transition-all hover:border-primary"
                      onClick={() => {
                        setCurrentImageIndex(index)
                        setIsGridView(false)
                      }}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />

                      {/* Selection Checkbox */}
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/40"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectImage(image)
                        }}
                      >
                        <div
                          className={`h-6 w-6 rounded border-2 transition-all ${
                            selectedImages.includes(image) ? "border-primary bg-primary" : "border-white bg-transparent"
                          }`}
                        >
                          {selectedImages.includes(image) && (
                            <div className="flex h-full w-full items-center justify-center text-white">✓</div>
                          )}
                        </div>
                      </div>

                      {/* Image Counter */}
                      <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                        {index + 1}/{gallery.images.length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Fullscreen View
              <div className="relative h-full w-full flex items-center justify-center bg-black">
                <img
                  src={gallery.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`Gallery image ${currentImageIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                />

                {/* Navigation Buttons */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition-all hover:bg-white/40"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition-all hover:bg-white/40"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm text-white">
                  {currentImageIndex + 1} / {gallery.images.length}
                </div>

                {/* Selection Checkbox */}
                <button
                  onClick={() => onSelectImage(gallery.images[currentImageIndex])}
                  className="absolute top-4 right-4 rounded-full bg-white/20 p-2 text-white transition-all hover:bg-white/40"
                  aria-label="Select image"
                >
                  <div
                    className={`h-6 w-6 rounded border-2 flex items-center justify-center transition-all ${
                      selectedImages.includes(gallery.images[currentImageIndex])
                        ? "border-primary bg-primary"
                        : "border-white bg-transparent"
                    }`}
                  >
                    {selectedImages.includes(gallery.images[currentImageIndex]) && (
                      <span className="text-white text-sm">✓</span>
                    )}
                  </div>
                </button>

                {/* Back to Grid Button */}
                <button
                  onClick={() => setIsGridView(true)}
                  className="absolute top-4 left-4 rounded-full bg-white/20 p-2 text-white transition-all hover:bg-white/40"
                  aria-label="Back to grid"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border bg-card px-6 py-4 text-sm text-muted-foreground">
            {isGridView ? (
              <p>Click on an image to view fullscreen • Use arrow keys to navigate</p>
            ) : (
              <p>Use arrow keys to navigate • Click checkbox to select • ESC to close</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
