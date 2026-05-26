import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";

export class Type extends Model {}

Type.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  color: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "#FFFFFF"
  }
}, {
  sequelize,
  tableName: "type"
});

/**
 * A Type
 * @typedef  {object} Type
 * @property {string} id.required - Identifier
 * @property {string} name.required - Name
 * @property {string} color - Hexadecimal color (#ff00ff)
 */
