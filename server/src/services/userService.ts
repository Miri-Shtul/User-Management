import { User } from '../models/User';
import { retry } from '../utils/retry';
import { AppError } from '../utils/AppError';

export class UserService {
    static async createUser(userData: {
        firstName: string; lastName: string,
        email: string; password: string,
        companyId: string
    }) {
        try {
            const existingUser = await retry(() => User.findOne({ email: userData.email }));

            if (existingUser) {
                throw new AppError('User with this email already exists', 409);
            }

            const user = new User(userData);
            await user.save();
            console.info('User created successfully', { userId: user._id });
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('Internal server error', 500);
        }
    }

    static async getUsers(companyId: string, page: number = 1, limit: number = 5) {
        try {
            const skip = (page - 1) * limit;
            const query = { companyId };

            return retry(async () => {
                const users = await User.find(query).skip(skip).limit(limit);
                const total = await User.countDocuments(query);
                const pages = Math.ceil(total / limit);
                return { users, total, page, pages };
            }, 3, 1000);
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new AppError('Error fetching users', 500);
        }
    }

    static async getUserById(id: string) {
        try {
            const user = await retry(() => User.findById(id));

            if (!user) {
                throw new AppError('User not found', 404);
            }
            console.info('User fetched successfully', { userId: id });
            return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('Error fetching user', 500);
        }
    }

    static async deleteUser(id: string) {
        try {
            const user = await retry(() => User.findByIdAndDelete(id));

            if (!user) {
                throw new AppError('User not found', 404);
            }
            console.info('User deleted successfully', { userId: id });
            return { message: 'User deleted successfully' };
        } catch (error) {
            console.error('Error deleting user:', error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError('Error deleting user', 500);
        }
    }
}