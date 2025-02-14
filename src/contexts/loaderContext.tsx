import { createContext, ReactNode, useState } from "react";
import LoaderContextType from "@/types/loader.context.types";

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};

export { LoaderProvider, LoaderContext };