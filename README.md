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

### Install Next.js:

```bash
npx create-next-app@latext
```

### Navigate to the frontend folder

```bash
cd frontend-nextjs
```

### Run

```bash
npm i
```

to install  all dependencies.

### Start the frontend:
```bash
npm run dev
```

Now, open a new terminal and navigate to the backend folder:

```bash
cd ../backend-nodejs
```

### Install dependencies:

```bash
npm i
```

### Start the backend

```bash
node index.js
```

The application should now be running on your local machine.
