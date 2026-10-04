# StudyForge — Frontend Web Application

Modern responsive single-page application built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.

## Features in Phase 1
- Fast Vite build setup with hot module replacement (HMR).
- Architectural dashboard displaying live connection status to backend.
- Typed API service layer via Axios with configurable API base URL.
- Configured dev proxy routing `/api` requests to Spring Boot (`http://localhost:8080`).

## Local Setup & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Access the application at `http://localhost:5173`.

### 3. Build & Typecheck
```bash
npm run build
```
Typecheck only:
```bash
npm run lint
```
