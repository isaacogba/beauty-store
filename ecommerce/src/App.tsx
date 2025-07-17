import { FilterProvider } from "./component/filterContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import MainContent from "./component/MainContent";
import ProductPage from "./component/ProductPage";
import PopularBlog from "./component/PopularBlog";
import TopSeller from "./component/TopSeller";

export default function App() {
  return (
    <Router>
      <FilterProvider>
        <div className="flex h-screen">
          <Sidebar />

          <div className="rounded w-full flex justify-center flex-wrap">

            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>

            {/* ✅ Move PopularBlog and TopSeller outside Routes */}
          
            <TopSeller  />

              <PopularBlog />

          </div>
        </div>
      </FilterProvider>
    </Router>
  );
}
