import { Router } from 'express';
import * as controllers from "../controllers/users.js";

const router = Router();

router.post("/sign-up", controllers.signUp);
router.post("/sign-in", controllers.signIn);
router.get("/verify", controllers.verify);
router.delete('/:id', controllers.deleteUser);

export default router;
