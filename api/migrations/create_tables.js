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

        // Réinitialiser les séquences à partir du dernier ID de chaque table
        await sequelize.query(`
            SELECT setval(pg_get_serial_sequence('"pokemon"', 'id'), (SELECT MAX(id) FROM "pokemon") + 1);
            SELECT setval(pg_get_serial_sequence('"type"', 'id'), (SELECT MAX(id) FROM "type") + 1);
            SELECT setval(pg_get_serial_sequence('"team"', 'id'), (SELECT MAX(id) FROM "team") + 1);
            SELECT setval(pg_get_serial_sequence('"pokemon_type"', 'id'), (SELECT MAX(id) FROM "pokemon_type") + 1);
            SELECT setval(pg_get_serial_sequence('"team_pokemon"', 'id'), (SELECT MAX(id) FROM "team_pokemon") + 1);
            SELECT setval(pg_get_serial_sequence('"user"', 'id'), (SELECT MAX(id) FROM "user") + 1);
        `);

        console.log('Database seeded successfully from SQL files!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase(); // Appel de la fonction pour initialiser la base de données