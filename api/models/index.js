import Pokemon from './Pokemon.js';
import { Team } from './Team.js';
import { PokemonType } from './PokemonType.js';
import { Type } from './Type.js';
import { User } from './User.js';
import { TeamPokemon } from './TeamPokemon.js';
import { sequelize } from "./sequelizeClient.js";

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
    foreignKey: "user_id",
    as: "teams"
});

Team.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});



export { Pokemon, Team, TeamPokemon, Type, PokemonType, User, sequelize };