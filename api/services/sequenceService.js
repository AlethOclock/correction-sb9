import { sequelize } from '../models/sequelizeClient.js';

export class SequenceService {
  /**
   * Récupère le prochain ID disponible pour une table (MAX(id) + 1)
   * @param {string} tableName - Le nom de la table (avec guillemets si nécessaire)
   * @returns {Promise<number>} Le prochain ID à utiliser
   */
  static async getNextId(tableName) {
    try {
      const result = await sequelize.query(
        `SELECT COALESCE(MAX(id), 0) + 1 as next_id FROM ${tableName}`,
        { type: sequelize.QueryTypes.SELECT }
      );
      return result[0].next_id;
    } catch (error) {
      console.error(`Error getting next ID for ${tableName}:`, error);
      throw error;
    }
  }
}

export default SequenceService;
