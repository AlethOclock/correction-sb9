import { Model, DataTypes } from "sequelize";
    import sequelize from "./sequelizeClient.js";
    export class User extends Model { }

    User.init({
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: "user"
    });

/**
 * A User
 * @typedef  {object} User
 * @property {string} id.required - Identifier
 * @property {string} username.required - Username
 * @property {string} password.required - Password
 */