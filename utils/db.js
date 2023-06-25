import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config({ path: './config/.env' });

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
(async () => {
  try {
    await db.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default db;
