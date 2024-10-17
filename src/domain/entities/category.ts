import { Schema, model } from 'mongoose';

export interface CategoryEntity {
  _id?: string;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new Schema<CategoryEntity>({
  title: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

const CategoryModel = model<CategoryEntity>('Category', categorySchema);

export default CategoryModel;