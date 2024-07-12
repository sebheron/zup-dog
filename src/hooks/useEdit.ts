import { useCallback, useEffect, useState } from "react";

const useEdit = <T>(value: T, onChange: (value: T) => void, delay = 200) => {
  const [state, setState] = useState(value);

  const change = useCallback((newValue: T | ((prev: T) => T)) => {
    setState(newValue);
  }, []);

  useEffect(() => {
    setState(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(state);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [state, delay]);

  return [state, change] as const;
};

export default useEdit;
