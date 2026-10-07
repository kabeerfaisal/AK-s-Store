# AK's Store

AK's Store is a full-stack e-commerce project with a React storefront and an Express API. The client provides product browsing, user registration and login, a shopping cart, and admin-facing pages. The server provides authentication endpoints backed by MongoDB.

## Project structure

```text
client/   React 19 and Vite storefront
server/   Express API and MongoDB models
```

## Requirements

- Node.js 20.19 or newer
- npm
- MongoDB, running locally or available through a connection URI

Install dependencies separately in each application; there is no root-level npm workspace.

## Configure the environment

### Client

Create `client/.env` from `client/.env.example`. The example configures the Fake Store API for product data and the local server API for authentication:

```env
VITE_API_BASE_URL=https://example.com
VITE_backend_url=http://example:port/abc
```

The product API URL should be the base URL before `/products`. The backend URL should end in `/api`.

### Server

Create `server/.env` with your local settings:

```env
PORT=5000
MONGO_URI=mongodb://ipAddress/db_Name
JWT_SECRET=replace-with-a-long-random-secret
```

The server defaults to port `3000` if `PORT` is not set. Use a private, strong `JWT_SECRET` and never commit either `.env` file or real credentials.

## Install and run

Open two terminals from the repository root.

In the first terminal, install and start the API:

```bash
cd server
npm install
npm run dev
```

In the second terminal, install and start the client:

```bash
cd client
npm install
npm run dev
```

Vite prints the client URL in its terminal output. The API listens on the port configured in `server/.env`; with the example above, it is `http://localhost:5000`.

## Available scripts

### Client

Run these from `client/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the client for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

### Server

Run these from `server/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API with Nodemon |
| `npm start` | Start the API with Node.js |

## API

The server currently exposes:

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/get` | Basic server health response |
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Log in and receive a JWT |

Registration expects `name`, `email`, `password`, and `age`. Login expects `email` and `password`. The client calls the authentication routes using `VITE_backend_url` and loads products from the API configured by `VITE_API_BASE_URL`.

## Client routes

| Route | Description |
| --- | --- |
| `/` | Store home |
| `/shop` | Product catalogue |
| `/shop/product-detail/:id` | Product details |
| `/login` | User login |
| `/register` | User registration |
| `/about` | About page |
| `/contact` | Contact page |
| `/admin` | Admin dashboard |
| `/admin/products` | Admin product page |

Storefront pages require login. Admin pages use a separate admin route guard.

## Authentication note

The server hashes passwords and issues JWTs, but the project is still under development. Do not treat it as production-ready authentication without reviewing authorization, token handling, validation, and deployment security.
