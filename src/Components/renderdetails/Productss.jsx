// import './products.css'
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import UpdateProduct from "./UpdateProduct";

function Products() {
  const [singleprod, setSingleprod] = useState([]);
  const [des, setDes] = useState("");
  const [similar, setSimilar] = useState([]) 

  const params = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["singlemeal"],
    queryFn: async () => {
      const id = params.id;
      const res = await axios.get(`http://localhost:3000/productsById/${id}`);
      setDes(res.data.description);
      setSimilar(res.data.similarProduts);
      setsingleitem();
      return res.data;
    },
  });

  if (error) {
    return <h1>An error Occured</h1>;
  }

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  function setsingleitem() {
    setSingleprod(data);
  }

  function addtocard() {
    let addedProduts = JSON.parse(localStorage.getItem("addedcards")) || [];
    addedProduts.push(singleprod);

    console.log(addedProduts);

    localStorage.setItem("addedcards", JSON.stringify(addedProduts));
    // itemselectedbasket.innerHTML = addedProduts.length;

    alert("added");
  }

  console.log(data);
  return (
    <div>
      <div className="containerr">
        <div className="product">
          <div className="gallery">
            <div className="gal">{data && <img src={data.productUrl} />}</div>
            <div className="controls">
              <span className="btn-active"></span>
              <span className="btn"></span>
              <span className="btn"></span>
            </div>

            <div className="container4">
              <div className="topp">
                <div className="subcardd " id="subcards">
                  {similar?.map((images) => (
                    <img src={images.similarProducts} alt="image" />
                  ))}
                  <i className="fa-regular fa-heart"></i>
                </div>
                <div className="prev-next">
                  {/* <i className="fa-solid fa-chevron-left" id="prev"></i>
                  <i className="fa-solid fa-chevron-right" id="next"></i> */}
                </div>
              </div>
            </div>

            <div className="mainlydescription">
              <div className="display-des">
                <h3 id="prod-description">Product Description</h3>
                {des?.map((des) => (
                  <p id="pr">
                    <i>{des.productDescription}</i>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="details">
          <div className="selectoption">
            <select name="selectfor-detail-page" id="selectfor-detail-pag">
              <option>Home</option>
            </select>
            <select name="selectfor-detail-page" id="selectfor-detail-pag">
              <option>Decoration</option>
            </select>
            <select name="selectfor-detail-page" id="selectfor-detail-pag">
              <option>Furniture</option>
            </select>
            <select name="selectfor-detail-page" id="selectfor-detail-pag">
              <option>Storage</option>
            </select>
            <p id="sideboardd">Sideboard</p>
          </div>
          <div className="embrace-sideboard">
            <div className="design-mak">
              <h2>{data?.productName}</h2>
              <span id="teitra">Teitra Design</span>
            </div>
            <div className="love-likes">
              <div className="divlove">
                <i className="fa-regular fa-heart">109</i>
              </div>
              <i className="fa-regular fa-bookmark"></i>
            </div>
          </div>

          <hr />
          <hr />

          <div className="reviews">
            <h2 id="amountt">{data?.productPrice}</h2>
            <div className="starss">
              <i className="fa-regular fa-star" id="msg">
                4.8
              </i>
              <i className="fa-regular fa-message" id="ms">
                Messages Review
              </i>
            </div>
          </div>

          <div className="review">
            <h4 id="txt-decoration">71.56</h4>
            <div className="buyers">
              <p id="gren">
                <span id="greencolor">93</span>Josepha is a personal shopper for
                amazing results
              </p>
            </div>
          </div>
          <hr />
          <hr />

          {/* <form> */}
          <p id="choosecolor">Choose Color</p>
          <div className="color-select">
            <label for="red">
              <input type="radio" name="red" id="red" />
              <span className="color-1"></span>
            </label>
            <label for="green">
              <input type="radio" name="green" id="green" />
              <span className="color-2"></span>
            </label>
            <label for="yellow">
              <input type="radio" name="yellow" id="yellow" />
              <span className="color-3"></span>
            </label>
            <label for="blue">
              <input type="radio" name="blue" id="blue" />
              <span className="color-4"></span>
            </label>
          </div>
          <hr />
          <p id="choose-sice">Choose Size</p>
          <div className="size">
            <p className="choose">Choose a size</p>
            <div className="sizes">
              <div className="small">
                <input type="radio" />
                <p id="smal">Small</p>
              </div>
              <div className="small">
                <input type="radio" />
                <p id="smal">Medium</p>
              </div>
              <div className="small">
                <input type="radio" />
                <p id="smal">Large</p>
              </div>
              <div className="small">
                <input type="radio" />
                <p id="smal">Extra large</p>
              </div>
              <div className="small">
                <input type="radio" />
                <p id="smal">XXL</p>
              </div>
            </div>
          </div>
          <hr />

          <div className="quantity-select">
            <div className="addition">
              <button id="add">+</button>
              <p id="display">5</p>
              <button id="subtract">-</button>
            </div>

            <div className="cardadd">
              {/* <button id="buttonn" className='addtocard' onClick={addtocard}>Add to Card</button> */}
            </div>
          </div>
          <br />
          <hr />
          <div className="delevery">
            <div className="deliverycar">
              <i className="fa-solid fa-truck"></i>
              <div className="deleverytxt">
                <h4>free deliver</h4>
                <span>Enter your Postal code for Delivery Availability</span>
                <hr />
              </div>
            </div>
            <hr />
            <div className="deliverybasket">
              <i className="fa-solid fa-bag-shopping"></i>
              <div className="deleverytxt">
                <h4>Return deliver</h4>
                <span>Free 30 days Delivery Return. Details</span>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <hr />
      {data && <UpdateProduct data={data} />}
    </div>
  );
}

export default Products;
