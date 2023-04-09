import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../../.dfx/local/canisters/nft";
import { Principal } from "@dfinity/principal";

function Item(props) {
  const id = Principal.fromText(props.id);

  // creating constant with state
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [image, setImage] = useState("");

  // in order to be able to acess that canister we would have to run an "http" command to use http to be able to fetch that canister on the internetCB
  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({ host: localHost });
  // Async function
  async function loadNft() {
    const NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    const name = await NFTActor.getName();
    const owner = await NFTActor.getOwner();
    const imagData = await NFTActor.getImage();
    const imageContent = new Uint8Array(imagData);
    const image = URL.createObjectURL(
      new Blob([imageContent.buffer], { type: "image / png" })
    );
    setName(name);
    setOwner(owner.toText());
    setImage(image);
  }
  // we only want to call the "loadNft" methood once and thats the 1st time this item component gets rendered hence we use useffect
  useEffect(() => {
    loadNft();
  }, []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}
            <span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner : {owner}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
