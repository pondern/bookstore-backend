import { Router } from 'express';
import * as controllers from "../controllers/users.js";

const router = Router();

router.get("/", controllers.getUser);
router.get("/:title", controllers.getUser);
router.post("/", controllers.createUser);
router.put("/:title", controllers.updateUser);
router.delete("/:title", controllers.deleteUser);

export default router;
