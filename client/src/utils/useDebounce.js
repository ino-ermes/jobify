import { useEffect, useState } from "react";

function useDebounce(value, delay) {
    const [v, setV] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setV(value);
        }, delay)
        return () => {clearTimeout(timer)};
        // add delay so no warning will be shown :)
    }, [value, delay]);

    return v;
}

export default useDebounce;