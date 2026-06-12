import express from "express";
import session from "express-session";
import TeamService from "../services/teamService.js";
import { User } from "../models/User.js";

export function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

export async function ensureOwner(req, res, next) {
  const teamId = req.params.teamId;
  const userId = req.session.userId;

if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    // Lazy import pour éviter l'import circulaire au niveau module
    const TeamServiceModule = await import('../services/teamService.js');
    const TeamService = TeamServiceModule.default || TeamServiceModule;
    
    // Si TeamService renvoie true, l'utilisateur est le propriétaire de l'équipe
    const owner = await TeamService.isOwner(teamId, userId);
    if (owner) return next();
    return res.status(403).json({ error: 'Forbidden' });
}
export async function attachUser(req, res, next) {
  try {
    if (req.session?.userId) {
      req.user = await User.findByPk(req.session.userId, { attributes: ['id','username'] });
    } else {
      req.user = null;
    }
    next();
  } catch (err) {
    next(err);
  }
}

export default { ensureAuthenticated, ensureOwner };