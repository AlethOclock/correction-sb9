import { Pokemon, Team, Type } from '../models/index.js';
import TeamService from '../services/teamService.js';

export default class PokemonController {
  static async getAllPokemons() {
    try {
      const pokemons = await Pokemon.findAll();
      return pokemons;
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      throw error;
    }
  }
  static async getPokemonById(id) {
    try {
      const pokemon = await Pokemon.findByPk(id);
      return pokemon;
    } catch (error) {
      console.error('Error fetching pokemon by ID:', error);
      throw error;
    }
  }
  static async createPokemon(pokemonData) {
    try {
      const newPokemon = await Pokemon.create(pokemonData);
      return newPokemon;
    } catch (error) {
      console.error('Error creating pokemon:', error);
      throw error;
    }
  }
  static async updatePokemon(id, pokemonData) {
    try {
      const pokemon = await Pokemon.findByPk(id);
      if (!pokemon) {
        throw new Error('Pokemon not found');
      }

      // Vérifier si le nouveau nom existe déjà sur un autre Pokémon
      if (pokemonData.name && pokemonData.name !== pokemon.name) {
        const existingPokemon = await Pokemon.findOne({
          where: { name: pokemonData.name }
        });
        if (existingPokemon) {
          throw new Error(`Un Pokémon avec le nom "${pokemonData.name}" existe déjà`);
        }
      }

      await pokemon.update(pokemonData);
      return pokemon;
    } catch (error) {
      console.error('Error updating pokemon:', error);
      throw error;
    }
  }
  static async deletePokemon(id) {
    try {
      const pokemon = await Pokemon.findByPk(id);
      if (!pokemon) {
        throw new Error('Pokemon not found');
      }
      await pokemon.destroy();
      return { message: 'Pokemon deleted successfully' };
    } catch (error) {
      console.error('Error deleting pokemon:', error);
      throw error;
    }
  }



  static async addPokemonToTeam(teamId, pokemonId) {
    try {
      const team = await Team.findByPk(teamId);
      if (!team) {
        throw new Error('Team not found');
      }
      // Service de vérification du nombre de Pokémons dans la team
      if (!await TeamService.canAddPokemon(teamId)) {
        console.log(TeamService.getPokemonCount(teamId)); 
        throw new Error('L\'équipe a déjà 6 pokémons');
      }
      const pokemon = await Pokemon.findByPk(pokemonId);
      if (!pokemon) {
        throw new Error('Pokemon not found');
      }
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