import { useZdog } from "react-zdog";
import { Illustration } from "zdog";

const useIllo = () => {
  const { illu } = useZdog();
  return illu as Illustration;
};

export default useIllo;
