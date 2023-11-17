# bookstore-backend

## Overview

The Bookstore API is an interactive collection of The New York Times bestseller books that allows anyone to browse the collection. A user can also sign up for an account and log in to add, edit, or delete a book from there library. A user can also choose to purchase a book from a selection of buying options.

## Routes

NOTE: Have a JSON viewer extension installed on your browser to display/"pretty" the large datasets in your browser.

### Base URL

```javascript
https://ga-bookstore-8724ed2991a2.herokuapp.com/api

```

### Endpoints

```javasript
("/users", usersRoutes);
("/books", booksRoutes);
("/libraries", librariesRoutes);
```

### CRUD

#### "/books"

```javascript
GET "/" Returns a liss of all New York Times best selling books
GET "/:id" Returns a single book object by objectID
POST "/" Creates a new book object
PUT "/:id" Updates an existing book object
DELETE "/:id" Deletes a book object by objectID.
```

#### "/users"

```javascript
POST "/sign-up" Creates a new user
POST "/sign-in" Creates a new token upon sign-in
GET "/verify" Returns a verified user back to all books page
```

#### "/libraries"

```javascript
GET "/:userId" Returns the user library page
POST "/:userId/book/:bookId" Adds a book to the user library
PUT "/:userId/book/:bookId" Updates an existing book object in the user library
PUT "/:libraryId/bookReview/:bookReviewId" Removes book from user library
PUT "/:libraryId/bookReviewEdit/:bookReviewId" Edits user library
```

## Schema

### Book Schema:

```javascript
const Schema = mongoose.Schema;

let BookSchema = new Schema({
  title: { type: String },
  author: { type: String },
  book_image: { type: String },
  publisher: { type: String },
  description: { type: String },
  buy_links: [
    {
      name: { type: String },
      url: { type: String },
    },
  ],
  rank: { type: Number },
  weeks_on_list: { type: Number },
  display_name: { type: String },
});

export default mongoose.model("books", BookSchema);
```

### User Schema:

```javascript
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password_digest: { type: String, required: true, select: false },
});

export default mongoose.model("users", UserSchema);
```

### Library Schema:

```javascript
const Schema = mongoose.Schema;

let LibrarySchema = new Schema({
  books: [
    {
      book: { type: Schema.Types.ObjectId, ref: "books" },
      stars: { type: Number, min: 1, max: 5 },
      comment: { type: String },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "users" },
});

export default mongoose.model("libraries", LibrarySchema);
```

## Example Data

```javascript
[
  {
    "_id": "655668c407f62b913b6cb172",
    "title": "DIRTY THIRTY",
    "author": "Janet Evanovich",
    "book_image": "https://storage.googleapis.com/du-prd/books/images/9781668003091.jpg",
    "publisher": "Atria",
    "description": "The 30th book in the Stephanie Plum series. Plum tracks a local jeweler’s former security guard and has an overnight stakeout with relatives.",
    "buy_links": [
      {
        "name": "Amazon",
        "url": "https://www.amazon.com/dp/1668003090?tag=NYTBSREV-20",
        "_id": "655668c407f62b913b6cb173"
      },
      {
        "name": "Apple Books",
        "url": "https://goto.applebooks.apple/9781668003121?at=10lIEQ",
        "_id": "655668c407f62b913b6cb174"
      },
      {
        "name": "Barnes and Noble",
        "url": "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9781668003121",
        "_id": "655668c407f62b913b6cb175"
      },
      {
        "name": "Books-A-Million",
        "url": "https://www.anrdoezrs.net/click-7990613-35140?url=https%3A%2F%2Fwww.booksamillion.com%2Fp%2FDIRTY%2BTHIRTY%2FJanet%2BEvanovich%2F9781668003121",
        "_id": "655668c407f62b913b6cb176"
      },
      {
        "name": "Bookshop",
        "url": "https://bookshop.org/a/3546/9781668003121",
        "_id": "655668c407f62b913b6cb177"
      },
      {
        "name": "IndieBound",
        "url": "https://www.indiebound.org/book/9781668003121?aff=NYT",
        "_id": "655668c407f62b913b6cb178"
      }
    ],
    "rank": 1,
    "weeks_on_list": 1,
    "display_name": "Combined Print & E-Book Fiction",
    "__v": 0
  },
```

## Disclaimer

This API is created for educational purposes and does not claim official affiliation or endorsement by The New York Times

## Contact

For any questions or concerns, please [open an issue](https://github.com/pondern/bookstore-backend/issues) in this repository.
