import { Pokemon, Team, Type } from '../models/index.js';
import SequenceService from '../services/sequenceService.js';

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
  static async createTeam(teamData) {
    try {
      // Calculer le prochain ID
      const nextId = await SequenceService.getNextId('"team"');
      
      // Ajouter l'ID aux données
      const teamWithId = { ...teamData, id: nextId };
      
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
      await team.destroy();
      return { message: 'Team deleted successfully' };
    } catch (error) {
      console.error('Error deleting team:', error);
      throw error;
    }
  }

}
