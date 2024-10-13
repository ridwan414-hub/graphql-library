import PropTypes from "prop-types";
import BirthYearForm from "./BirthYearForm";
import { motion } from "framer-motion";

const Authors = (props) => {
  const authenticated = localStorage.getItem("library-user-token");
  if (!props.show) {
    return null;
  }
  const authors = props.authors;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row justify-center items-start gap-8"
    >
      {authenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-2/5"
        >
          <BirthYearForm authors={authors} setError={props.setError} />
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full md:w-3/5"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Authors
        </h2>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <tr>
                <th className="w-1/3 py-3 px-4 text-left">Name</th>
                <th className="w-1/3 py-3 px-4 text-left">Born</th>
                <th className="w-1/3 py-3 px-4 text-left">Books</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((a) => (
                <motion.tr
                  key={a.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-b hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4">{a.name}</td>
                  <td className="py-3 px-4">{a.born || "N/A"}</td>
                  <td className="py-3 px-4">{a.bookCount}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
  authors: PropTypes.array.isRequired,
  setError: PropTypes.func.isRequired,
};

export default Authors;
