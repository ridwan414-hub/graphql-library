import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <FaSpinner className="animate-spin text-blue-500 text-4xl" />
  </div>
);

export default LoadingSpinner;
