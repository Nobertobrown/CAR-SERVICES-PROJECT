import express from "express";
import {
  getUsers,
  addUser,
  loginUser,
  getMechanics,
  getRequests,
  putMechanic,
  putRequest,
  deleteRequest,
} from "../controllers/userController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

// Route to get all users (protected route)
router.get("/users", verifyJWT, getUsers);

// Route to add a new user (signup)
router.post("/signup", addUser);

// Route to login a user
router.post("/login", loginUser);

// Route to get all mechanics (protected route)
router.get("/mechanics", verifyJWT, getMechanics);

// Route to update mechanic (protected route)
router.put("/mechanics", verifyJWT, putMechanic);

// Route to handle requests for specific mechanic
router
  .route("/requests/:id")
  .get(verifyJWT, getRequests)
  .put(verifyJWT, putRequest)
  .delete(verifyJWT, deleteRequest);

export default router;
