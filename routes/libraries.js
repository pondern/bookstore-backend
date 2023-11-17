import { Router } from "express";
import * as controllers from "../controllers/libraries.js";

const router = Router();

router.get("/:userId", controllers.getUserLibrary);
router.post("/:userId/book/:bookId", controllers.addBookToLibrary);
router.put("/:libraryId/bookReview/:bookReviewId",controllers.removeBookFromLibrary);
router.put("/:libraryId/bookReviewEdit/:bookReviewId",controllers.editBookInLibrary);

export default router;
