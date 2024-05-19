import { PropsWithChildren, createContext, useContext } from "react";
import { Illustration } from "zdog";

interface Props extends PropsWithChildren {
  illo: Illustration;
}

const IlloContext = createContext<Illustration | null>(null);

export const useIllo = (): Illustration => {
  const context = useContext(IlloContext);
  if (!context) {
    throw new Error("useIllo must be used within an IlloProvider");
  }
  return context;
};

export const Illo = ({ children, illo }: Props) => {
  return <IlloContext.Provider value={illo}>{children}</IlloContext.Provider>;
};
