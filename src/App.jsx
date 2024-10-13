import { useEffect, useState } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, AUTHOR_EDITED, BOOK_ADDED } from "./queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import Notify from "./components/Notify";
import LoadingSpinner from "./components/LoadingSpinner";
import {
  FaBook,
  FaUser,
  FaPlus,
  FaStar,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { updateBooksCache, updateAuthorsCache } from "./utils/updateCache";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const App = () => {
  const [page, setPage] = useState("books");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const client = useApolloClient();
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      setSuccessMessage(`${addedBook.title} added`);
      updateBooksCache(client.cache, addedBook);
    },
  });
  useSubscription(AUTHOR_EDITED, {
    onData: ({ data, client }) => {
      const editedAuthor = data.data.authorEdited;
      setSuccessMessage(`${editedAuthor.name}'s birth year edited`);
      updateAuthorsCache(client.cache, editedAuthor);
    },
  });

  useEffect(() => {
    const localKey = localStorage.getItem("library-user-token");
    localKey && setToken(localKey);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("books");
  };

  if (authors.loading || books.loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <Notify
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          successMessage={successMessage}
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center space-x-4 my-8"
        >
          <NavButton
            icon={<FaUser />}
            label="Authors"
            page="authors"
            currentPage={page}
            setPage={setPage}
          />
          <NavButton
            icon={<FaBook />}
            label="Books"
            page="books"
            currentPage={page}
            setPage={setPage}
          />
          {token ? (
            <>
              <NavButton
                icon={<FaPlus />}
                label="Add Book"
                onClick={() => setIsModalOpen(true)}
              />
              <NavButton
                icon={<FaStar />}
                label="Recommend"
                page="recommend"
                currentPage={page}
                setPage={setPage}
              />
              <NavButton
                icon={<FaSignOutAlt />}
                label="Logout"
                onClick={logout}
                className="bg-red-500 hover:bg-red-600"
              />
            </>
          ) : (
            <NavButton
              icon={<FaSignInAlt />}
              label="Log In"
              page="login"
              currentPage={page}
              setPage={setPage}
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Authors
            authors={authors.data.allAuthors}
            show={page === "authors"}
            setError={setErrorMessage}
          />

          <Books books={books.data.allBooks} show={page === "books"} />
          <NewBook
            setError={setErrorMessage}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
          <Recommend show={page === "recommend"} books={books.data.allBooks} />
          <LoginForm
            setToken={setToken}
            setPage={setPage}
            setError={setErrorMessage}
            show={page === "login"}
          />
        </motion.div>
      </div>
    </div>
  );
};

const NavButton = ({
  icon,
  label,
  page,
  currentPage,
  setPage,
  onClick,
  className,
}) => {
  const baseClass =
    "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ease-in-out";
  const activeClass = "bg-blue-500 text-white shadow-lg";
  const inactiveClass = "bg-white text-blue-500 hover:bg-blue-100";

  const buttonClass =
    page === currentPage
      ? `${baseClass} ${activeClass}`
      : `${baseClass} ${inactiveClass} ${className || ""}`;

  return (
    <button
      className={buttonClass}
      onClick={() => (onClick ? onClick() : setPage(page))}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

NavButton.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  currentPage: PropTypes.string,
  setPage: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default App;
