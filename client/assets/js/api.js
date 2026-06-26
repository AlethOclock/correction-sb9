// pour version locale const apiBaseUrl = "http://localhost:3000/api";
// pour docker :
const apiBaseUrl = 'https://51.83.97.169:5000/api';

export const api = {
  async fetchAllPokemons() {
    try {
      //On appel l'API avec fetch (defaut = GET) pour récupérer la liste de tous les pokemons
      const httpResponses = await fetch(`${apiBaseUrl}/pokemons`);
      //Si le status de la réponse n'est pas 20X alors on retourne null
      if (!httpResponses.ok) return null;
      //Sinon on cast la réponse vers du JSON, et on retourne le tout.
      const pokemons = await httpResponses.json();
      return pokemons;
    } catch (error) {
      console.log(error);
    }
  },

  async fetchOnePokemon(id) {
    try {
      //On appel l'API avec fetch (defaut = GET) pour récupérer un pokemon et ses types
      const httpResponses = await fetch(`${apiBaseUrl}/pokemons/${id}`);
      //Si le status de la réponse n'est pas 20X alors on retourne null
      if (!httpResponses.ok) return null;
      //Sinon on cast la réponse vers du JSON, et on retourne le tout.
      const pokemon = await httpResponses.json();
      return pokemon;
    } catch (error) {
      console.log(error);
    }
  },

  async fetchAllTypes() {
    try {
      //On appel l'API avec fetch (defaut = GET) pour récupérer tous les types
      const httpResponses = await fetch(`${apiBaseUrl}/types`);
      //Si le status de la réponse n'est pas 20X alors on retourne null
      if (!httpResponses.ok) return null;
      //Sinon on cast la réponse vers du JSON, et on retourne le tout.
      const types = await httpResponses.json();
      return types;
    } catch (error) {
      console.log(error);
    }
  },

  async fetchTypePokemons(id) {
    try {
      //On appel l'API avec fetch (defaut = GET) pour récupérer un pokemon et ses types
      const httpResponses = await fetch(`${apiBaseUrl}/types/${id}/pokemons`);
      //Si le status de la réponse n'est pas 20X alors on retourne null
      if (!httpResponses.ok) return null;
      //Sinon on cast la réponse vers du JSON, et on retourne le tout.
      const typeAndPokemons = await httpResponses.json();
      return typeAndPokemons;
    } catch (error) {
      console.log(error);
    }
  },
  async fetchTeams() {
    try {
      //On appel l'API avec fetch (defaut = GET) pour récupérer toutes les teams et leur pokemons
      const httpResponses = await fetch(`${apiBaseUrl}/teams/`);
      //Si le status de la réponse n'est pas 20X alors on retourne null
      if (!httpResponses.ok) return null;
      //Sinon on cast la réponse vers du JSON, et on retourne le tout.
      const teams = await httpResponses.json();
      return teams;
    } catch (error) {
      console.log(error);
    }
  },

  async fetchTeamsAndPokemons() {
    try {
      console.log("Fetching all teams and their pokemons");
      //On appel l'API avec fetch (defaut = GET) pour récupérer toutes les teams et leur pokemons
      const httpResponses = await fetch(`${apiBaseUrl}/teams/pokemons`);
      //Si le status de la réponse n'est pas 20X alors on retourne null
      if (!httpResponses.ok) return null;
      //Sinon on cast la réponse vers du JSON, et on retourne le tout.
      const teamsAndPokemons = await httpResponses.json();
      return teamsAndPokemons;
    } catch (error) {
      console.log(error);
    }
  },

  async fetchOneTeam(id) {
    try {
      const httpResponses = await fetch(`${apiBaseUrl}/teams/${id}`);
      if (!httpResponses.ok) return null;
      const teamAndPokemons = await httpResponses.json();
      return teamAndPokemons;
    } catch (error) {
      console.log(error);
    }
  },

  async createTeam(data) {
    console.log('dans createTeam');
    try {
      const httpResponses = await fetch(`${apiBaseUrl}/teams/`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!httpResponses.ok) return null
      const teamCreated = await httpResponses.json();
      return teamCreated;
    } catch (error) {
      console.log(error);
    }
  },

  async addPokemonToTeam(idPokemon, idTeam) {
    
    try {
      const httpResponses = await fetch(
        `${apiBaseUrl}/teams/${idTeam}/pokemons/${idPokemon}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );
      if (!httpResponses.ok) return null
      const teamUpdated = await httpResponses.json();
      console.log(teamUpdated)
      return teamUpdated;
    } catch (error) {
      console.log(error);
    }
  },

  async editTeamName(id, data) {
    try {
      const {name} = data;
      const httpResponses = await fetch(`${apiBaseUrl}/teams/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (!httpResponses.ok) return null
      return true
    } catch (error) {
      console.log(error);
    }
  },

  async removePokemonFromTeam(idPkm, idTeam) {
    try {
      const httpResponses = await fetch(`${apiBaseUrl}/teams/${idTeam}/pokemons/${idPkm}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      if (!httpResponses.ok) return null
      const team = await httpResponses.json();
      return team
    } catch (error) {
      console.log(error);
    }
  },
  async deleteTeam(id) {
    try {
      const httpResponses = await fetch(`${apiBaseUrl}/teams/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      if (!httpResponses.ok) return null
      return true;
    } catch (error) {
      console.log(error);
    }
  }
};
