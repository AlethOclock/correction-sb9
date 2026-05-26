import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelizeClient.js";

export class PokemonType extends Model { }

PokemonType.init({
  pokemon_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize,
  tableName: "pokemon_type"
});