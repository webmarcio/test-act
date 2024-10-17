import { Schema, model } from 'mongoose';

export interface AnswerEntity {
  _id?: string;
  name?: string;
  email?: string;
  rating?: number;
  category?: Schema.Types.ObjectId;
  research?: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const answerSchema = new Schema<AnswerEntity>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  research: [{ type: Schema.Types.ObjectId, ref: 'Research' }],
}, {
  timestamps: true,
});

const AnswerModel = model<AnswerEntity>('Answer', answerSchema);

export default AnswerModel;