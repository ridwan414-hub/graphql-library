import { PropTypes } from "prop-types";
import { useState } from "react";
import { ALL_AUTHORS, CREATE_BOOK } from "../queries";
import { useMutation } from "@apollo/client";
import { updateBooksCache } from "../utils/updateCache";
import {
  FaBook,
  FaUser,
  FaCalendar,
  FaTags,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const BookFormModal = ({ setError, closeModal }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    update: async (cache, response) => {
      const addedBook = response.data.bookAdded;
      updateBooksCache(cache, addedBook);
    },
  });
  const submit = async (event) => {
    event.preventDefault();
    createBook({
      variables: { title, author, published: parseInt(published), genres },
    });
    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
    closeModal();
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-xl w-full"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <FaTimes size={24} />
          </button>
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Add New Book
          </h2>
          <form onSubmit={submit} className="space-y-6">
            <InputField
              icon={<FaBook className="text-blue-500" />}
              id="title"
              label="Title"
              value={title}
              onChange={setTitle}
            />
            <InputField
              icon={<FaUser className="text-blue-500" />}
              id="author"
              label="Author"
              value={author}
              onChange={setAuthor}
            />
            <InputField
              icon={<FaCalendar className="text-blue-500" />}
              id="published"
              label="Published"
              value={published}
              onChange={setPublished}
              type="number"
            />
            <div className="flex space-x-2">
              <InputField
                icon={<FaTags className="text-blue-500" />}
                id="genre"
                label="Genre"
                value={genre}
                onChange={setGenre}
              />
              <button
                onClick={addGenre}
                type="button"
                className="self-end bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
              >
                <FaPlus className="mr-2" /> Add
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mt-2"
            >
              {genres.map((g, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {g}
                </motion.span>
              ))}
            </motion.div>

            <div className="flex items-center justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Create Book
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeModal}
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const InputField = ({ icon, id, label, value, onChange, type = "text" }) => (
  <div className="relative">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={({ target }) => onChange(target.value)}
      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 transition-all duration-200"
    />
  </div>
);

InputField.propTypes = {
  icon: PropTypes.element,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

BookFormModal.propTypes = {
  setError: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default BookFormModal;
