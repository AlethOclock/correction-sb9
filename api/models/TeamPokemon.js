import { Model, DataTypes } from "sequelize";
    import sequelize from "./sequelizeClient.js";

    export class TeamPokemon extends Model { }

    TeamPokemon.init({
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pokemon_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: "team_pokemon"
    });