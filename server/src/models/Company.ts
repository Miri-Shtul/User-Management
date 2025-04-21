import mongoose from "mongoose";

interface ICompany extends mongoose.Document {
    name: string;
    address: string;
}

const companySchema = new mongoose.Schema<ICompany>({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
}, { timestamps: true });


export const Company = mongoose.model<ICompany>("Company", companySchema);