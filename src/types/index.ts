export interface RestaurantPreview {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  rating: number | null;
}

export interface RestaurantDetails extends RestaurantPreview {
  location: string;
  createdAt: Date;
  lastRatedAt: Date | null;
  ratingCount: number;
}
