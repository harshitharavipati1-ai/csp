# CropCycle

CropCycle is a crop-rotation awareness app with a React/Vite frontend and an Express/MongoDB API. It includes a searchable crop library, rotation planner, learning resources, quiz, feedback, and user/admin pages.

## Requirements

- Node.js 20 or newer
- npm
- MongoDB for persistent local data (optional for development; the API can use an in-memory MongoDB instance)

## Run locally

1. Install the backend dependencies:

   ```powershell
   cd server
   npm install
   Copy-Item .env.example .env
   ```

2. Edit `server/.env`. Set a long, unique `JWT_SECRET`. Set `MONGODB_URI` to your MongoDB connection string. To create an initial admin, set both `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

3. In the first terminal (still in `server`), start the API:

   ```powershell
   npm run dev
   ```

   The API listens on `http://localhost:5000`; its health endpoint is `http://localhost:5000/api/health`.

4. Open a second terminal at the project root and install/start the frontend:

   ```powershell
   cd client
   npm install
   npm run dev
   ```

   Open `http://localhost:5173`.

For a disposable demo dataset, set `SEED_DEMO_DATA=true` and provide `DEMO_FARMER_PASSWORD` in `server/.env`. Do not enable demo data in production.

## Production build

Build the frontend and start the API:

```powershell
cd client
npm install
npm run build
cd ..\server
npm install
npm start
```

The API serves the built frontend from `client/dist`. Production requires a reachable MongoDB configured with `MONGODB_URI`; it will not silently switch to temporary in-memory storage.

## Checks

- Frontend production build: `cd client; npm run build`
- Backend syntax check: `Get-ChildItem server -Recurse -Filter *.js | Where-Object { $_.FullName -notmatch '\\node_modules\\' } | ForEach-Object { node --check $_.FullName }`

There is currently no automated test script configured in either package.

## Project layout

- `client/` — React frontend, Vite configuration, and local crop images
- `server/` — Express API, MongoDB models, routes, and seed data

Keep local `.env` files and credentials out of source control. The checked-in `server/.env.example` contains placeholders only.
