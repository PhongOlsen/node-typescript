import BaseSchema, { AuditDocument } from './BaseChema';
import { Document, model, Model, Schema } from "mongoose";
import ApplicationError from '../utils/errors/application-error';

export class CategoryDocument extends Document {
    categoryName: string;
    base: AuditDocument;
};

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: [true, 'CategoryName is required'],
        maxLength: 200,
    },
    base: { type: BaseSchema }
});

const Category: Model<CategoryDocument> = model<CategoryDocument, Model<CategoryDocument>>('caregory', categorySchema);

export const CreateCategory = async (category: CategoryDocument): Promise<CategoryDocument> => Category.create(category).catch((error) => {
    throw new ApplicationError(error);
});