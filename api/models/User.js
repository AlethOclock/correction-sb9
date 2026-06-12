import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";
import bcrypt from 'bcrypt';
const saltRounds = 10;
export class User extends Model { }

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 20],
            is: /^[A-Za-z0-9]+$/ // lettres et chiffres seulement, pas d'espaces ni caractères spéciaux
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            isStrong(value) {
                const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
                if (!re.test(value)) {
                    throw new Error('Password must be minimum 8 chars, include uppercase, lowercase and a number');
                }
            }
        }
    }
}, {
    sequelize,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) user.password = await bcrypt.hash(user.password, saltRounds);
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, saltRounds);
            }
        }
    },
    tableName: "user"
});

/**
 * A User
 * @typedef  {object} User
 * @property {string} id.required - Identifier
 * @property {string} username.required - Username
 * @property {string} password.required - Password
 */