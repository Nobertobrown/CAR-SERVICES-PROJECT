import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if the Authorization header is present
  if (!authHeader) {
    console.error('Authorization header missing');
    return res.status(403).json({ error: 'No token provided' });
  }

  // Split the authHeader to get the actual token
  const token = authHeader.split(' ')[1];

  // Log the token for debugging
  console.log('Token:', token);

  // Check if the token is present after splitting
  if (!token) {
    console.error('Token not found after splitting the Authorization header');
    return res.status(403).json({ error: 'Invalid token format' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Failed to authenticate token:', err.message);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token has expired' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
      } else {
        return res.status(500).json({ error: 'Failed to authenticate token' });
      }
    }

    // Log the decoded token for debugging
    console.log('Decoded token:', decoded);

    // Attach user information to the request object
    req.userId = decoded.id;
    req.userRole = decoded.userType; // Adjusted to match user role in JWT payload

    // Proceed to the next middleware or route handler
    next();
  });
};

export default verifyJWT;
