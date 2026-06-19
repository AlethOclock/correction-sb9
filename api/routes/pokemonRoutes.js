import { Router } from 'express';
import PokemonController from '../controllers/pokemonController.js';

const router = Router();

/**
 * POKEMON ROUTES
 * Gère tous les endpoints relatifs aux pokémons
 */

// GET /api/pokemons - Récupérer tous les pokémons
router.get('/', (req, res) => {
  PokemonController.getAllPokemons()
    .then(pokemons => {
      res.json(pokemons);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Recherche par nom ou type de pokémon
// GET /api/pokemons/search?name=...&type=...
router.get('/search', (req, res) => {
  const { name, type } = req.query;
  PokemonController.searchPokemons(name, type)
    .then(pokemons => {
      res.json(pokemons);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// GET /api/pokemons/:id - Récupérer les détails d'un pokémon
router.get('/:id', (req, res) => {
  PokemonController.getPokemonById(req.params.id)
    .then(pokemon => {
      res.json(pokemon);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});



// Pour l'exemple mais à retirer, on ne doit pas pouvoir créer un Pokémon dans l'état actuel
// POST /api/pokemons - Créer un nouveau pokémon
router.post('/', (req, res) => {
  PokemonController.createPokemon(req.body)
    .then(newPokemon => {
      res.status(201).json(newPokemon);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});


// Pour l'exemple mais à retirer car on ne doit pas pouvoir modifier les caractéristiques d'un Pokemon
// PUT /api/pokemons/:id - Mettre à jour un pokémon
router.put('/:id', (req, res) => {
  PokemonController.updatePokemon(req.params.id, req.body)
    .then(updatedPokemon => {
      res.json(updatedPokemon);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Pour l'exemple mais à retirer, on ne doit pas pouvoir supprimer un Pokémon, à moins d'avoir une fonctionnalité ultérieure qui permettrait de faire ses Pokémons custom et les supprimer
// DELETE /api/pokemons/:id - Supprimer un pokémon
router.delete('/:id', (req, res) => {
  PokemonController.deletePokemon(req.params.id)
    .then(() => {
      res.json({ message: 'Pokemon deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});


export default router;
