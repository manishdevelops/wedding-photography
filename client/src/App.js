import './App.css';
import Header from './components/layout/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Header />
        <hr className=' md:w-[92%] lg:w-[85%] mx-auto hidden md:block' />
      </header>
    </BrowserRouter>
  );
}

export default App;
