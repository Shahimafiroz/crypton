import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat8 "mo:base/Nat8";
import NFTActorClass  "../NFT/nft";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Prelude "mo:base/Prelude";





 actor Crypton {


///  2.. data store inside our opend canister that keeps track of which NFTs were minted and who the owners are.
       //map of nfts 
       var mapOfNfts = HashMap.HashMap<Principal , NFTActorClass.NFT>( 1 , Principal.equal , Principal.hash);
       //map of owners
       var mapOfOwners = HashMap.HashMap<Principal , List.List<Principal>>( 1 , Principal.equal , Principal.hash);

//// 1 .. Minting the NFTs and returning the NFTPrincipal ID

      public shared(msg) func mint (imgData: [Nat8] , name: Text) : async Principal{
              
              let owner : Principal = msg.caller;
              Debug.print(debug_show(Cycles.balance()));
              Cycles.add(100_500_000_000);
              let newNFT =  await NFTActorClass.NFT(name,owner,imgData);
               Debug.print(debug_show(Cycles.balance()));
              let newNFTPrincipal = await newNFT.getCanisterId();
              //calling the nft
              mapOfNfts.put(newNFTPrincipal , newNFT);
              // calling the owneship add map function when a new minting happens
              addToOwnershipMap(owner , newNFTPrincipal);



              return newNFTPrincipal;
      };

// 3 ... So now that we've got our map of owners, we again can't simply just use a put here.Instead, we actually have to go through a few steps to get hold of the existing list that's stored for a particular user and then update that list and then push it back into the HashMap.So I'm going to split out a separate function. Underneath this first mint function,I'm going to close it off with some semicolons, and I'm going to create a new private function, which is called addToOwnershipMap.//Purpose is to figure out how to add newly created NFT tp this map of owners
              
              private func addToOwnershipMap( owner : Principal , nftId : Principal) {

                var ownedNfts  : List.List<Principal> = switch(mapOfOwners.get(owner)){

                        case null List.nil<Principal>();
                        case(?result) result;
                } ;
                ownedNfts := List.push(nftId , ownedNfts);
                mapOfOwners.put(owner , ownedNfts);

              };

/// 4 .... methood to fetch the list of IDs and turn it into an array that can be used on the frontend.

            public query func getOwnedNFTs(user: Principal) : async [Principal]{

                var userNfts : List.List<Principal> = switch(mapOfOwners.get(user)){
                        case null List.nil<Principal>();
                        case(?result) result; 
                };
                return List.toArray(userNfts);
            }

 }