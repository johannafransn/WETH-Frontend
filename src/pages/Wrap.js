import EthLogo from "../eth_logo.svg";
import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import { CONTRACT_ADDRESS, ABI } from "../config";

export default function Wrap({ degree, userLocation, basic }) {
  const [apiData, setApiData] = useState([]);
  const [userWethInput, setUserWethInput] = useState(null);
  const [userEthInput, setUserEthInput] = useState(null);
  const [wethContract, setWethContract] = useState(null);


  /*   useEffect(() => {
    const fetchApiData = async () => {
      const liveUrl =
        "https://allemansbacken.newseed.se/v1/gcd?latitude=4&longitude=5"
      const res = await fetch(liveUrl);
      const data = await res.json();
      setApiData(data);
    };
    fetchApiData();
  }, []); */

  const  loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();

    //Load the smart contract
    const wethContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    setWethContract(wethContract);
  };

  const renderInputBox = () => {
    return (
      <>
        <div style={{ marginBottom: 150, marginTop: 50 }}>
          <input
            type="number"
            class="form-control"
            placeholder="Enter ETH amount"
            data-name="eth"
            value={userEthInput}
            onChange={(e) => setUserEthInput(e.target.value)}
            style={{ width: "50%", float: "left" }}
          ></input>
          <button
            onClick={() => onWrapClick()}
            type="button"
            class="btn btn-light"
            style={{ float: "left" }}
          >
            Wrap
          </button>
        </div>
        <input
          type="number"
          class="form-control"
          placeholder="Enter WETH amount"
          value={userWethInput}
          data-name="weth"
          onChange={(e) => setUserWethInput(e.target.value)}
          style={{ width: "50%", float: "left" }}
        ></input>
        <button
          type="button"
          class="btn btn-light"
          onClick={() => onUnwrapClick()}
          style={{ float: "left" }}
        >
          Unwrap
        </button>
      </>
    );
  };

  const onWrapClick = () => {
    console.log("ETH", userEthInput);
  };

  const onUnwrapClick = () => {
    console.log("WETH", userWethInput);
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-5">
          <h1>
            <br></br>
            <b>Wrap here </b>
          </h1>

          {renderInputBox()}
        </div>
        <div class="col-6">
          <img src={EthLogo} style={{ width: "40%" }} />
        </div>
        <div class="col"></div>
      </div>
    </div>
  );
}
