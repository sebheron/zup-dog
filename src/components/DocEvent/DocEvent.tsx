import { useEffect } from "react";

interface Props<K extends keyof DocumentEventMap> {
  type: K;
  listener: (this: Document, ev: DocumentEventMap[K]) => unknown;
}

const DocEvent = <K extends keyof DocumentEventMap>({
  type,
  listener,
}: Props<K>) => {
  useEffect(() => {
    document.addEventListener(type, listener);
    return () => {
      document.removeEventListener(type, listener);
    };
  }, [type, listener]);
  return null;
};

export default DocEvent;
