import { useCallback, useEffect, useState } from "react";

const useEdit = <T>(value: T, onChange: (value: T) => void) => {
  const [state, setState] = useState(value);

  const change = useCallback((newValue: T | ((prev: T) => T)) => {
    setState(newValue);
  }, []);

  const submit = useCallback(() => {
    onChange(state);
  }, [onChange, state]);

  useEffect(() => {
    setState(value);
  }, [value]);

  return [state, change, submit] as const;
};

export default useEdit;
