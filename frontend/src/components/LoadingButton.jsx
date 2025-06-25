const LoadingButton = ({ isLoading, children, className = "", ...rest }) => {
  return (
    <button
      className={`btn flex items-center justify-center ${className}`}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="loading loading-ring loading-sm"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
