# LitCritique — Book Review App

A full-stack MEN application where users can log in, add book reviews, browse everyone's reviews, and leave reading notes on any book.

---

## User stories

- As a **guest**, I want to sign up for an account so that I can start reviewing books.
- As a **guest**, I want to log in so that I can access my account.
- As a **logged-in user**, I want to see a list of all book reviews from every user so that I can discover new books.
- As a **logged-in user**, I want to search/filter books by title, author, genre, or status so that I can quickly find the review I'm looking for.
- As a **logged-in user**, I want to add a new book review, including a cover image, so that I can share my thoughts.
- As a **logged-in user**, I want to edit or delete only my own book reviews so that I stay in control of my own content.
- As a **logged-in user**, I want to add a reading note to any book so that I can share a thought at a specific page.
- As a **logged-in user**, I want to delete only the notes I personally wrote so that others' notes stay intact.
- As a **logged-in user**, I want to log out so that my session ends securely.

---

## ERD (Entity Relationship Diagram)

![ERD](assets/LitCritique.png)

- **User → Book**: one-to-many, referenced. Each book stores a `user` field (foreign key) pointing to its owner.
- **Book → Note**: one-to-many, embedded. Notes are stored directly inside each book's `notes` array.
- **User → Note**: one-to-many, referenced. Each embedded note stores its own `user` field, since any logged-in user can add a note to any book.

---

## Wireframes

![Wireframes](assets/wireFrames.png)

Pages included:
1. Landing page
2. Login
3. Sign up
4. Books index (home) — navbar includes a **Search** link alongside Home, Favorites, and Add
5. Search / filter books — accessed from the Search link in the navbar; filters the books index by title, author, genre, or status via query string
6. Add a book (new)
7. Edit a book
8. Book detail / review (show)
9. Favorites

---

## RESTful routes

### Auth routes

| HTTP method | Path | Purpose |
|---|---|---|
| GET | `/auth/sign-up` | Render sign-up form |
| POST | `/auth/sign-up` | Create a new user |
| GET | `/auth/sign-in` | Render login form |
| POST | `/auth/sign-in` | Log in a user |
| POST | `/auth/sign-out` | Log out the current user |

### Book routes

| HTTP method | Path | CRUD | Purpose |
|---|---|---|---|
| GET | `/books` | index | Show all books from all users |
| GET | `/books?q=&status=&genre=` | index (filtered) | Search/filter books by title, author, genre, or status (query string, same controller as index; reached via the navbar Search link) |
| GET | `/books/new` | new | Render form to add a book |
| POST | `/books` | create | Create a new book (owner = current user) |
| GET | `/books/:bookId` | show | Show a single book's details, review, and notes |
| GET | `/books/:bookId/edit` | edit | Render edit form (owner only) |
| PUT | `/books/:bookId` | update | Update a book (owner only) |
| DELETE | `/books/:bookId` | delete | Delete a book (owner only) |

### Note routes (nested under Book)

| HTTP method | Path | CRUD | Purpose |
|---|---|---|---|
| POST | `/books/:bookId/notes` | create | Add a note to a book (any logged-in user) |
| DELETE | `/books/:bookId/notes/:noteId` | delete | Delete a note (author only) |

---
