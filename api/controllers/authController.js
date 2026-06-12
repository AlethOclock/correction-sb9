import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
const saltRounds = 10;

// todo implémenter jwtoken
export default class AuthController {
    static async register(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        try {
            userData.password = hashedPassword;
            const newUser = await User.create(userData);
            return newUser;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
    static async getAllUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
    static async login(userData) {
        try {
            const user = await User.findOne({ where: { username: userData.username } });
            if (!user) {
                throw new Error('User not found');
            }
            const passwordMatch = await bcrypt.compare(userData.password, user.password);
            if (!passwordMatch) {
                throw new Error('Invalid password');
            }
            // À implémenter : génération de token JWT
            // ?   
            return user;
        }
        catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            await user.destroy();
            return { message: 'User deleted successfully' };
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
}