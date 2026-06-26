import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelizeClient.js';

export class Favorite extends Model {}
Favorite.init({
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  pokemon_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  tableName: 'favorite',
  timestamps: false
});
export default Favorite;