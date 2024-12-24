import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/layout/Header';
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import ContactUs from "./components/pages/ContactUs";
import Gallery from "./components/pages/Gallery";
import Services from "./components/pages/Services";
import Footer from "./components/layout/Footer";
import TermsAndServices from "./components/common/TermsAndServices";
import Consultation from "./components/layout/Consultation";

function App() {
  return (
    <BrowserRouter>

      <header>
        <Header />
        <hr className=' md:w-[92%] lg:w-[85%] mx-auto hidden md:block' />
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/services' element={<Services />} />
          <Route path='/terms-of-service' element={<TermsAndServices />} />
          <Route path='/book-consultation' element={<Consultation />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>

    </BrowserRouter>
  );
}

export default App;
