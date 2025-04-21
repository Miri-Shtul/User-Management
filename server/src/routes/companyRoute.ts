import express, { RequestHandler } from "express";
import { CompanyService } from "../services/companyService";
import { retry } from '../utils/retry';

const router = express.Router();


const getCompanyById: RequestHandler = async (req, res, next) => {
    try {
        const compaby = await retry(() => CompanyService.getCompanyById(req.params.id));
        res.json(compaby);
    } catch (error) {
        next(error);
    }
};

router.get("/:id", getCompanyById);

export default router;