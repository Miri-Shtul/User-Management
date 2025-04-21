import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoute';
import connectDB from './db/database';
import { errorHandler } from './middleware/errorHandler';
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRouter);

app.use((err: Error, req: express.Request,
    res: express.Response, next: express.NextFunction) => {
    errorHandler(err, req, res, next);
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.info(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();