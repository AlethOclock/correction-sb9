import { Pokemon, Team, Type } from '../models/index.js';
import TeamService from '../services/teamService.js';
import { Op } from 'sequelize';

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


  // Recherche de Pokémons par nom ou type.
  // Contraintes : insensibilité à la casse, correspondance partielle (LIKE), trois caractères minimum, 20 résultats minimum
static async searchPokemons(name, type) {
  try {
    const whereClause = {};
const include = [{
  model: Type,
  as: 'types',
  through: { attributes: [] },
  required: !!type // true si on filtre par type => INNER JOIN
}];

if (name) {
  const n = String(name).trim();
  if (n.length < 3) throw new Error('Le nom doit comporter au moins 3 caractères');
  whereClause.name = { [Op.iLike]: `%${n}%` };
}

if (type) {
  include[0].where = { name: { [Op.iLike]: type } };
}

const pokemons = await Pokemon.findAll({
  where: whereClause,
  include,
  limit: 20,
  order: [['name', 'ASC']],
  distinct: true
});
    return pokemons;
  } catch (error) {
    console.error('Error searching pokemons:', error);
    throw error;
  }
}
}