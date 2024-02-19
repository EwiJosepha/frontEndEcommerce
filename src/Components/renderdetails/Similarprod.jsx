import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

function Simalarprod() {
  const [singleprod, setSingleprod] = useState([]);

  const params = useParams();

  const { data } = useQuery({
    queryKey: ["similarities"],
    queryFn: async () => {
      const meall = await axios
        .get(`https://dummyjson.com/products/${params.id}`)
        .then((res) => res.data);

      const mealCategory = await axios.get(
        `https://dummyjson.com/products/category/${meall.category}`
      );

      setsingleitem();
      return {
        meall,
        mealCategory: mealCategory.data,
      };
    },
  });

  function setsingleitem() {
    setSingleprod(data.meall);
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
  console.log(params);
  return (
    <>
      <div className="containersecond">
        {data?.mealCategory.products.map((simi) => (
          <div className="topp">
            <div className="subcardd" id="subcardss">
              <img src={simi.thumbnail} id="detailss-page" />
            </div>

            <div className="snikerspricee">
              <span id="snykers">{simi.title}</span>
              <span id="snykers-price">{simi.price}</span>
            </div>

            <div className="shoes-available">
              <p id="shoes"> 5 types of shoes available</p>
            </div>
            <div className="stars">
              <span id="star" className="fa-star">
                {simi.rating}
              </span>
            </div>
            <div className="date">
              <button id="addtocard" onClick={addtocard}>
                Add to Card
              </button>
              <button id="shortlist">Short List</button>
            </div>
            <div className="subcardd" id="subcardss"></div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Simalarprod;
