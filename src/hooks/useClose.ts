import { useRef, useEffect, MutableRefObject } from "react";

export function useCloseOut(handler: () => void, isBabel: boolean = true): MutableRefObject<HTMLInputElement | null> {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, isBabel);

    return () => {
      document.removeEventListener("click", handleClick, isBabel);
    };
  }, [handler, isBabel]);

  return ref;
}
