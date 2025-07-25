import { useEffect, useState, useRef } from 'react';

const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState(false);
    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            setHasMounted(true);
            mounted.current = true;
        }
    }, []);
    return hasMounted;
};

export default useHasMounted;
