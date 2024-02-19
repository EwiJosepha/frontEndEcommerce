import "./grab.css"
import avatarImage from "../../assets/images/My project 1.png";

function Grab() {
  return (
    <>
      <div className="container2">
        <div className="buy-now-section">
          <div className="grap-50">
            <h1 id="headphone">Grap up to 50% off on Selected Headphone</h1>

            <button id="buynow">Buy Now</button>
          </div>

          <div className="avatar">
            <img src={avatarImage}  alt="avatar"/>
          </div>
        </div>
      </div>
    </>
  );
}
export default Grab;
