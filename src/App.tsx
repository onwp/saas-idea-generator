import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import UsagePolicy from "./components/legal/UsagePolicy";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/usage" element={<UsagePolicy />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
