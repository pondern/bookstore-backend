import { Router } from "express";
import usersRoutes from "./users.js";
import booksRoutes from "./books.js";
import librariesRoutes from "./libraries.js";

const router = Router();

router.get("/", (req, res) => res.send("This is the api root"));

router.use("/users", usersRoutes);
router.use("/books", booksRoutes);
router.use("/libraries", librariesRoutes);

export default router;
