import { createContext, useContext, useState } from "react";
import Loader from "../components/Loader";

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {/* {loading && <Loader />} */}
      {loading && (
        <div className="fixed inset-0 bg-base-100 bg-opacity-90 z-[100] flex items-center justify-center overflow-hidden">
          <Loader />
        </div>
      )}

      {children}
    </LoaderContext.Provider>
  );
};
