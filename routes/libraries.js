import { Router } from "express";
import * as controllers from "../controllers/libraries.js";

const router = Router();

router.put("/:userId/book/:bookId", controllers.addBookToLibrary);

export default router;
