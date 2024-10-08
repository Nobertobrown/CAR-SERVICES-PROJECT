import { Sequelize } from 'sequelize';

// Initialize SQLite connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './backend/utils/database.sqlite',
  logging: false
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
