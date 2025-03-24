# Online Bookstore (Full-Stack App)

This project is a full-stack **Online Bookstore** application built with **React (frontend)** and **Node.js + Express + PostgreSQL (backend)**. The goal is to manage books, users, and orders seamlessly.

## 📂 Project Structure

```
📦 bookstore-project
├── 📂 frontend   # React App (Frontend)
├── 📂 backend    # Node.js + Express + PostgreSQL + Prisma (Backend)
└── 📄 README.md  # Documentation
```

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the repository**

Clone the repo:

```sh
git clone https://github.com/your-repo/bookstore.git
cd bookstore
```

### **2️⃣ Install dependencies**

#### Install backend dependencies

```sh
cd backend
yarn install  # or npm install
```

#### Install frontend dependencies

```sh
cd ../frontend
yarn install  # or npm install
```

---

## ▶️ Running the Project

## Node setup

Make sure you have node 18 running (maybe 20 works)
If you have nmv you can use
`nvm use` This will use the [.nvmrc](.nvmrc) with the version 18.20.5

### **Start Backend**

```sh
cd backend
docker-compose up -d  # Start PostgreSQL in Docker
yarn prisma:generate  # Generate Prisma Client
yarn prisma:migrate  # Run database migrations
yarb prisma:seed    # Seed database
yarn generate:routes  # Generate API routes from TSOA
yarn dev  # Start the backend
```

### **Start Frontend**

```sh
cd frontend
yarn generate:api-types:local
yarn start
```

---

## 🛠 API Endpoints

### **Books**

- `GET /api/books` - Fetch all books
- `POST /api/books` - Add a new book (TODO implementation)

---

## Swagger

`http://localhost:8080/api-docs/`

## 🏆 Technical Tasks

### **1️⃣ Backend Task (Express + Prisma + TSOA)**

- Implement an endpoint `POST /api/books` to add a new book.
- Ensure validation (title, author, price, stock).

### **2️⃣ Frontend Task (React + TypeScript)**

- Create a page to list all books.
- Fetch books from `/api/books` and display them in a grid.

### **3️⃣ Full-Stack Task**

- Implement a "Add Book" page with a form to add new books.
- Send data to the backend via `POST /api/books`.

### **4️⃣ Database Schema Expansion Task**

- Extend the **Prisma schema** to include a `Category` model for books.
- Modify `/api/books` to include category details.

### **5️⃣ Extra Enhancements**

- Add filtering & sorting to the book listing page.
- Implement pagination for books & orders.
- Generate API documentation automatically with Swagger.

---

## 📌 **TSOA & Type-Safe API Generation**

This project uses **TSOA** to automatically generate **TypeScript-based API routes & types**. This ensures that:

- Backend **routes** are auto-generated based on controllers.
- Frontend gets **accurate TypeScript types** from the backend.
- Swagger documentation is auto-generated from API definitions.

### **How it works:**

- API routes are defined in `backend/src/controllers/*Controller.ts`.
- Run `yarn generate:routes` to generate `backend/src/routes/routes.ts`.
- Run `yarn prisma:generate` to generate Prisma Client.
- Swagger documentation is available at `/api-docs`.

---

## 📌 **Type Safety in Frontend**

The frontend **imports API types from the backend**.
You need to use `yarn generate:api-types:local` with the server running

- The frontend uses these types to ensure API requests are correct.
- No need to manually define API response types in frontend!

This ensures that API calls like `fetchBooks()` in file [frontend/src/pages/Books.tsx](frontend/src/services/api.ts) are type-checked for:
✅ Correct request parameters
✅ Properly formatted responses
✅ Preventing API mismatches

---

## 🐞 Troubleshooting

### **1. Port 3000 Already in Use?**

Change the frontend port in `frontend/.env`:

```sh
PORT=3001
```

Then restart the server.

### **2. Kill Running Processes**

If something is running on port 3000 or 5000:

```sh
lsof -i :3000   # Find process using port 3000
kill -9 <PID>   # Replace <PID> with the process ID
```

### **3. Database Connection Issues?**

Ensure PostgreSQL is running and check your `DATABASE_URL` in `backend/.env`.

---

## 📜 License

This project is MIT licensed.

---

## 💡 Contributing

Feel free to fork this repository and submit pull requests!

---

## ✨ Credits

Developed by **Xavier Masleszkiewicz**.
