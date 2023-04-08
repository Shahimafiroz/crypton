import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import homeImage from "../../assets/home-img.png";
import Item from "./Item";
import Minter from "./Minter";

function App() {
  const NFTID = "s55qq-oqaaa-aaaaa-aaakq-cai";
  return (
    <div className="App">
      <Header />

      <div className="shahima">
        <div className="khushi">
          <p className="discover">Discover</p>
          <p className="cole">
            collect <span className="pink">& </span>sell extraordinay{" "}
            <span className="pink">NFT's</span>
          </p>
          <p className="ext">
            Own a piece of history with our NFT marketplace. From music to art,
            invest in <span className="pink">unique digital assets</span> that
            will last a lifetime
          </p>
        </div>
        <div className="nairy">
          <Minter />
          {/* <Item id={NFTID} /> */}
          {/* <img className="bottom-space" src={homeImage} />{" "} */}
          {/* <img className="bottom-space" src={homeImage} /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
