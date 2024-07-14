import { randomBytes } from 'crypto';

// Generate a secure random string for JWT_SECRET
const jwtSecret = randomBytes(32).toString('hex');
console.log('Generated JWT secret:', jwtSecret);
