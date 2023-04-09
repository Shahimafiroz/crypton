import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import homeImage from "../../assets/home-img.png";
import { BrowserRouter, Link } from "react-router-dom";
import Item from "./Item";
import Minter from "./Minter";

function App() {
  // const NFTID = "r7inp-6aaaa-aaaaa-aaabq-cai";
  return (
    <div className="App">
      <Header />
      {/* <Minter /> */}

      <Footer />
    </div>
  );
}

export default App;
