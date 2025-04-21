import express, { RequestHandler } from "express";
import { UserService } from "../services/userService";
import { AppError } from "../utils/AppError";

const router = express.Router();

const createUser: RequestHandler = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            throw new AppError('All fields are required', 400);
        }
        const companyId = '1234567890abcdef12345678'; // Currently hardCoded
        console.log("Creating user", { firstName, lastName, email });
        const user = await UserService.createUser({ firstName, lastName, email, password, companyId });
        res.status(201).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const getUserById: RequestHandler = async (req, res, next) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser: RequestHandler = async (req, res, next) => {
    try {
        const result = await UserService.deleteUser(req.params.id);
        res.json({
            status: 'success',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const companyId = '1234567890abcdef12345678'; // Currently hardCoded
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const result = await UserService.getUsers(companyId, page, limit);
        res.json({
            status: 'success',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

router.post("/", createUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.get("/", getUsers);

export default router;