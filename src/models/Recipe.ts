import mongoose, { Schema, models, model, Types } from "mongoose";

export interface IReview {
  user: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IRecipe {
  title: string;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  category: string;
  cookingTime: number; // minutes
  difficulty: "Easy" | "Medium" | "Hard";
  imageUrl: string;
  createdBy: Types.ObjectId;
  reviews: IReview[];
  averageRating: number;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const RecipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  ingredients: { type: [String], required: true },
  category: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
  imageUrl: { type: String, default: "" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reviews: { type: [ReviewSchema], default: [] },
  averageRating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Recipe = models.Recipe || model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;