import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import homeImage from "../../assets/home-img.png";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Minter from "./Minter";
import Gallery from "./Gallery";
import { crypton_backend } from "../../../declarations/crypton_backend/index";
import CURRENT_USER_ID from "../index";

function Header() {
  const [userOwnedGallery, setOwnedGallery] = useState();

  async function getNFTs() {
    const userNFTSIds = await crypton_backend.getOwnedNFTs(CURRENT_USER_ID);
    console.log(userNFTSIds);
    setOwnedGallery(<Gallery title="My NFT's" ids={userNFTSIds} />);
  }

  useEffect(() => {
    getNFTs();
  }, []);

  return (
    <BrowserRouter>
      <div className="app-root-1">
        <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
          <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
            <div className="header-left-4"></div>
            <Link to="/">
              <img className="header-logo-11" src={logo} />
            </Link>
            {/* <div className="header-vertical-9"></div> */}
            {/* <h5 className="Typography-root header-logo-text">Crypton</h5> */}
            <div className="header-empty-6"></div>
            <div className="header-space-8"></div>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/discover">Discover</Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/minter">Minter</Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/collection">My NFTs</Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              Latest
            </button>
          </div>
        </header>
      </div>
      <Switch>
        {/*  */}
        <Route path="/discover">
          <h1>DISCOVER</h1>
        </Route>
        {/*  */}
        <Route path="/minter">
          <Minter />
        </Route>
        {/*  */}
        <Route path="/collection">{setOwnedGallery}</Route>
        {/*  */}
        <Route path="/">
          <div className="shahima">
            <div className="khushi">
              <p className="discover">Discover</p>
              <p className="cole">
                collect <span className="pink">& </span>sell extraordinay{" "}
                <span className="pink">NFT's</span>
              </p>
              <p className="ext">
                Own a piece of history with our NFT marketplace. From music to
                art, invest in{" "}
                <span className="pink">unique digital assets</span> that will
                last a lifetime
              </p>
            </div>
            <div className="nairy">
              <img className="bottom-space" src={homeImage} />{" "}
            </div>
          </div>
        </Route>
        {/*  */}
      </Switch>
    </BrowserRouter>
  );
}

export default Header;
