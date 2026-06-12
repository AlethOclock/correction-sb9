import fs from 'fs';
import path from 'path';
import { sequelize } from '../models/sequelizeClient.js';

export async function seedDatabase() {
    try {
        // Lire et exécuter le fichier SQL de création des tables
        const createTablesSQL = fs.readFileSync(
            path.join(process.cwd(), 'sql/create_tables.sql'), 
            'utf8'
        );
        await sequelize.query(createTablesSQL);

         // Ajouter les colonnes timestamps
        await sequelize.query(`
            ALTER TABLE "pokemon" ADD COLUMN IF NOT EXISTS "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
            ALTER TABLE "pokemon" ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
            ALTER TABLE "type" ADD COLUMN IF NOT EXISTS "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
            ALTER TABLE "type" ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
            ALTER TABLE "team" ADD COLUMN IF NOT EXISTS "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
            ALTER TABLE "team" ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
            ALTER TABLE "team" ADD COLUMN IF NOT EXISTS "user_id" INT REFERENCES "user"("id");
            ALTER TABLE "pokemon_type" ADD COLUMN IF NOT EXISTS "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
            ALTER TABLE "pokemon_type" ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
            ALTER TABLE "team_pokemon" ADD COLUMN IF NOT EXISTS "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
            ALTER TABLE "team_pokemon" ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
        `);


        // Lire et exécuter le fichier SQL de seeding
        const seedingSQL = fs.readFileSync(
            path.join(process.cwd(), 'sql/seed_tables.sql'), 
            'utf8'
        );
        await sequelize.query(seedingSQL);

        console.log('Database seeded successfully from SQL files!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase(); // Appel de la fonction pour initialiser la base de données