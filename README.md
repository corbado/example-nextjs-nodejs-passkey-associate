# Passkeys Integration Example with Next.js (Frontend) and Node.js (Backend)

This is a sample implementation of the passkey solution integrated into a web application built with Next.js (frontend)
and Node.js (backend).

## File structure

### Frontend (Next.js)

- `/frontend-nextjs/src/app/page.tsx`: Page with the login / home screen.
- `/frontend-nextjs/src/pages/profile.tsx`: Page with the profile screen after authentication.
- `/frontend-nextjs/src/declarations.d.ts`: page for the user profile information that is shown after successful authentication.

### Backend (Node.js)

- `/backend-nodejs/index.js`: main entry point for the backend server.

## Setup

### Prerequisites

Please follow the steps in [Getting started](https://docs.corbado.com/overview/getting-started) to create and configure
a project in the [Corbado developer panel](https://app.corbado.com/signin#register).

You need to have [Node](https://nodejs.org/en/download) and `npm` installed to run it. Also, you need to
install [Next.js](https://nextjs.org/learn/basics/create-nextjs-app) if you haven't done so.

## Usage


### Navigate to the frontend folder:

```bash
cd frontend-nextjs
```

### Create frontend .env file
Copy the `.env.example` file, rename it to `.env` and fill the values for `NEXT_PUBLIC_PROJECT_ID` with your Corbado project ID you obtained in [prerequisites](#prerequisites) and `NEXT_PUBLIC_API_BASE_URL` with the URL of your backend. The default value for this repository is `http://localhost:3001`.

### Run

```bash
npm i
```

to install  all dependencies.

### Start the frontend:
```bash
npm run dev
```
This starts the frontend on `PORT=3000`.

Now, open a new terminal and navigate to the backend folder:

```bash
cd ../backend-nodejs
```

### Create backend .env file
Copy the `.env.example` file, rename it to `.env` and fill the values for `PROJECT_ID` and `API_SECRET` with your Corbado project ID and API secret you obtained in [prerequisites](#prerequisites).

### Install dependencies:

```bash
npm i
```

### Start the backend:

```bash
node index.js
```

The application should now be running on your local machine, with your backend runngin on `PORT=3001`.
