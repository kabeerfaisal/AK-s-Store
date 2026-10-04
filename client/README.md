# AK'S STORE

AK'S STORE is a responsive e-commerce frontend built with React and Vite. It provides a product browsing experience with search, product details, login-protected pages, and a persistent shopping cart.

## Features

- Browse products loaded from the Fake Store API
- Search products by title or category
- View individual product details
- Add products to a shopping cart
- Increase, decrease, and remove cart items
- Persist cart contents with `localStorage`
- Client-side login and logout flow
- Protected About, Contact, and product detail routes
- Responsive navigation with a mobile menu
- Animated UI interactions using Framer Motion

## Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Home page | Public |
| `/shop` | Product catalogue | Public |
| `/login` | Login page | Public |
| `/about` | About page | Requires login |
| `/contact` | Contact page | Requires login |
| `/shop/product-detail/:id` | Product detail page | Requires login |

## Tech Stack

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS
- Framer Motion
- React Icons
- Oxlint

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

The same setting is available in `.env.example` as a starting point.

### Run the development server

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## API Configuration

Product data is fetched from the Fake Store API. The base URL is configured through `VITE_API_BASE_URL` and used by the API context in `src/hooks/ApiHook.jsx`.

Because this is a frontend application, Vite environment variables are included in the browser bundle. Do not put private API keys or other secrets in `.env` files used by this app.

## Project Structure

```text
src/
├── Components/   Reusable UI components such as the navbar, footer, and cart drawer
├── Config/       Application routing
├── hooks/        API, cart, and login context providers
├── Pages/        Home, shop, login, contact, about, and product detail pages
├── App.jsx       Application providers and router setup
└── main.jsx      React application entry point
```

## Current Authentication Note

The login flow is currently client-side and stores login state in `localStorage`. It is suitable for a frontend demonstration, but it does not provide production authentication or secure user accounts. A production release should connect this flow to a backend authentication service.
