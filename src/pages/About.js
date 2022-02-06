import EthLogo from "../assets/svg/eth_logo.svg";

const About = () => {
  return (
    <div class="container">
    <div class="row">
      <div class="col-5">
        <h1><br></br>
          <b>About</b>
        </h1>
        <p>An unofficial page created by DeFi enthusiasts as an easy to use 
          interface for wrapping and unwrapping ETH</p>
          <br></br>
          <a className="why-use-weth-link"
                href="https://weth.io/"
                target="_blank"
              >
                Why use WETH ?
              </a>      </div>
      <div class="col-6">
        <img src={EthLogo} style={{ width: "40%" }} />
      </div>
      <div class="col"></div>
    </div>
  </div>
  );
};

export default About;
