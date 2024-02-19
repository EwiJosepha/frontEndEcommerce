import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';



function CreateProduct() {
  const [modalVisible, setModalVisible] = useState(true);
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input7, setInput7] = useState('');
  const [similarProducts, setSimilarProducts] = useState([])

  const selectStyle = {
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '25px',
    color: '#303e6f',
    marginLeft: '-75px'
  };
  const selectStyle2 = {
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '18px',
    color: '#303e6f',
    marginLeft: '-75px'
  };

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/category`);

      return res.data;
    },
  });

  console.log(data);

  const handleselect = (id) => {
    console.log(id);
    const categorySelected = data.find((cat) => cat.categoryId == id)

    setInput5(id)
    setInput7(categorySelected.productCategory)
    // console.log(categery.productCategory);
  };

const handleSimilarProductChange = (index, key, value) => {
    const newSimilarProducts = [...similarProducts];
    newSimilarProducts[index] = { ...newSimilarProducts[index], [key]: value };
    setSimilarProducts(newSimilarProducts);
  };

  const handleSimilarProductAdd = () => {
    setSimilarProducts([...similarProducts, { key: '', value: '' }]);
  };

  const handleCreateClick = () => {
    setModalVisible(false);
  };

  const handleCloseClick = () => {
    setModalVisible(true);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        productName: input2,
        productQuantity: input3,
        productUrl: input4,
        categoryId: input5,
        similarProduts: similarProducts,
        productCategory: input7
      };

      console.log('Form Data:', formData);
      const response = await axios.post("http://localhost:3000/post", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Meal created successfully:', response.data);

    } catch (err) {
      console.log(err.message);

    }


  }



  return (
    <div>

      <h1 style={{ color: '#303e6f', textAlign: 'center', padding: '30px' }}>Register Product Details here! Thank you!.</h1>

      <div>
        {modalVisible ? (
          <div style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: '30px',
            padding: '50px',
            background: '#FFD3F8'
          }}>
            <button onClick={handleCreateClick} style={{ background: '#303e6f', borderRadius: '8px', border: 'none', padding: '10px', color: '#fff' }}>Creat Product</button>
          </div>
        ) : (

          <div style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            background: '#FFD3F8',
            color: '#303e6f'
          }}>
            <form onSubmit={handleSubmit} style={{
              maxWidth: '300px',
              height: '100%',
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
              <div style={{ paddingBottom: '10px', width: '100%' }}>
                <label style={{
                  marginBottom: "2px",
                  fontSize: "25px",
                  fontWeight: 400,
                  textAlign: "right",
                  paddingRight: "10px",
                  width: '40%'
                }}>
                  ProdName:
                  <input
                    type="text"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                    style={{ padding: '8px', width: '60%' }}
                  />
                </label>
              </div>
              <div style={{ paddingBottom: '10px', width: '100%' }}>
                <label style={{
                  marginBottom: "2px",
                  fontSize: "25px",
                  fontWeight: 400,
                  textAlign: "right",
                  paddingRight: "10px",
                  width: '40%'
                }}>
                  productQuantity:
                  <input
                    type="text"
                    value={input3}
                    onChange={(e) => setInput3(e.target.value)}
                    style={{ padding: '8px', width: '60%' }}
                  />
                </label>
              </div>
              <div style={{ paddingBottom: '10px', width: '100%' }}>
                <label style={{
                  marginBottom: "2px",
                  fontSize: "25px",
                  fontWeight: 400,
                  textAlign: "right",
                  paddingRight: "10px",
                  width: '40%'
                }}>
                  ProductUrl:
                  <input
                    type="text"
                    value={input4}
                    onChange={(e) => setInput4(e.target.value)}
                    style={{ padding: '8px', width: '60%' }}
                  />
                </label>
              </div>
              <div>
                <div style={{ paddingBottom: '10px' }}>
                <h3 style={{marginLeft: '-75px'}}>Product Category:</h3>
                  <select name="cat" style={selectStyle} onChange={(e) => handleselect(e.target.value)}>
                    {data?.map((categories, index) => (
                      <option key={index} style={selectStyle} value={categories.categoryId}>
                        {categories.productCategory}
                      </option>
                    ))}
                  </select>
                </div>
                <h3 style={{marginLeft: '-75px'}}>Similar Products:</h3>
                {similarProducts?.map((similarProduct, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={similarProduct.key}
                      onChange={(e) => handleSimilarProductChange(index, 'key', e.target.value)}
                    />
                    <input
                      type="text"
                      value={similarProduct.value}
                      onChange={(e) => handleSimilarProductChange(index, 'value', e.target.value)}
                    />
                  </div>
                ))}
                <button type="button" onClick={handleSimilarProductAdd} style={selectStyle2}> Add Similar Product</button>
              </div>


              <br />
              <div>
                <button type="submit" style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100px'
                }}>Submit</button><br />
                <button type='Button' onClick={handleCloseClick} style={{ background: '#303e6f', borderRadius: '8px', border: 'none', padding: '8px', color: '#fff', marginBottom: '100px', float: 'right' }}>close modal</button><br />
              </div>
            </form>

          </div>
        )}
      </div>

    </div>
  )
}

export default CreateProduct
