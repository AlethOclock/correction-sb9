import { Router } from "express";
// À implémenter plus tard
// import AuthController from '../controllers/authController.js';

const router = Router();

/**
 * AUTH ROUTES
 * Gère tous les endpoints relatifs à l'authentification
 */

// POST /api/auth/register - Inscription d'un nouvel utilisateur
router.post('/register', (req, res) => {
  // À implémenter : AuthController.register()
  res.json({ message: 'POST register - À implémenter' });
});

// POST /api/auth/login - Connexion d'un utilisateur
router.post('/login', (req, res) => {
  // À implémenter : AuthController.login()
  res.json({ message: 'POST login - À implémenter' });
});

export default router;  