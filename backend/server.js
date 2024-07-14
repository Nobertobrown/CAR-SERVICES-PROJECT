import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import sequelize from './config/db.js';
import jwt from 'jsonwebtoken';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv to load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Log the JWT_SECRET to check if it's being loaded
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle favicon.ico request
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Routes
app.use('/api', userRoutes);
app.use('/auth', authRoutes);
app.use('/requests', requestRoutes); // Add the new request routes

// Middleware to verify JWT
const verifyJWT = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Failed to authenticate token:', err);
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    req.userRole = decoded.userType; // Adjusted to match user role in JWT payload
    next();
  });
};

// Apply verifyJWT middleware to all routes under /api (except /auth/login and /auth/signup)
app.use('/api', (req, res, next) => {
  if (req.path === '/login' || req.path === '/signup') {
    return next(); // Skip authentication for login and signup routes
  }
  verifyJWT(req, res, next); // Apply verifyJWT middleware to other routes
});

// Error handling middleware
app.use((err, req, res) => {
  console.error('Error:', err);
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Catch-all route handler: serve React's index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Initialize database and start the server
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
})();
