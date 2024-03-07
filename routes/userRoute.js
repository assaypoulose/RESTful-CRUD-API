import express from "express";
// Import both 'fetch' and 'create' from the userController
import { fetch, create, update, deleteUser } from "../controller/userController.js";

const router = express.Router();

// Setup routes
router.get("/getallusers", fetch);
router.post("/create", create);
router.put("/update/:id",update);
router.delete("/delete/:id",deleteUser);

export default router;
