import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

interface IUser extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyId: string;
}

const userSchema = new mongoose.Schema<IUser>({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    companyId: {
        type: String,
        required: true,
        ref: "Company",
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export const User = mongoose.model<IUser>("User", userSchema);