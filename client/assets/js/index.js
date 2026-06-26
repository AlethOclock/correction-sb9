//On récupére les méthodes liées aux appels vers le serveur.
import { api } from "./api.js";
import { ui_builder } from "./ui_builder.js";
import { utils } from "./utils.js";
import { handler } from "./handler.js";

const app = {
  mainContainer: document.querySelector("#app"),
  navBar: document.querySelector("#navbar_main"),
  //La méthode à lancer au chargement du DOM
  async init() {
    app.getAllPokemonsAndDisplay();
    app.dipatchNavBarListeners();
    app.dispatchCloseBtnEvent();
  },
  //La méthode pour nettoyer le <main>
//  a méthode pour la gestion du menu
  dipatchNavBarListeners() {
    app.navBar
      .querySelector("#nav-item-home")
      .addEventListener("click", app.getAllPokemonsAndDisplay);
    app.navBar
      .querySelector("#nav-item-type")
      .addEventListener("click", handler.handleClickTypeMenu);
    app.navBar
      .querySelector("#nav-item-team")
      .addEventListener("click", handler.handleClickTeamMenu);
    app.navBar
      .querySelector("#nav-item-add-team")
      .addEventListener("click", handler.handleClickAddTeamMenu);
  },
  //Méthode pour la gestion des icones de fermeture des modals
  dispatchCloseBtnEvent() {
    const closesBtn = document.querySelectorAll(".close");
    closesBtn.forEach((btn) =>
      btn.addEventListener("click", handler.handleClickCloseModal)
    );
  },
  //La méthode pour récupérer et afficher tous les pokémons, celle qui sera executée pour la page d'accueil !
  async getAllPokemonsAndDisplay() {
    const pokemons = await api.fetchAllPokemons();
    utils.cleanBoard();
    // pokemons.forEach(app.displayPokemon)
    pokemons.forEach((pokemon) => {
      app.mainContainer.appendChild(ui_builder.displayPokemon(pokemon));
    });
  },
};

document.addEventListener("DOMContentLoaded", app.init);
