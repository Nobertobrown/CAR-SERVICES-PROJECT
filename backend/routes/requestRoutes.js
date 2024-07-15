// routes/requestRoutes.js
import express from 'express';
import verifyJWT from '../middleware/verifyJWT.js';
import Request from '../models/request.js';

const router = express.Router();

router.post('/create', verifyJWT, async (req, res) => {
  const { mechanicId, message, user } = req.body;

  try {
    const newRequest = await Request.create({
      userName: user.name,
      userNo: user.phoneNo,
      mechanicId,
      message
    });
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
