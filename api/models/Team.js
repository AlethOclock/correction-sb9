import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";

export class Team extends Model { }

Team.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true,
            len: [1, 50]
        }
    },

    description: {
        type: DataTypes.TEXT,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'user_id'
    }
}, {
    sequelize,
    tableName: "team"
});