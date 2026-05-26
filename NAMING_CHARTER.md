# 📋 Charte de Nommage - Pokedex API

## Variables et Fonctions
- Format : **camelCase**
- Exemples :
  - `getUserTeams()`
  - `addPokemonToTeam()`
  - `userEmail`
  - `pokemonId`

## Classes et Constructeurs
- Format : **PascalCase**
- Exemples :
  - `UserController`
  - `TeamService`
  - `PokemonRepository`
  - `ValidationError`

## Fichiers
- Format : **camelCase** pour les fichiers source
- Exemples :
  - `userController.js`
  - `teamService.js`
  - `pokemonRoutes.js`

## Routes et Endpoints
- Format : **RESTful lowercase avec tirets** pour les ressources composées
- Exemples :
  - `GET /api/teams` - lister tous les équipes
  - `GET /api/teams/:id` - détails d'une équipe
  - `POST /api/teams` - créer une équipe
  - `PUT /api/teams/:id` - modifier une équipe
  - `DELETE /api/teams/:id` - supprimer une équipe
  - `POST /api/teams/:teamId/pokemons` - ajouter un pokémon
  - `DELETE /api/teams/:teamId/pokemons/:pokemonId` - retirer un pokémon

## Base de Données
- Format : **snake_case** pour tables et colonnes
- Exemples :
  - `user_id`
  - `pokemon_team`
  - `created_at`
  - `updated_at`

## Commits Git
- Format : **type(scope): message**
- Types : `feat`, `fix`, `refactor`, `docs`, `test`
- Exemples :
  - `feat(teams): add team routes`
  - `fix(validation): improve password validation`
  - `refactor(controllers): extract team logic to service`
  - `docs: update naming charter`

## Branches Git
- Format : **type/feature-name** (kebab-case)
- Exemples :
  - `feat/team-crud`
  - `fix/pokemon-validation`
  - `refactor/service-layer`

## Constantes
- Format : **UPPER_SNAKE_CASE**
- Exemples :
  - `MAX_POKEMON_PER_TEAM = 6`
  - `MIN_PASSWORD_LENGTH = 8`
  - `API_VERSION = 'v1'`

## Résumé des formats
| Élément | Format | Exemple |
|---------|--------|---------|
| Variable | camelCase | `userEmail` |
| Fonction | camelCase | `getUserTeams()` |
| Classe | PascalCase | `TeamController` |
| Fichier | camelCase | `teamService.js` |
| Route | /api/resource | `/api/teams` |
| BD - table | snake_case | `pokemon_team` |
| BD - colonne | snake_case | `created_at` |
| Constante | UPPER_SNAKE_CASE | `MAX_POKEMON_PER_TEAM` |
| Commit | type(scope): msg | `feat(teams): add routes` |
| Branche | type/name | `feat/team-crud` |
