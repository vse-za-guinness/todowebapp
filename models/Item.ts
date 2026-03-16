import mongoose, { Document, Model, Schema } from "mongoose";

export interface IItem extends Document {
  title: string;
  description: string;
  createdAt: Date;
}

const ItemSchema = new Schema<IItem>(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

// Avoid model re-registration during hot reload
export const Item: Model<IItem> =
  mongoose.models.Item ?? mongoose.model<IItem>("Item", ItemSchema);
