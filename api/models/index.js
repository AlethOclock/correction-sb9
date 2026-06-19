import Pokemon from './Pokemon.js';
import { Team } from './Team.js';
import { PokemonType } from './PokemonType.js';
import { Type } from './Type.js';
import { User } from './User.js';
import { TeamPokemon } from './TeamPokemon.js';
import { sequelize } from "./sequelizeClient.js";
import { Favorite } from './Favorite.js';

// On met ici les associations entre les modèles
Team.belongsToMany(Pokemon, {
    through: TeamPokemon,
    foreignKey: "team_id",
    otherKey: "pokemon_id",
    as: "pokemons"
});

Pokemon.belongsToMany(Team, {
    through: TeamPokemon,
    foreignKey: "pokemon_id",
    otherKey: "team_id",
    as: "teams"
});
Pokemon.belongsToMany(Type, {
    through: PokemonType,
    foreignKey: "pokemon_id",
    otherKey: "type_id",
    as: "types"
});

Type.belongsToMany(Pokemon, {
    through: PokemonType,
    foreignKey: "type_id",
    otherKey: "pokemon_id",
    as: "pokemons"
});

User.hasMany(Team, {
    foreignKey: { name: 'userId', field: 'user_id' },
    as: "teams"
});

Team.belongsTo(User, {
    foreignKey: { name: 'userId', field: 'user_id' },
    as: "user"
});

User.belongsToMany(Pokemon, {
  through: Favorite,
  foreignKey: 'user_id',
  otherKey: 'pokemon_id',
  as: 'favorites'
});
Pokemon.belongsToMany(User, {
  through: Favorite,
  foreignKey: 'pokemon_id',
  otherKey: 'user_id',
  as: 'favoritedBy'
});


export { Pokemon, Team, TeamPokemon, Type, PokemonType, User, sequelize };