# Library Frontend

Hosted at: https://graphql-library-frontend.onrender.com

This project is a frontend application for a library management system built with React and Vite. It uses GraphQL for efficient data fetching and manipulation, and Apollo Client for state management and GraphQL integration.

## Project Structure

```
library-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Authors.jsx
│   │   ├── BirthYearForm.jsx
│   │   ├── BookFormModal.jsx
│   │   ├── Books.jsx
│   │   ├── LoginForm.jsx
│   │   ├── NewBook.jsx
│   │   ├── Notify.jsx
│   │   └── Recommend.jsx
│   ├── utils/
│   │   └── updateCache.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── queries.js
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Project Overview

This frontend application is designed to interact with a GraphQL API for managing a library system. It provides features for viewing books and authors, adding new books, editing author information, and user authentication.

### Key Components

1. **Authors**: Displays a list of authors and their information.
2. **Books**: Shows a list of books with filtering capabilities.
3. **NewBook**: Allows adding new books to the library.
4. **LoginForm**: Handles user authentication.
5. **Recommend**: Provides book recommendations based on user preferences.

## GraphQL Integration

This project uses GraphQL for several reasons:

1. **Efficient Data Fetching**: GraphQL allows the client to request only the data it needs, reducing over-fetching and under-fetching of data.

2. **Flexible Queries**: The frontend can request multiple resources in a single query, reducing the number of network requests.

3. **Real-time Updates**: The project uses GraphQL subscriptions for real-time updates when books are added or author information is edited.

4. **Type Safety**: GraphQL's strong typing system helps catch errors early in the development process.

5. **Simplified State Management**: Apollo Client, used in conjunction with GraphQL, helps manage the application state efficiently.

## Key GraphQL Features Used

1. **Queries**: For fetching data (e.g., list of books, authors).
2. **Mutations**: For modifying data (e.g., adding books, editing author information).
3. **Subscriptions**: For real-time updates.
4. **Fragments**: For reusable query parts (see `BOOK_DETAILS` and `AUTHOR_DETAILS` in `queries.js`).

## Setup and Running the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

Make sure to set up the corresponding GraphQL backend and update the GraphQL endpoint in the Apollo Client configuration (see `src/main.jsx`).

## Styling

This project uses Tailwind CSS for styling, providing a responsive and customizable design.

## Testing and Linting

ESLint is configured for code linting. Run `npm run lint` to check for linting issues.

## Building for Production

Run `npm run build` to create a production-ready build of the application.
