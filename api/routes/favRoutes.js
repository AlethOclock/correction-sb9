import Router from "express";
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

// POST /api/favorites - Ajouter un favori
router.post('/', (req, res) => {
  FavController.addFavorite(req.body)
    .then(newFavorite => {
      res.status(201).json(newFavorite);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// DELETE /api/favorites/:id - Supprimer un favori par ID
router.delete('/:id', (req, res) => {
  FavController.removeFavorite(req.params.id)
    .then(() => {
      res.json({ message: 'Favorite removed successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });       
});