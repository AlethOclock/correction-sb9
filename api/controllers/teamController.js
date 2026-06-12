import { Pokemon, Team, Type } from '../models/index.js';
import SequenceService from '../services/sequenceService.js';
import TeamService from '../services/teamService.js';


export default class TeamController {
  static async getAllTeams() {
    try {
      const teams = await Team.findAll();
      return teams;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }
  static async getTeamById(id) {
    try {
      const team = await Team.findByPk(id, {
        // on ajoute un include pour récupérer les pokémons associés à l'équipe
        include: [{
          association: 'pokemons',
          attributes: ['id', 'name', 'hp', 'atk', 'def', 'atk_spe', 'def_spe', 'speed'],
          through: { attributes: [] } // Exclure les données de la table de liaison
        }]
      });
      return team;
    } catch (error) {
      console.error('Error fetching team by ID:', error);
      throw error;
    }
  }
  static async createTeam(userId, teamData) {
    try {
      // Calculer le prochain ID
      const nextId = await SequenceService.getNextId('"team"');

      // Ajouter l'ID aux données
      const teamWithId = { ...teamData, id: nextId };
      // Ajouter le User ID à l'équipe créée
      teamWithId.userId = userId;
      console.log(teamWithId);
      const newTeam = await Team.create(teamWithId);
      return newTeam;
    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  }
  static async updateTeam(id, teamData) {
    try {
      const team = await Team.findByPk(id);
      if (!team) {
        throw new Error('Team not found');
      }
      await team.update(teamData);
      return team;
    } catch (error) {
      console.error('Error updating team:', error);
      throw error;
    }
  }
  static async deleteTeam(id) {
    try {
      const team = await Team.findByPk(id);
      if (!team) {
        throw new Error('Team not found');
      }
      // Supprimer les associations avec les pokémons pour éviter les problèmes de clés étrangères
      await team.setPokemons([]); 
      // Supprimer l'équipe
      await team.destroy();
      return { message: 'Team deleted successfully' };
    } catch (error) {
      console.error('Error deleting team:', error);
      throw error;
    }
  }
  static async addPokemonToTeam(teamId, pokemonId) {
    try {
      const team = await Team.findByPk(teamId);
      if (!team) {
        throw new Error('Team not found');
      }
      // Service de vérification d'absence du Pokémon dans la team pour éviter les doublons
      if (await TeamService.checkPokemonAlreadyInTeam(teamId, pokemonId)) {
        throw new Error('Pokemon already in team');
      }
      // Service de vérification du nombre de Pokémons dans la team
      if (!await TeamService.canAddPokemon(teamId)) {
        throw new Error('The team already has 6 Pokemons');
      }
      const pokemon = await Pokemon.findByPk(pokemonId);
      if (!pokemon) {
        throw new Error('Pokemon not found');
      }

      // Si les tests sont passés, on ajoute le Pokémon à l'équipe
      await team.addPokemon(pokemon);
      return { message: 'Pokemon added to team successfully' };
    } catch (error) {
      console.error('Error adding pokemon to team:', error);
      throw error;
    }
  }
  static async removePokemonFromTeam(teamId, pokemonId) {
    try {
      const team = await Team.findByPk(teamId);
      if (!team) {
        throw new Error('Team not found');
      }
      const pokemon = await Pokemon.findByPk(pokemonId);
      if (!pokemon) {
        throw new Error('Pokemon not found');
      }
      await team.removePokemon(pokemon);
      return { message: 'Pokemon removed from team successfully' };
    } catch (error) {
      console.error('Error removing pokemon from team:', error);
      throw error;
    }
  }
}
