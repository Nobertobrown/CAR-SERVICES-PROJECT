import express from 'express';
import { getUsers, addUser, loginUser, getMechanics, getRequests } from '../controllers/userController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

// Route to get all users (protected route)
router.get('/users', verifyJWT, getUsers);

// Route to add a new user (signup)
router.post('/signup', addUser);

// Route to login a user
router.post('/login', loginUser);

// Route to get all mechanics (protected route)
router.get('/mechanics', verifyJWT, getMechanics);

// Route to get all requests (protected route)
router.get('/requests', verifyJWT, getRequests);

export default router;
