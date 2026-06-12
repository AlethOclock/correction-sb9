import { Router } from 'express';
import TeamController from '../controllers/teamController.js';

const router = Router();

/**
 * TEAMS ROUTES
 * Gère tous les endpoints relatifs aux équipes
 */

// GET /api/teams - Récupérer toutes les équipes
router.get('/', (req, res) => {
  TeamController.getAllTeams()
    .then(teams => {
      res.json(teams);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// GET /api/teams/:id - Récupérer les détails d'une équipe
router.get('/:id', (req, res) => {
  TeamController.getTeamById(req.params.id)
    .then(team => {
      res.json(team);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// POST /api/teams - Créer une nouvelle équipe
router.post('/', (req, res) => {
  TeamController.createTeam(req.body)
    .then(newTeam => {
      res.status(201).json(newTeam);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// PUT /api/teams/:id - Modifier une équipe
router.put('/:id', (req, res) => {
  TeamController.updateTeam(req.params.id, req.body)
    .then(updatedTeam => {
      res.json(updatedTeam);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// DELETE /api/teams/:id - Supprimer une équipe
router.delete('/:id', (req, res) => {
  TeamController.deleteTeam(req.params.id)
    .then(() => {
      res.json({ message: 'Team deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});


// POST /api/teams/:teamID/pokemons/:pokemonId - Ajouter un pokémon à une équipe
router.post('/:teamId/pokemons/:pokemonId', (req, res) => {
  const { pokemonId, teamId } = req.params;
  // Ajouter un test pour vérifier que le Pokémon n'est pas déjà dans l'équipe et qu'il n'y a pas déjà 6 Pokémons
  TeamController.addPokemonToTeam(teamId, pokemonId)
    .then(() => {
      res.json({ message: 'Pokemon added to team successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
}); 

// DELETE /api/teams/:teamId/pokemons/:pokemonId - Retirer un pokémon d'une équipe
router.delete('/:teamId/pokemons/:pokemonId', (req, res) => {
  const { pokemonId, teamId } = req.params;
  TeamController.removePokemonFromTeam(teamId, pokemonId)
    .then(() => {
      res.json({ message: 'Pokemon removed from team successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});


export default router;
