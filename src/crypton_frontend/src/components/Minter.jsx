import React from "react";
import { useForm } from "react-hook-form";
import { crypton_backend } from "../../../declarations/crypton_backend/index";
import { Principal } from "@dfinity/principal";

function Minter() {
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    const name = data.name;
    const image = data.image[0];
    const imageArray = await image.arrayBuffer();
    const imageByteData = [...new Uint8Array(imageArray)];

    const newNFTID = await crypton_backend.mint(imageByteData, name);
    console.log(newNFTID.toText());
  }

  return (
    <div className="minter-container">
      <h3 className="makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
        Create NFT
      </h3>
      <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
        Upload Image
      </h6>
      <form className="makeStyles-form-109" noValidate="" autoComplete="off">
        <div className="upload-container">
          {/* *************  UPLOAD INPUT  ************** */}
          <input
            {...register("image", { required: true })}
            className="upload"
            type="file"
            accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
          />
        </div>
        <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
          Collection Name
        </h6>
        <div className="form-FormControl-root form-TextField-root form-FormControl-marginNormal form-FormControl-fullWidth">
          <div className="form-InputBase-root form-OutlinedInput-root form-InputBase-fullWidth form-InputBase-formControl">
            {/* ************ NAME ********** */}
            <input
              {...register("name", { required: true })}
              placeholder="e.g. CryptoDunks"
              type="text"
              className="form-InputBase-input form-OutlinedInput-input"
            />
            <fieldset className="PrivateNotchedOutline-root-60 form-OutlinedInput-notchedOutline"></fieldset>
          </div>
        </div>
        {/* *************  Submit Button  ************* */}
        <div className="form-ButtonBase-root form-Chip-root makeStyles-chipBlue-108 form-Chip-clickable">
          <span onClick={handleSubmit(onSubmit)} className="form-Chip-label">
            Mint NFT
          </span>
        </div>
      </form>
    </div>
  );
}

export default Minter;
