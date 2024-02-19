import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function UpdateProduct({ data }) {
  const [updatemodal, setUpdatemodal] = useState(true);
  const [deleteProd, setDeleteProd] = useState();
  const [catId, setCatId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const selectStyle = {
    backgroundColor: "#f0f0f0",
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "25px",
    color: "#303e6f",
  };

  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    productQuantity: "",
    productUrl: "",
    // similarProduts: "",
    productCategory: "",
  });

  useEffect(
    () =>
      setFormData({
        ...formData,
        productId: data.productId || "",
        productName: data.productName || "",
        productQuantity: data.productQuantity || "",
        productUrl: data.productUrl || "",
        // similarProduts: data.similarProduts || "",
        productCategory: data.productCategory || "",
      }),
    [data]
  );

  const { data: categoryData } = useQuery({
    queryKey: ["cate"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/category`);

      return res.data;
    },
  });

  const handleselect = (id) => {
    setCatId(parseInt(id));
    setCategoryName((prevCategoryName) => {
      const categorySelected = categoryData.find((cat) => cat.categoryId == id);
      return categorySelected ? categorySelected.productCategory : prevCategoryName;
    });
  };

  console.log(catId);
  console.log(categoryName);

  function isUpdateTrue() {
    setUpdatemodal(false);
  }

  function closemodal() {
    setUpdatemodal(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  async function deletefunction() {
    const productId = formData.productId;
    setDeleteProd((data = {}));

    try {
      const deleteVals = await axios.delete(
        `http://localhost:3000/delete/${productId}`
      );
      console.log(data);
      console.log(deleteVals);
    } catch (err) {
      if (err) {
        console.log("not deleted", err.message);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProducted = {
        productId: data.productId,
        productName: formData.productName,
        productQuantity: formData.productQuantity,
        productUrl: formData.productUrl,
        categoryId: catId,
        productCategory: categoryName,
      };

      const updateValues = await axios.post(
        `http://localhost:3000/${updatedProducted.productId}/${catId}/update`,
        updatedProducted,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Meal updated successfully:", updateValues.data);
      console.log(updatedProducted);
    } catch (err) {
      console.log(err.message);
    }
  };

  // const handleSimilarProductChange = (index, key, value) => {
  //   const newSimilarProducts = [...similarProducts];
  //   newSimilarProducts[index] = { ...newSimilarProducts[index], [key]: value };
  //   setSimilarProducts(newSimilarProducts);
  // };

  // const handleSimilarProductAdd = () => {
  //   setSimilarProducts([...similarProducts, { key: "", value: "" }]);
  // };

  return (
    <div>
      {updatemodal ? (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "30px",
            padding: "50px",
            background: "#FFD3F8",
          }}
        >
          <button
            onClick={isUpdateTrue}
            style={{
              background: "#303e6f",
              borderRadius: "8px",
              border: "none",
              padding: "10px",
              color: "#fff",
            }}
          >
            Update Product
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            background: "#FFD3F8",
            color: "#303e6f",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: "300px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ paddingBottom: "10px", width: "100%" }}>
              <label
                style={{
                  marginBottom: "2px",
                  fontSize: "25px",
                  fontWeight: 400,
                  textAlign: "right",
                  paddingRight: "10px",
                  width: "40%",
                }}
              >
                ProductName:
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={(e) => handleChange(e)}
                  style={{ padding: "8px", width: "60%" }}
                />
              </label>
            </div>
            <div style={{ paddingBottom: "10px", width: "100%" }}>
              <label
                style={{
                  marginBottom: "2px",
                  fontSize: "25px",
                  fontWeight: 400,
                  textAlign: "right",
                  paddingRight: "10px",
                  width: "40%",
                }}
              >
                productQuantity:
                <input
                  type="text"
                  name="productQuantity"
                  value={formData.productQuantity}
                  onChange={(e) => handleChange(e)}
                  style={{ padding: "8px", width: "60%" }}
                />
              </label>
            </div>
            <div style={{ paddingBottom: "10px", width: "100%" }}>
              <label
                style={{
                  marginBottom: "2px",
                  fontSize: "25px",
                  fontWeight: 400,
                  textAlign: "right",
                  paddingRight: "10px",
                  width: "40%",
                }}
              >
                ProductUrl:
                <input
                  type="text"
                  name="productUrl"
                  value={formData.productUrl}
                  onChange={(e) => handleChange(e)}
                  style={{ padding: "8px", width: "60%" }}
                />
              </label>
            </div>

            <div style={{ paddingBottom: "10px", width: "100%" }}>
              <select
                id="cat"
                style={selectStyle}
                value={formData.categoryId}
                onChange={(e) => {
                  handleselect(e.target.value);
                }}
              >
                {categoryData?.map((categories, index) => (
                  <option key={index} value={categories.categoryId}>
                    {categories.productCategory}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100px",
                }}
              >
                Submit
              </button>
              <br />
              <div style={{ display: "flex", gap: "40px" }}>
                <button
                  type="button"
                  onClick={deletefunction}
                  style={{
                    background: "#303e6f",
                    borderRadius: "8px",
                    border: "none",
                    padding: "8px",
                    color: "#fff",
                    marginBottom: "100px",
                    float: "left",
                  }}
                >
                  Delete Product
                </button>
                <button
                  type="button"
                  onClick={closemodal}
                  style={{
                    background: "#303e6f",
                    borderRadius: "8px",
                    border: "none",
                    padding: "8px",
                    color: "#fff",
                    marginBottom: "100px",
                    float: "right",
                  }}
                >
                  close modal
                </button>
              </div>
              <br />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateProduct;
