import EthLogo from "../eth_logo.svg";

const renderInputBox = () => {
  return (
    <>
      <div style={{ marginBottom: 150, marginTop: 50 }}>
        <input
          type="number"
          class="form-control"
          placeholder="Enter ETH amount"
          style={{ width: "50%", float: "left" }}
        ></input>
        <button type="button" class="btn btn-light" style={{ float: "left" }}>
          Wrap
        </button>
      </div>
      <input
        type="number"
        class="form-control"
        placeholder="Enter WETH amount"
        style={{ width: "50%", float: "left" }}
      ></input>
      <button type="button" class="btn btn-light" style={{ float: "left" }}>
        Unwrap
      </button>
    </>
  );
};

const Wrap = () => {
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
};

export default Wrap;
