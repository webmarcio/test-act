import { Schema, model } from 'mongoose';

export interface researchEntity {
  _id?: string;
  title?: string;
  question?: string;
  category?: Schema.Types.ObjectId;
  totalResponses?: number;
  averageRating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const researchSchema = new Schema<researchEntity>({
  title: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  totalResponses: { type: Number, default: 0  },
  averageRating: { type: Number, default: 0  },
}, {
  timestamps: true,
});

const ResearchModel = model<researchEntity>('Research', researchSchema);

export default ResearchModel;