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
          throw new Error(`A Pokemon with the name "${pokemonData.name}" already exists`);
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
}