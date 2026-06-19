import { Pokemon, User } from '../models/index.js';
import { Op } from 'sequelize';

export default class FavController {

    // Récupérer tous les favoris de tous les utilisateurs et les trier pour avoir le top 10
  static async getAllFavorites() {
    try {
        const favorites = await Pokemon.findAll({
            include: [{
                model: User,
                attributes: ['id', 'username'],
                through: { attributes: [] } // Exclure les attributs de la table de jointure
            }],
            order: [[User, 'id', 'ASC']] // Trier par ID d'utilisateur
        });
        return favorites;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;
    }
  }

    static async getMyFavorites(userId) {
    try {
      const user = await User.findByPk(userId, {
        include: Pokemon
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user.Pokemons;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  }

  static async addFavorite(userId, pokemonId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      const pokemon = await Pokemon.findByPk(pokemonId);
      if (!pokemon) {
        throw new Error('Pokemon not found');
      }
      await user.addPokemon(pokemon);
      return pokemon;
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  }
}