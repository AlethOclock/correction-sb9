import { utils } from "./utils.js";
import { api } from "./api.js";
import { ui_builder } from "./ui_builder.js";

export const handler = {
  //La méthode qui permet de récupérer les pokemons en fonction d'un type donné.
  //Et de les afficher !
  async handleClickTypeBtn(event) {
    const { typeId } = event.target.dataset;
    console.log(typeId);
    const typeAndPokemons = await api.fetchTypePokemons(typeId);
    utils.cleanBoard();
    typeAndPokemons.pokemons.forEach((pokemon) => {
      utils.mainContainer.appendChild(ui_builder.displayPokemon(pokemon));
    });
  },

  //La méthode qui permet de nourrir et ouvrir la modal de détails d'un pokémon
  async handleClickModalDetail(event) {
    // event.preventDefault()
    const { pkmId } = event.target.closest(".card").dataset;
    const pokemon = await api.fetchOnePokemon(pkmId);
    const teams = await api.fetchTeams();
    const formAddPokemon = document.querySelector(".btn_add_team");
    console.log(pokemon);
    ui_builder.displayModalDetail(pokemon, teams);
  },

  //La méthode qui répond au clic sur le bouton type du menuµ
  //Récupére tous les types et les affiches !
  async handleClickTypeMenu() {
    //On va chercher tous les types
    const types = await api.fetchAllTypes();
    //On nettoie le mainContainer
    utils.cleanBoard();
    types.forEach((type) => {
      utils.mainContainer.appendChild(ui_builder.displayTypeBtn(type));
    });
  },

  //La méthode qui permet de récupérer les teams d'un pokemon
  async handleClickTeamMenu(event) {
    const teams = await api.fetchTeamsAndPokemons();
    utils.cleanBoard();
    teams.forEach(ui_builder.displayTeamBox);
    document.querySelectorAll(".btnModalTeam").forEach((btn) => {
      btn.addEventListener("click", handler.handleClickTeamModal);
    });
  },

  //La méthode qui nous permet d'afficher
  //Et d'afficher la modal d'équipe.
  async handleClickTeamModal(event) {
    //On récupére la team dans le back end
    const { teamId } = event.target.closest("section").dataset;
    const team = await api.fetchOneTeam(teamId);
    ui_builder.displayTeamModal(team);
  },

  //La méthode pour fermer les modales
  handleClickCloseModal(event) {
    event.target.closest(".modal").classList.remove("is-active");
  },

  //La méthode qui permet d'ouvrir la modale de création de team.
  async handleClickAddTeamMenu() {
    const modal = document.querySelector("#add_team_modal");
    modal.classList.add("is-active");
    document
      .querySelector("#form_team_modal")
      .addEventListener("submit", handler.handleSubmitAddTeam);
  },

  //La méthode qui récupére les infos du formulaire et créer la nouvelle team
  async handleSubmitAddTeam(event) {
    event.preventDefault();
    console.log(event.target);
    const formData = Object.fromEntries(new FormData(event.target));
    const team = await api.createTeam(formData);
    handler.handleClickTeamMenu();
    handler.handleClickCloseModal(event);
  },

  //La méthode pour gérer les clic sur le bouton d'édition du nom des teams.
  handleClickEditBtn(event) {
    const modalTeam = document.querySelector("#team_modal");
    const title = modalTeam.querySelector("h2");
    const form = modalTeam.querySelector("form");
    form[0].placeholder = title.textContent;
    title.classList.toggle("hidden");
    form.classList.toggle("hidden");
  }, 

  //La méthode pour gérer la mise a jour du nom des teams
  async handleSubmitFormTeamName(event){
      event.preventDefault();
      const { teamId } = event.target.dataset;
      const formdata = Object.fromEntries(new FormData(event.target))
      const isUpdated = await api.editTeamName(teamId, formdata);
      const modalTeam = document.querySelector("#team_modal");
      if(isUpdated){
        const title = modalTeam.querySelector("h2");
        const teamInDom = document.querySelector(`[data-team-id="${teamId}"]`)
        teamInDom.querySelector('.team-name').textContent = formdata.team_name
        title.textContent = formdata.team_name;
        handler.handleClickEditBtn();
        handler.handleClickCloseModal(event)
      }else{
        console.log("Le titre n'a pas pu être mis à jour")
      }
  },
  //La méthode pour gérer l'ajout d'un pokémon dans une team
  async handleSubmitPokemonToTeam(event){
    event.preventDefault()
    const { pkmId } = event.target.dataset;
    const teamId = event.target[0].value;
    try {
      const team = await api.addPokemonToTeam(pkmId, teamId);
      handler.handleClickCloseModal(event);
      ui_builder.displayTeamModal(team);
    } catch (error) {
      console.log(error.message)
      ui_builder.displayNotification("Une erreur est survenue lors de l'ajout du pokémon à l'équipe. Une team ne peut avoir avoir plus de 5 Pokémons", "danger")
    }
  }, 
  //La méthode qui permet d'enlever un pokemon d'une team.
  async handleClickRemovePokemonFromTeam(event){
    const {pkmId, teamId} = event.target.dataset;
    const team = await api.removePokemonFromTeam(pkmId, teamId);
    ui_builder.displayTeamModal(team);
  },
  // La méthode pour supprimer une team

  async handleSubmitDeleteTeam(event) {
    event.preventDefault();
    const { teamId } = event.target.dataset;
    const isDeleted = await api.deleteTeam(teamId);
    if (isDeleted) {
      handler.handleClickTeamMenu();
      handler.handleClickCloseModal(event);
    } else {
      console.log("La team n'a pas pu être supprimée");
    }
  }
};