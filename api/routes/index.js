import { Router } from 'express';
import teamRoutes from './teamRoutes.js';
import pokemonRoutes from './pokemonRoutes.js';
import authRoutes from './authRoutes.js';

const router = Router();

/**
 * API Routes
 * Toutes les routes sont préfixées par /api dans app.js
 */

// Routes pour les équipes
router.use('/teams', teamRoutes);

// Routes pour les pokémons
router.use('/pokemons', pokemonRoutes);

// Routes pour l'authentification
router.use('/auth', authRoutes);

// Routes pour les favoris
// * on utilise l'import dynamique pour éviter les problèmes de dépendances circulaires et pour l'exemple
router.use('/favorites', (await import('./favRoutes.js')).default);

// Route de santé de l'API
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

export default router;
