const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 z-50">
      <div className="flex flex-col items-center space-y-4">
        <span className="loading loading-bars loading-lg text-primary"></span>
        <p className="text-sm text-gray-500 font-semibold tracking-wide">
          Loading content, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;
