import { Router } from "express";
import * as controllers from "../controllers/libraries.js";

const router = Router();

router.get("/:userId", controllers.getUserLibrary);
router.post("/:userId/book/:bookId", controllers.addBookToLibrary);
router.delete("/:libraryId", controllers.deleteLibrary); // New route for deleting a library
router.get("/", controllers.getAllLibraries); // New route for getting all libraries
router.put(
  "/:libraryId/bookReview/:bookReviewId",
  controllers.removeBookFromLibrary
);
router.put(
  "/:libraryId/bookReviewEdit/:bookReviewId",
  controllers.editBookInLibrary
);

export default router;
