import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductItem from "../ProductItem";
import Cookies from "js-cookies";
import axios from "axios";
import Header from "../../components/Header";

const ProductsContainer = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(160, 155, 155, 0.5);
  padding: 40px;
  text-align: start;
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const CategoryFilter = styled.select`
  width: 10%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  outline: none;
`;

const StyledList = styled.ul`
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
  width: 100%;
`;

const ListItem = styled.li`
  width: 19%;
  margin: 6px;
`;

const AdminProducts = () => {
  const api = "http://localhost:5100/products";
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleDeleteProduct = async (id) => {
    Cookies.getItem("userId");
    try {
      await axios.delete(`http://localhost:5100/products/${id}`);
      getData();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") {
      return true;
    } else {
      return product.category === selectedCategory;
    }
  });

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <>
      <Header />
      <ProductsContainer>
        <FilterContainer>
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "22px",
              color: "brown",
            }}
          >
            Category:
          </p>
          <CategoryFilter
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="all">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </CategoryFilter>
        </FilterContainer>
        <StyledList>
          {filteredProducts.map((product) => (
            <ListItem key={product._id}>
              <ProductItem
                id={product._id}
                img={product.image}
                name={product.productname}
                description={product.description}
                price={product.price}
                handleDeleteProduct={handleDeleteProduct}
              />
            </ListItem>
          ))}
        </StyledList>
      </ProductsContainer>
    </>
  );
};

export default AdminProducts;
