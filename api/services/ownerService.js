export class ownerService {
    /**
     * Vérifie si le user est le propriétaire de la team
     * @param {number} userId - L'ID de l'utilisateur
     * @param {number} teamId - L'ID de la team
     * @returns {Promise<boolean>} true si l'utilisateur est le propriétaire, false sinon   
     * */
    static async isOwner(userId, teamId) {
        try {
            const team = await Team.findByPk(teamId);
            if (!team) {
                throw new Error('Team not found');
            }
            return team.owner_id === userId;
        } catch (error) {
            console.error('Error checking ownership:', error);
            throw error;
        }
    }
}

export default ownerService;

