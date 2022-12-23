import mongoose, { Document, model, Model } from "mongoose";
import ApplicationError from "../utils/errors/application-error";
import BaseSchema from "./BaseChema";
import { AuditDocument } from "./BaseChema";

const { Schema } = mongoose;

export class AuthDocument extends Document {
    userName: string;
    fullName: string;
    password: string;
    base: AuditDocument;
}

const authSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'UserName is required'],
        maxLength: 200,
        minLenght: 10,
        unique: true,
    },
    fullName: {
        type: String,
        required: [true, 'FullName is required'],
        maxLength: 200,
        minLenght: 10,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    base: { type: BaseSchema }
});

const Auth: Model<AuthDocument> = model<AuthDocument, Model<AuthDocument>>('auth', authSchema);

export const CreateAccount = async (auth: AuthDocument): Promise<AuthDocument> => Auth.create(auth).catch((error) => {
    console.log(`--------${error}---------`);
    throw new ApplicationError(error)
});

export const Login = async (userName: string): Promise<any> => Auth.findOne({ userName: userName }).catch((error) => {
    throw new ApplicationError(error);
});

export default Auth;
