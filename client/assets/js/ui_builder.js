import { handler } from "./handler.js";
import { utils } from "./utils.js";

export const ui_builder = {
  //La méthode pour construire d'une card contenant un pokémon
  displayPokemon(pokemon) {
    const templatePokemonItem = document.querySelector(
      "#pokemon-list-item-template"
    );
    //On clone notre template et on distribue les données a l'intérieur !
    const itemClone = templatePokemonItem.content.cloneNode(true);
    itemClone.querySelector("img").src = `./assets/img/${pokemon.id}.webp`;
    itemClone.querySelector("p").textContent = `${pokemon.id} - ${pokemon.name}`;
    itemClone.querySelector(".card").dataset.pkmId = pokemon.id;
    //Petit listener au click pour lancer la modal du détail d'un pokemon !
    itemClone
      .querySelector("a")
      .addEventListener("click", handler.handleClickModalDetail);
    //On met le tout dans le dom !
    return itemClone;
  },

  //Méthode pour construire et afficher la modal de détail d'un pokemon
  displayModalDetail(pokemon, teams) {
    console.log('dans displayModalDetail');
    const typeElement = document.querySelector(".modal_team_types");
    pkm_detail.querySelector(".pkm_name").textContent = `${pokemon.id} - ${pokemon.name}`;
    pkm_detail.querySelector("img").src = `./assets/img/${pokemon.id}.webp`;
    typeElement.innerHTML = "";
    pokemon.types.forEach(
      (type) => (typeElement.textContent += `${type.name} `)
    );
    //On récupérer tous les éléments possédant un slot
    const statsElement = pkm_detail.querySelectorAll("[slot]");
    //Et on s'en sert pour nourrir chacunes des stats !
    statsElement.forEach((stat) => {
      pkm_detail.querySelector(`.pokemon-${stat.slot}`).textContent =
        pokemon[stat.slot];
      stat.value = pokemon[stat.slot];
    });
    const form = document.querySelector('#form_add_pkm_team');
    form.dataset.pkmId = pokemon.id;
    form.addEventListener('submit', handler.handleSubmitPokemonToTeam)
    const select = form[0];
    select.innerHTML=""
    teams.forEach((team) => {
      const option = document.createElement('option');
      option.textContent = team.name;
      option.value = team.id;
      select.appendChild(option)
    })
    pkm_detail
      .querySelector(".modal-background")
      .addEventListener("click", handler.handleClickCloseModal);
    //Finalement on affiche la modal !
    pkm_detail.classList.add("is-active");
  },

  //La méthode pour afficher la série de bouton correspondant aux types
  displayTypeBtn(type) {
    //On clone le template de bouton et c'est parti !
    const templateTypeItem = document.querySelector(
      "#types-list-item-template"
    );
    const itemClone = templateTypeItem.content.cloneNode(true);
    const btn = itemClone.querySelector("button");
    btn.textContent = type.name;
    btn.style.backgroundColor = `#${type.color}`;
    //On charge l'id dans le le dataset de chacun pour le retrouver plus tard.
    btn.dataset.typeId = type.id;
    btn.addEventListener("click", handler.handleClickTypeBtn);
    return itemClone;
  },

  //La méthode pour afficher la modal de détail d'une team 
  displayTeamModal(team) {
    tbody_team.innerHTML = "";
    //On récupére le template d'une entrée de la liste
    const tmp = document.querySelector("#template-row-table");
    //pour chaque pokemon de la team on créer une nouvelle entrée dans la table
    team.pokemons.forEach((pokemon) => {
      const rowClone = tmp.content.cloneNode(true);
      const stats = rowClone.querySelectorAll("[slot]");
      stats.forEach((statElem) => {
        if (statElem.slot === "types") {
          console.log('dans le if', pokemon);
          pokemon.types.forEach((type) => {
            rowClone.querySelector(
              `[slot=${statElem.slot}]`
            ).textContent += `${type.name} `;
          });
        } else {
          rowClone.querySelector(`[slot=${statElem.slot}]`).textContent =
            pokemon[statElem.slot];
        }
      });
      const optionsCell = rowClone.querySelector(`[slot=options]`);
      const icon = document.createElement('i');
      icon.classList.add('fa', 'fa-trash')
      icon.dataset.pkmId = pokemon.id;
      icon.dataset.teamId = team.id;
      icon.addEventListener('click', handler.handleClickRemovePokemonFromTeam)
      optionsCell.appendChild(icon);
      tbody_team.appendChild(rowClone);
    });
    const editBtn = team_modal.querySelector(".edit");
    const formEdit = team_modal.querySelector('form');
    editBtn.addEventListener("click", handler.handleClickEditBtn);
    formEdit.dataset.teamId = team.id;
    formEdit.addEventListener("submit", handler.handleSubmitFormTeamName);
    team_modal.querySelector(".team_name").textContent = team.name;
    team_modal.classList.add("is-active");
    const deleteButton = document.getElementById("btn_delete_team");
    deleteButton.addEventListener("click", handler.handleSubmitDeleteTeam);
  },

  //La méthode pour afficher les box de preview sur la page des teams
  displayTeamBox(team) {
    //On clone le template dans lequel on ajoute les données de la team
    const teamTemplate = document.querySelector("#team-list-item");
    const rowClone = teamTemplate.content.cloneNode(true);
    //Ici on met encore l'id de la team dans le dataset pour s'en resservir plus tard !
    rowClone.querySelector("section").dataset.teamId = team.id;
    rowClone.querySelector(".team-name").textContent = team.name;
    rowClone.querySelector(".team-description").textContent = team.description;
    const imgContainer = rowClone.querySelector(".imgContainer");
    //On exploite les pokemons présent dans la team paf on génére des petites images pour chacun.
    team?.pokemons?.forEach((pokemon) => {
      const img = document.createElement("img");
      const figure = document.createElement("figure");
      figure.classList.add("image", "is-64x64");
      img.src = `./assets/img/${pokemon.id}.webp`;
      img.classList.add("is-rounded");
      figure.appendChild(img);
      imgContainer.appendChild(figure);
    });
    //Finalement on insére dans le DOM !
    utils.mainContainer.appendChild(rowClone);
  },

  displayNotification(message, type) {
    const notification = document.querySelector('.notification');
    notification.classList.add(`is-${type}`);
    notification.querySelector('p').textContent = message;
    notification.classList.remove('hidden');
    setTimeout(() => {
      notification.classList.add('hidden');
      notification.classList.remove(`is-${type}`);
    }, 6000);
  },
};
