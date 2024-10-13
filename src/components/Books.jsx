import { PropTypes } from "prop-types";
import { useState } from "react";
import { FaBook, FaUser, FaCalendar } from "react-icons/fa";
import { motion } from "framer-motion";

const Books = (props) => {
  const [filter, setFilter] = useState("all genres");
  if (!props.show) {
    return null;
  }

  const books = props.books;

  const allGenres = books.map((book) => book.genres).flat();
  const uniqueGenres = ["all genres", ...new Set(allGenres)];

  const filteredBooks = books.filter((book) =>
    filter === "all genres" ? true : book.genres.includes(filter)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto p-4"
    >
      <h2 className="text-3xl text-center font-bold mb-6 text-blue-800">
        Books
      </h2>
      <p className="mb-6 text-center text-lg">
        in genre <strong className="text-purple-600">{filter}</strong>
      </p>
      <div className="flex flex-col md:flex-row justify-center items-start gap-8">
        <div className="w-full md:w-3/4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">
                    <FaBook className="inline mr-2" /> Title
                  </th>
                  <th className="py-3 px-4 text-left">
                    <FaUser className="inline mr-2" /> Author
                  </th>
                  <th className="py-3 px-4 text-left">
                    <FaCalendar className="inline mr-2" /> Published
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <motion.tr
                    key={book.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-b hover:bg-blue-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-4">{book.title}</td>
                    <td className="py-3 px-4">{book.author.name}</td>
                    <td className="py-3 px-4">{book.published}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
        <div className="w-full md:w-1/4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white shadow-lg rounded-lg p-4"
          >
            <h3 className="text-xl font-semibold mb-4 text-center text-blue-800">
              Filter by genre
            </h3>
            <div className="flex flex-wrap gap-2">
              {uniqueGenres.map((genre) => (
                <motion.button
                  key={genre}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(genre)}
                  className={`py-2 px-4 rounded-full transition-all duration-200 ${
                    filter === genre
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  {genre}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

Books.propTypes = {
  show: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired,
};

export default Books;
