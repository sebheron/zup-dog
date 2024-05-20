import { useZdog } from "react-zdog";
import { Illustration } from "zdog";

const useIllustration = () => {
  const { illu } = useZdog();
  return illu as Illustration;
};

export default useIllustration;
