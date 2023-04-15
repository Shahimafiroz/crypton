import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../../.dfx/local/canisters/nft";
import { Principal } from "@dfinity/principal";
import Button from "./Button";
import { crypton_backend } from "../../../declarations/crypton_backend";
import CURRENT_USER_ID from "../index";

function Item(props) {
  const id = props.id; //1

  // creating constant with state
  const [name, setName] = useState();
  const [owner, setOwner] = useState("");
  const [image, setImage] = useState("");
  const [button, setButton] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [sellStatus, setSellStatus] = useState("");

  // in order to be able to acess that canister we would have to run an "http" command to use http to be able to fetch that canister on the internetCB
  const localHost = "http://localhost:8080/"; //2
  const agent = new HttpAgent({ host: localHost });
  // WARNING !!!! WHEN DEPLOYING LIVE REMOVE THE BELOW LINE--|
  agent.fetchRootKey(); // <---------------------------------|
  let NFTActor; // global variable for global use

  // Async function for acessing the NFTs //3
  async function loadNft() {
    NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });
    //3

    const name = await NFTActor.getName();
    const owner = await NFTActor.getOwner();
    const imagData = await NFTActor.getImage();
    const imageContent = new Uint8Array(imagData);
    //////////////////////////////////////BLOB/////////////////////////////////////////////
    const image = URL.createObjectURL(
      new Blob([imageContent.buffer], { type: "image / png" })
    );
    setName(name);
    setOwner(owner.toText());
    setImage(image);

    /////////////////////////////////// check if the nft is listed/ for mynfts and discover page   ///////////////////////
    if (props.role == "collection") {
      //nft/discover
      const nftIsListed = await crypton_backend.isListed(props.id);
      if (nftIsListed) {
        setOwner("Crypton");
        setBlur({ filter: "blur(4px)" });
        setSellStatus("Listed");
      } else {
        setButton(<Button handleClick={handleSell} text={"Sell"} />);
      } //nftISlisted
    } else if (props.role == "discover") {
      const originalOwner = await crypton_backend.getOriginalOwner(props.id);
      if (originalOwner != CURRENT_USER_ID.toText()) {
        setButton(<Button handleClick={handleBuy} text={"Buy"} />);
      }
    }
  } ///end of nft/discover
  // we only want to call the "loadNft" methood once and thats the 1st time this item component gets rendered hence we use useffect
  useEffect(() => {
    loadNft();
  }, []);

  ////************** FRONTEND changes When the onclick funtions is triggred (Button clicked)......... for SELLING   ///////////
  let price;
  function handleSell() {
    console.log("initiating Transfer of Token!");
    setPriceInput(
      <input
        placeholder="Price in Chronos"
        type="number"
        className="price-input"
        value={price}
        onChange={(e) => (price = e.target.value)}
      />
    );
    setButton(<Button handleClick={sellItem} text={"Confirm"} />);
  }
  /////*********  BACKEND ******* changes When the onclick funtions is triggred (Button clicked).............. for SELLING //////////

  async function sellItem() {
    setBlur({ filter: "blur(4px)" });
    setLoaderHidden(false);
    console.log("confirm selling of nft for " + price);
    const listingResult = await crypton_backend.listItem(
      props.id,
      Number(price)
    );
    console.log("listing" + listingResult);
    if (listingResult == "Success") {
      const cryptonID = await crypton_backend.getCrypton_backendCanisterID();
      const transferResult = await NFTActor.transferOwnership(cryptonID);
      console.log("this is the transfer result" + transferResult);

      if (transferResult == "Success") {
        setLoaderHidden(true);
        setButton();
        setPriceInput();
        setOwner("Crypton");
        setSellStatus("Listed");
      } //IF TRANSFER
    } /// IF LISTING
  } //SELL ITEM

  ////************** FRONTEND changes When the onclick funtions is triggred (Button clicked)......... for BUYING   ///////////

  async function handleBuy() {
    console.log("Buyy was triggred");
  }

  /////////////////////////////////////////////            frontEnd              /////////////////////////////////

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
          style={blur}
        />
        <div className="lds-ellipsis" hidden={loaderHidden}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}
            <span className="purple-text"> {sellStatus} </span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            {owner}
          </p>
          {priceInput}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
