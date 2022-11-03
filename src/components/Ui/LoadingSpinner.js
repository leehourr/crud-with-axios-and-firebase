import Loader from "../../assets/Loader.svg";

export const LoadingSpinner = () => {
  return (
    <img
      src={Loader}
      className="animate-spin h-6 w-6 mx-auto"
      alt="loading ..."
    />
  );
};
