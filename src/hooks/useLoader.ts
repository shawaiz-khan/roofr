import { LoaderContext } from "@/contexts/loaderContext"
import { useContext } from "react"

const useLoader = () => {
    const context = useContext(LoaderContext);

    if (!context) {
        throw new Error("useLoader must be used within a LoaderProvider");
    }

    return context;
}

export default useLoader;