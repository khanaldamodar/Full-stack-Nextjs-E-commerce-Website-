"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProductReviewsProps {
  productId: number
  rating: number
  reviewCount: number
}

// Sample reviews data
const SAMPLE_REVIEWS = [
  {
    id: 1,
    author: "John Doe",
    rating: 5,
    date: "2 weeks ago",
    title: "Excellent product!",
    content: "Great quality and fast shipping. Highly recommended!",
    helpful: 24,
  },
  {
    id: 2,
    author: "Jane Smith",
    rating: 4,
    date: "1 month ago",
    title: "Good value for money",
    content: "Works as expected. Minor issues with packaging but product is solid.",
    helpful: 18,
  },
  {
    id: 3,
    author: "Mike Johnson",
    rating: 5,
    date: "1 month ago",
    title: "Best purchase ever",
    content: "Exceeded my expectations. Customer service was also very helpful.",
    helpful: 32,
  },
]

export function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-foreground">Customer Reviews</h2>

      {/* Rating Summary */}
      <Card className="mb-8 p-6">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-foreground">{rating}</div>
            <div className="mt-2 flex justify-center text-yellow-400">{"★".repeat(Math.floor(rating))}</div>
            <p className="mt-2 text-sm text-muted-foreground">Based on {reviewCount} reviews</p>
          </div>

          {/* Rating Breakdown */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-12 text-sm text-muted-foreground">{stars} ★</span>
                <div className="h-2 flex-1 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-yellow-400" style={{ width: `${Math.random() * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button className="mt-6 w-full bg-secondary">Write a Review</Button>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {SAMPLE_REVIEWS.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">{review.title}</p>
                <div className="mt-1 flex items-center gap-3">
                  <div className="flex text-yellow-400">{"★".repeat(review.rating)}</div>
                  <span className="text-sm text-muted-foreground">by {review.author}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">{review.content}</p>
            <div className="mt-4 flex items-center gap-4">
              <button className="text-sm text-muted-foreground hover:text-foreground">
                👍 Helpful ({review.helpful})
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground">👎 Not helpful</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
