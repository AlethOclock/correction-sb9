import "dotenv/config";
import { Sequelize } from "sequelize";

// Configuration pour Docker ou développement local
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'postgres',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'js4life',
    dialect: 'postgres'
};

export const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    define: {
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscored: true,
    },
    logging: false
});

await sequelize.authenticate();
export default sequelize;