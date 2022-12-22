import { Schema } from "mongoose";

export interface AuditDocument extends Document {
    createdBy: string;
    createdDate: number;
    updatedBy: string;
    updatedDate: number;
    delete: boolean;
};

const BaseSchema = new Schema({
    createdBy: { type: Schema.Types.ObjectId, ref: 'Member' },
    createdDate: { type: Number, default: Date.now },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'Member' },
    updatedDate: { type: Number, default: Date.now },
    delete: { type: Boolean, default: false }
});

export default BaseSchema;
