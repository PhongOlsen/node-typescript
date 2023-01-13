import { Document, Schema, Model, model } from "mongoose";
import ApplicationError from "../utils/errors/application-error";
import BaseSchema, { AuditDocument } from "./BaseChema";

export class ProductCategoryDocument extends Document {
    productCategoryName: String;
    categoryId: Schema.Types.ObjectId;
    base: AuditDocument;
}

const productCategorySchema = new Schema({
    productCategoryName: {
        type: String,
        required: [true, 'ProductCategoryName is required'],
        maxLength: 200,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    base: { type: BaseSchema }
});

const ProductCategory: Model<ProductCategoryDocument> = model<ProductCategoryDocument, Model<ProductCategoryDocument>>('productCategory', productCategorySchema);

export const CreateProductCategory = async (productCategory: ProductCategoryDocument): Promise<ProductCategoryDocument> =>
    ProductCategory.create(productCategory).catch((error) => {
        throw new ApplicationError(error);
    });