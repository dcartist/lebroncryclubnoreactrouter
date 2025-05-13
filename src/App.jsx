import "./App.css";
import {Link, Route, Routes } from "react-router-dom";
import HomePage from "./homepage.jsx"
import EasterEggPage from "./Sections/EasterEgg/EasterEggHome.jsx";

function App() {

  return (
    <>

   <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/secret" element={<EasterEggPage />} />
  </Routes>
    </>
  );
}

export default App;
