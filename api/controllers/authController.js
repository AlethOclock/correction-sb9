import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import { ValidationError, UniqueConstraintError } from 'sequelize';
// import jwt from 'jsonwebtoken';
const saltRounds = 10;

// todo implémenter jwtoken
export default class AuthController {
    static async register(userData) {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    // Validation Sequelize (ex : regex, len, notEmpty)
    if (error && error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(e => e.message);
      const err = new Error('Username must be 3-20 chars, alphanumeric only; Password must be minimum 8 chars, include uppercase, lowercase and a number');
      err.status = 400;
      err.details = messages;
      throw err;
    }

    // Contrainte d'unicité (username déjà pris)
    if (error && error.name === 'SequelizeUniqueConstraintError') {
      const messages = error.errors ? error.errors.map(e => e.message) : ['Unique constraint error'];
      const err = new Error('Username already taken');
      err.status = 400;
      err.details = messages;
      throw err;
    }

    // Autres erreurs
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
                throw new Error('Credentials are incorrect');
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