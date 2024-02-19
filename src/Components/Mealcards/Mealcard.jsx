import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./meal.css";
// import Paginatte from "./Paginatte";

function Mealcard() {
  const [catId, setCatId] = useState("");

  const [categoryName, setCategoryName] = useState("");
  const [hide, setHide] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["productcard"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000");

      return res.data;
    },
  });

  //styles
  const selectStyle = {
    backgroundColor: "#f0f0f0",
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "25px",
    color: "#303e6f",
  };

  //fetch categories

  const { data: catdata } = useQuery({
    queryKey: ["categor"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/category`);
      return res.data;
    },
  });
  const { data: catdata2, refetch } = useQuery({
    queryKey: ["categoryName"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/category1/${categoryName}`
      );
      return res.data;
    },
    enabled: !!categoryName,
  });

  //handles option clicked o or selected

  const handleselect = async (id) => {
    console.clear();
    console.log('fetching ', id);
    const categorySelected = catdata.find((cat) => cat.categoryId == id);

    setCatId(id);
    setCategoryName(categorySelected.productCategory);
    setHide(true);
  };

  useEffect(() => {
    if (categoryName) {
      refetch(); // reloadig only when categoryname has changed
    }
  }, [categoryName]);

  // display the followings incase of errors during fetch

  if (error) {
    return <h1>An error Occured</h1>;
  }

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <>
      <h3>Filter by Categories</h3>
      <br />
      <div style={{ paddingBottom: "10px", width: "100%" }}>
        <select
          id="cat"
          style={selectStyle}
          onChange={(e) => handleselect(e.target.value)}
        >
          {catdata?.map((categories, index) => (
            <option key={index} value={categories.categoryId}>
              {categories.productCategory}
            </option>
          ))}
        </select>
      </div>

      <div className="containerthumb">
        {hide ? (
          <>
            {catdata2?.map((item) => {
              console.log(item);
              return (
                <div className="top">
                  <div className="subcard" id="subcards">
                    <Link to={`./Details/${item.productId}`}>
                      <img src={item.productUrl} id="details-page" alt="" />
                    </Link>

                    <i className="fa-regular fa-heart"></i>
                  </div>

                  <div className="snikersprice">
                    <span id="snykers">{item.productName}</span>
                    <span id="snykers-price">{item.productPrice}</span>
                  </div>

                  <div className="shoes-available">
                    <p id="shoes"> 5 types of shoes available</p>
                  </div>
                  <div className="stars">
                    <span id="star" className="fa-star">
                      {/* {item.rating} */}
                    </span>
                    <p id="number">{item.productQuantity}</p>
                  </div>
                  <div className="date">
                    <button id="addtocard" className="addtocard">
                      addtoCard
                    </button>
                    <button id="shortlist">Short List</button>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {data.map((item) => {
              return (
                <div className="top">
                  <div className="subcard" id="subcards">
                    <Link to={`./Details/${item.productId}`}>
                      <img src={item.productUrl} id="details-page" alt="" />
                    </Link>

                    <i className="fa-regular fa-heart"></i>
                  </div>

                  <div className="snikersprice">
                    <span id="snykers">{item.productName}</span>
                    <span id="snykers-price">{item.productPrice}</span>
                  </div>

                  <div className="shoes-available">
                    <p id="shoes"> 5 types of shoes available</p>
                  </div>
                  <div className="stars">
                    <span id="star" className="fa-star">
                      {/* {item.rating} */}
                    </span>
                    <p id="number">{item.productQuantity}</p>
                  </div>
                  <div className="date">
                    <button id="addtocard" className="addtocard">
                      addtoCard
                    </button>
                    <button id="shortlist">Short List</button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

export default Mealcard;
