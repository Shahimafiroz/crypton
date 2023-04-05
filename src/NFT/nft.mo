import Debug "mo:base/Debug";
import Nat8 "mo:base/Nat8";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

actor class NFT (name: Text, owner: Principal, content: [Nat8]) {
  let itemName = name;
  let nftOwner = owner;
  let imageBytes= content;


    public query func getName(): async Text{    
      return itemName;
    };

    public query func getOwner(): async Principal{
        return nftOwner;
    };

    public query func getImage() : async [Nat8]{
        return imageBytes;
    }




  Debug.print("It works!");
}
