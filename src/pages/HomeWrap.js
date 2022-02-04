import EthLogo from "../eth_logo.svg";

const HomeWrap = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-5">
          <h1><br></br>
            <b>Welcome, wrap your ETH easily and safely</b>
          </h1>
        </div>
        <div class="col-6">
          <img src={EthLogo} style={{ width: "40%" }} />
        </div>
        <div class="col"></div>
      </div>
    </div>
  );
};

export default HomeWrap;
