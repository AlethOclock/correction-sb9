import { Team } from '../models/index.js';

export class TeamService {
  /**
   * Vérifie si une team peut accueillir un pokémon supplémentaire
   * @param {number} teamId - L'ID de la team
   * @returns {Promise<boolean>} true si la team peut accueillir un pokémon, false sinon
   */
  static async canAddPokemon(teamId) {
    try {
      const team = await Team.findByPk(teamId, {
        include: [{
          association: 'pokemons',
          attributes: ['id'],
          through: { attributes: [] }
        }]
      });

      if (!team) {
        throw new Error('Team not found');
      }

      const pokemonCount = team.pokemons ? team.pokemons.length : 0;
      return pokemonCount < 6;
    } catch (error) {
      console.error('Error checking if pokemon can be added:', error);
      throw error;
    }
  }

  /**
   * Vérifie le nombre de pokémons dans une team
   * @param {number} teamId - L'ID de la team
   * @returns {Promise<number>} Le nombre de pokémons dans la team
   */
  static async getPokemonCount(teamId) {
    try {
      const team = await Team.findByPk(teamId, {
        include: [{
          association: 'pokemons',
          attributes: ['id'],
          through: { attributes: [] }
        }]
      });

      if (!team) {
        throw new Error('Team not found');
      }

      return team.pokemons ? team.pokemons.length : 0;
    } catch (error) {
      console.error('Error getting pokemon count:', error);
      throw error;
    }
  }
}

export default TeamService;
