export interface Recipe {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  category: string;
  cookingTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  imageUrl: string;
  createdBy: { _id: string; name: string } | string;
  reviews: Review[];
  averageRating: number;
  createdAt: string;
}

export interface Review {
  _id?: string;
  user: { _id: string; name: string } | string;
  rating: number;
  comment: string;
  createdAt: string;
}