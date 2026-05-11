import React from "react";
import Navbar from "../components/Navbar.jsx";
import "../styles/Home.css";

 import Hero from "../components/Hero.jsx";
 import Categories from "../components/Categories.jsx";
 import AboutUs from "../components/AboutUs.jsx";

function Home() {
  return (
    <>
      
       <Hero />
      <Categories />
      <AboutUs/>
  
    </>
  );
}

export default Home;