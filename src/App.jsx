import { Routes, Route } from "react-router-dom";

import AllOutputs from "./components/sections/ALLoutputs";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import NotFound from "./components/sections/NotFound";
import SuccessPage from "./components/sections/SuccessPage";
import ApplicationSearch from "./components/sections/ApplicationSearch";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<AllOutputs />} />
        <Route path="/application" element={<AllOutputs />} />

        {/* Success page */}
        <Route path="/success" element={<SuccessPage />} />

        {/* Application search page */}
        <Route path="/application-search/:applicationId" element={<ApplicationSearch/>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
