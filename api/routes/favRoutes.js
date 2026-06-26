import { Router } from "express";
import FavController from "../controllers/favController.js";

const router = Router();

/**
 * FAVORIS ROUTES
 * Gère tous les endpoints relatifs aux favoris
 */

// GET /api/favorites - Récupérer tous les favoris de tous les membres pour un classement
router.get('/', (req, res) => {
  FavController.getAllFavorites()
    .then(favorites => {
      res.json(favorites);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});
 // GET /api/favorites/:userId - Récupérer les favoris d'un utilisateur spécifique
router.get('/:userId', (req, res) => {
  FavController.getMyFavorites(req.params.userId)
    .then(favorites => {
      res.json(favorites);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// POST /api/favorites/:id - Ajouter un favori
router.post('/:id', (req, res) => {
  FavController.addFavorite(req.params.id, req.user.id)
    .then(newFavorite => {
      res.status(201).json(newFavorite);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// DELETE /api/favorites/:id - Supprimer un favori par ID
router.delete('/:id', (req, res) => {
  FavController.removeFavorite(req.params.id, req.user.id)
    .then(() => {
      res.json({ message: 'Favorite removed successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });       
});

// GET /api/favorites/pokemon/:id - Récupérer le nombre de mise en favori d'un Pokémon
router.get('/pokemon/:id', (req, res) => {
  FavController.getFavoriteCount(req.params.id)
    .then(count => {
      res.json({ count });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});
export default router;  