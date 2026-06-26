import { Pokemon, User } from '../models/index.js';
import { Op } from 'sequelize';

export default class FavController {

    // Récupérer tous les favoris de tous les utilisateurs et les trier pour avoir le top 10
  static async getAllFavorites() {
    try {
      const favorites = await Pokemon.findAll({
        // On limite à 10 résultats pour avoir le top 10
        limit: 10,
        include: [{
                model: User,
                attributes: ['id', 'username'],
                through: { attributes: [] },
                as: 'favoritedBy',
            }]
        });
        // Trier par nombre d'utilisateurs décroissant pour avoir les plus ajoutés au début
        favorites.sort((a, b) => b.favoritedBy.length - a.favoritedBy.length);
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
  static async removeFavorite(id, userId) {
    try {
      console.log(id, userId);
      const user = await User.findByPk(userId);
      const pokemon = await Pokemon.findByPk(id);
      if (!user || !pokemon) {
        throw new Error('User or Pokemon not found');
        console.log(user, pokemon);
      }
      await user.removeFavorite(pokemon); // Utilisation de la méthode générée par Sequelize pour la relation many-to-many
      return { message: 'Favorite removed successfully' };
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }

  // Voir combien de fois un Pokémon a été ajouté en favori
  static async getFavoriteCount(pokemonId) {
    try {
      const pokemon = await Pokemon.findByPk(pokemonId, {
        include: [{
          model: User,
          as: 'favoritedBy'
        }]
      });
      if (!pokemon) {
        throw new Error('Pokemon not found');
      }
      return pokemon.favoritedBy.length; // Retourne le nombre d'utilisateurs qui ont ajouté ce Pokémon en favori
    } catch (error) {
      console.error('Error fetching favorite count:', error);
      throw error;
    }
  }
}