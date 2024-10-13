import { PropTypes } from "prop-types";
import BookFormModal from "./BookFormModal";
import { FaTimes } from "react-icons/fa";

const NewBook = (props) => {
  if (!props.setIsModalOpen) {
    return null;
  }

  return (
    <>
      {props.isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => props.setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <FaTimes size={24} />
            </button>
            <BookFormModal
              setError={props.setError}
              closeModal={() => props.setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

NewBook.propTypes = {
  setError: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default NewBook;
