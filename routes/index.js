import { Router } from "express";
import usersRoutes from "./users.js";
import booksRoutes from "./books.js";

const router = Router();

router.get("/", (req, res) => res.send("This is the api root"));

router.use("/users", usersRoutes);
router.use("/books", booksRoutes);

export default router;
