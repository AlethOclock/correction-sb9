import express from "express";
import session from "express-session";
import TeamService from "../services/teamService.js";
import { User } from "../models/User.js";
import teamController from "../controllers/teamController.js";

export function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

export async function ensureOwner(req, res, next) {
const teamId = req.params.id || req.params.teamId; // On récupère l'id de l'équipe à partir des paramètres de la requête
// On récupère l'id du propriétaire de l'équipe pour le comparer à l'id de l'utilisateur courant
const team = await teamController.getTeamById(teamId);
if (!team) return res.status(404).json({ error: 'Team not foundvd' });
  const userId = req.session.userId;

if (!userId) return res.status(401).json({ error: 'Unauthorized. This team does not belong to you.' });
    // Si l'Id du user courant est le même que l'id du propriétaire de l'équipe, c'est bon

    if (team.userId === parseInt(userId)) return next();     
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