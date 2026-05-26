import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelizeClient.js';

class Pokemon extends Model {}

Pokemon.init({
    name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        atk: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        def: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        atk_spe: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        def_spe: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
}, {
    sequelize,
    modelName: 'Pokemon',
    tableName: 'pokemon',
   });

       /**
 * A Pokémon
 * @typedef  {object} Pokemon
 * @property {string} id.required - Identifier
 * @property {string} name.required - Name
 * @property {number} hp - Health points
 * @property {number} atk - Attack points
 * @property {number} def - Defense points
 * @property {number} atk_spe - Attack speed
 * @property {number} def_spe - Defense speed
 * @property {number} speed - Speed
 */

export default Pokemon;