import { Route, Routes } from "react-router-dom";

import { isMobile } from "react-device-detect";
import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import HomeWrap from "./pages/HomeWrap";
import Wrap from "./pages/Wrap";

import About from "./pages/About";
import MobileDetected from "./pages/MobileDetected";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [userAccountAddress, setUserAccountAddress] = useState("");
  const [connectedAddrValue, setConnectedAddrValue] = useState("");

  const handleConnectMetamask = async () => {
    let that = this;
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();
    //Fetch account data:
    const accountFromMetaMask = await web3.eth.getAccounts();
    console.log(accountFromMetaMask, "account in app.js before set state");
    setUserAccountAddress(accountFromMetaMask);
    setConnectedAddrValue(
      String(accountFromMetaMask).substr(0, 5) +
        "..." +
        String(accountFromMetaMask).substr(38, 4)
    );

    console.log(userAccountAddress, "user metamask address after set state");
  };

  return (
    <div>
      {isMobile ? "" : <Navbar />}
      <main>
        {isMobile ? (
          <MobileDetected />
        ) : (
          <Routes>
            <Route path="/" element={<HomeWrap />} />
            <Route path="/wrap" element={<Wrap />} />
            <Route path="/about" element={<About />} />
            <Route path="/error" element={<MobileDetected />} />
          </Routes>
        )}
      </main>
      <div className="metamask-addr-container">
        <button className="btn btn-light mm" onClick={handleConnectMetamask}>
         {connectedAddrValue}
          <img
            width="30"
            height="30"
            style={{  float: "left", marginRight: 5}}
            src="https://cdn.discordapp.com/attachments/908513230714982410/913132016365633596/aaaaa.png"
          ></img>
        </button>
     
      </div>

      <Footer />
    </div>
  );
}

export default App;
