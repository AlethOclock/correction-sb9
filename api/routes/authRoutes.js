import { Router } from "express";
import AuthController from '../controllers/authController.js';

const router = Router();

/**
 * AUTH ROUTES
 * Gère tous les endpoints relatifs à l'authentification
 */

// POST /api/auth/register - Inscription d'un nouvel utilisateur
router.post('/register', (req, res) => {
  AuthController.register(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// POST /api/auth/login - Connexion d'un utilisateur
router.post('/login', (req, res) => {
  AuthController.login(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});
 // POST /api/auth/logout - Déconnexion d'un utilisateur
router.post('/logout', (req, res) => {
  AuthController.logout()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});


// ! Pour administration, à sécuriser
router.get('/', (req, res) => {
AuthController.getAllUsers()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// DELETE /api/auth/:id - Suppression d'un utilisateur
router.delete('/:id', (req, res) => {
  AuthController.deleteUser(req.params.id)
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});
export default router;  