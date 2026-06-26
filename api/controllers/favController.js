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
                through: { attributes: [] },
                as: 'favoritedBy'
            }],
            order: [[{ model: User, as: 'favoritedBy' }, 'id', 'ASC']]
        });
        return favorites;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;
    }
  }

  // Récupérer les favoris d'un utilisateur
    static async getMyFavorites(userId) {
    try {
      const user = await User.findByPk(userId, {
        include: [{
          model: Pokemon,
          as: 'favorites'
        }]
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user.favorites;
    } catch (error) { 
      console.error('Error fetching favorites:', error);
      throw error;
    }
  }

  // Ajouter un Pokémon en favori pour un utilisateur spécifique
  static async addFavorite(id, userId) {
    console.log('bien arrivé au controller');
    try {
      // On récupère l'utilisateur connecté
      console.log(userId);
      const user = await User.findByPk(userId);
      const pokemon = await Pokemon.findByPk(id);
      if (!user || !pokemon) {
        throw new Error('User or Pokemon not found');
      }
      // Vérifier que le favori n'existe pas déjà
      const hasFavorite = await user.hasFavorite(pokemon);
      if (hasFavorite) {
        throw new Error('Pokemon already in favorites');
      }
      await user.addFavorite(pokemon); // Utilisation de la méthode générée par Sequelize pour la relation many-to-many
      return { message: 'Favorite added successfully' };
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  }

  // Supprimer un Pokémon des favoris d'un utilisateur spécifique
  static async removeFavorite(userId, pokemonId) {
    try {
      const user = await User.findByPk(userId);
      const pokemon = await Pokemon.findByPk(pokemonId);
      if (!user || !pokemon) {
        throw new Error('User or Pokemon not found');
      }
      await user.removePokemon(pokemon); // Utilisation de la méthode générée par Sequelize pour la relation many-to-many
      return { message: 'Favorite removed successfully' };
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }
}