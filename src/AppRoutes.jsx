import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import AddEditContact from "./pages/AddEditContact";


const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-contact" element={<AddEditContact />} />
          <Route path="/edit-contact/:id" element={<AddEditContact />} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default AppRoutes;