import AuthController from '../controllers/authController.js';
import { jest } from '@jest/globals';

// Mock du modèle User utilisé pour le test
const mockCreate = jest.fn();
jest.unstable_mockModule('../models/User.js', () => ({
    User: {
        create: mockCreate
    }
}));

// Helper pour construire une erreur Sequelize-like
function makeValidationError(messages) {
    const err = new Error('Validation error');
    err.name = 'SequelizeValidationError';
    err.errors = messages.map(m => ({ message: m }));
    return err;
}
function makeUniqueError(message) {
    const err = new Error('Unique constraint error');
    err.name = 'SequelizeUniqueConstraintError';
    err.errors = [{ message }];
    return err;
}

describe('AuthController.register', () => {
    beforeEach(() => {
        mockCreate.mockReset();
    });

    test('succès avec données valides', async () => {
        mockCreate.mockResolvedValue({ id: 1, username: 'alice' });
        const user = await AuthController.register({ username: 'alice', password: 'Passw0rdA' });
        expect(user).toHaveProperty('id', 1);
        expect(user.username).toBe('alice');
    });

    test('erreur : username déjà existant', async () => {
        mockCreate.mockRejectedValue(makeUniqueError('username must be unique'));
        await expect(AuthController.register({ username: 'bob', password: 'Passw0rdB' }))
            .rejects.toMatchObject({ message: 'Unique constraint error', status: 400 });
    });

    test('erreur : username invalide / contrainte validation', async () => {
        mockCreate.mockRejectedValue(makeValidationError(['Username length must be between 3 and 20']));
        await expect(AuthController.register({ username: 'x', password: 'Passw0rdC' }))
            .rejects.toMatchObject({ message: 'Validation error', status: 400 });
    });
});