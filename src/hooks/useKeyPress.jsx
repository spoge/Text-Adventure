import { useCallback, useEffect } from "react";

export function useKeyPress(callback, keyCodes) {
  const handler = useCallback(
    ({ key }) => {
      if (keyCodes.includes(key)) {
        callback();
      }
    },
    [callback, keyCodes]
  );

  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [handler]);
}
