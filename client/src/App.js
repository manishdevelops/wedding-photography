import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/layout/Header';
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import ContactUs from "./components/pages/ContactUs";
import Gallery from "./components/pages/Gallery";
import Services from "./components/pages/Services";
import SocialMedia from "./components/pages/SocialMedia";

function App() {
  return (
    <BrowserRouter>

      <header>
        <Header />
        <hr className=' md:w-[92%] lg:w-[85%] mx-auto hidden md:block' />
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/services' element={<Services />} />
        <Route path='/social-media' element={<SocialMedia />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
