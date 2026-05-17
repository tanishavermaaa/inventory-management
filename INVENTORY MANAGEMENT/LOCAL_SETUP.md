Local development setup

Prerequisites
- Node.js LTS (use nvm recommended)
- Git (or download repo ZIP)
- MongoDB (atlas connection string or local MongoDB)

Quick start (clone)
```bash
git clone <repo-url> inventory-management
cd inventory-management
```

If you downloaded a ZIP: extract it and `cd` into the project folder.

Backend setup
1. Install Node and use LTS:
```bash
nvm install --lts
nvm use --lts
```
2. Configure backend environment: copy or create [backend/.env](backend/.env) with values:
```
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```
Use a local Mongo (`mongodb://localhost:27017/inventory_db`) or an Atlas URI. Never commit real secrets.
3. Install and run backend:
```bash
cd backend
npm install
# development with auto-reload
npm run dev
# or production start
npm start
```
The server will auto-run the seeder at startup (`backend/utils/seedData.js`).

Frontend setup
1. From the project root or a new terminal:
```bash
cd frontend
npm install
npm start
```
By default the React app runs on port 3000.

Verify
- Backend health: http://localhost:5000/api/health
- Frontend: http://localhost:3000

Notes & troubleshooting
- If you want to seed with a local DB, set `MONGODB_URI=mongodb://localhost:27017/inventory_db` in [backend/.env](backend/.env).
- CORS: set `CORS_ORIGIN` or `CLIENT_URL` in backend env if you change the client origin.
- Change `PORT` in [backend/.env](backend/.env) if 5000 is used.
- Logs: backend logs print to console. Frontend errors show in browser devtools.

Security
- Add `.env` to `.gitignore` and never commit credentials.

If you want, I can commit this file or update the root README.md instead.
