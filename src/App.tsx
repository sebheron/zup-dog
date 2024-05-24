import { Suspense, lazy } from "react";
import Loading from "@/components/Loading/Loading";

const Scene = lazy(() => import("@/components/Scene/Scene"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Scene />
    </Suspense>
  );
}

export default App;
