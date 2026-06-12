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

// A retirer, on ne doit pas pouvoir créer un Pokémon dans l'état actuel
router.post('/', (req, res) => {
  PokemonController.createPokemon(req.body)
    .then(newPokemon => {
      res.status(201).json(newPokemon);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});


// Non utile car on ne doit pas pouvoir modifier les caractéristiques d'un Pokemon
router.put('/:id', (req, res) => {
  PokemonController.updatePokemon(req.params.id, req.body)
    .then(updatedPokemon => {
      res.json(updatedPokemon);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// A retirer, on ne doit pas pouvoir supprimer un Pokémon, à moins d'avoir une fonctionnalité ultérieure qui permettrait de faire ses Pokémons custom et les supprimer
router.delete('/:id', (req, res) => {
  PokemonController.deletePokemon(req.params.id)
    .then(() => {
      res.json({ message: 'Pokemon deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// POST /api/pokemons/:pokemonId/teams/:teamId - Ajouter un pokémon à une équipe
router.post('/:pokemonId/teams/:teamId', (req, res) => {
  const { pokemonId, teamId } = req.params;
  PokemonController.addPokemonToTeam(teamId, pokemonId)
    .then(() => {
      res.json({ message: 'Pokemon added to team successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
}); 

// DELETE /api/pokemons/:pokemonId/teams/:teamId - Retirer un pokémon d'une équipe
router.delete('/:pokemonId/teams/:teamId', (req, res) => {
  const { pokemonId, teamId } = req.params;
  PokemonController.removePokemonFromTeam(teamId, pokemonId)
    .then(() => {
      res.json({ message: 'Pokemon removed from team successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

export default router;
