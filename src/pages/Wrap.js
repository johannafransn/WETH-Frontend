import EthLogo from "../eth_logo.svg";
import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import { CONTRACT_ADDRESS, ABI } from "../config";
import ErrorModal from "../components/ErrorModal";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

//TODO: add ErrorModal
//MetaMask wallet shown/button if connect
//Dropdown for network switch statements

export default function Wrap({ degree, userLocation, basic }) {
  const [apiData, setApiData] = useState([]);
  const [userWethInput, setUserWethInput] = useState(null);
  const [userEthInput, setUserEthInput] = useState(null);
  const [wethContract, setWethContract] = useState(null);
  const [wethBalance, setAvailableWethBalance] = useState(null);
  const [metamaskAddress, setMetamaskAddress] = useState("");
  const [showToast, setShowToast] = useState();
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const network = await web3.eth.net.getNetworkType();
      await window.ethereum.enable();
      const addresFromMetamask = await web3.eth.getAccounts();

      setMetamaskAddress(addresFromMetamask[0]);
      console.log(metamaskAddress, "addddddddr");

      //Load the smart contract
      const wethContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      setWethContract(wethContract);

      if (metamaskAddress) {
        let availableWeth = await wethContract.methods
          .balanceOf(metamaskAddress)
          .call();
        setAvailableWethBalance(availableWeth);
        console.log(availableWeth, "avail Weth:");
      }

      //Withdraw() (Unwrap eth function)
      //Deposit() (wrap eth function)
      //Balance() 'weth balance connected:'
    };
    loadBlockchainData();
  }, [metamaskAddress]);

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
    console.log('wrapping...', userEthInput)
    return onActivityClick('wrap')
  };

  const onUnwrapClick = () => {
    console.log('unwrapping...', userWethInput)
    onActivityClick('unwrap')
  };

  const onActivityClick = (activity) => {
    try {
      if (metamaskAddress) {
        let web3js = new Web3(window.web3.currentProvider);
        let input = activity == 'wrap' ? userEthInput : userWethInput
        let userInputInWei = web3js.utils.toWei(input, 'ether');
        let params = setParams(activity, userInputInWei)
        if (userInputInWei >= 1) {
          web3js.eth.sendTransaction(params);
        }
      }
    } catch (err) {
      setShowToast(true);
      setErrorMsg(
        "Something went wrong, please try again or report this issue"
      );
      console.log(err, "2Generic Error TODO: Popup, ");
    }
  };

  const setParams = (activity, userInputInWei) => {
    let params = {
      'to': CONTRACT_ADDRESS,
      'from': metamaskAddress,
    }
    switch (activity) {
      case 'wrap': {
        params['data'] = wethContract.methods.deposit().encodeABI();
        params['value'] = userInputInWei
      } break;
      case 'unwrap': {
        params['data'] = wethContract.methods.withdraw(userInputInWei).encodeABI()
      } break;
    }
    return params
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-5">
          <h1>
            <br></br>
            <b>Wrap here </b>
          </h1>
          <div>Your total weth available: {wethBalance}</div>

          {renderInputBox()}
        </div>
        <div class="col-6">
          <img src={EthLogo} style={{ width: "40%" }} />
        </div>
        <div class="col"></div>
      </div>
      {showToast ? (
        <ErrorModal
          showToastFromProp={showToast}
          errorMsg={errorMsg}
        ></ErrorModal>
      ) : null}
    </div>
  );
}
