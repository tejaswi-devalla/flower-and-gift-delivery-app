import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import ProductItem from "../ProductItem";
import { Carousel } from "react-bootstrap";
import Header from "../Header";

const ProductsContainer = styled.div`
  background-color: lightgray;
  text-align: start;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  padding: 30px;
  width: 100%;
`;

const ListItem = styled.li`
  margin-right: 30px;
  margin-bottom: 20px;
  max-width: 270px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const CategoryFilter = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const BottomContainer = styled.div`
  display: flex;
  height: 130vh;
`;
const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Products = () => {
  const api = "http://localhost:5100/products";
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all"); // State for selected category
  const carouselRef = useRef(null);

  useEffect(() => {
    // Fetch products from the API and update the state
    fetch(api)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    const interval = 5000;
    let carouselInterval;

    const handleNext = () => {
      carouselRef.current.next();
    };

    carouselInterval = setInterval(handleNext, interval);

    return () => {
      clearInterval(carouselInterval);
    };
  }, []);

  // Function to handle changes in the search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle changes in the category filter
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Function to filter products based on the selected category and search query
  const filteredProducts = products.filter((product) => {
    const productNameMatchesSearch =
      product.productname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery.trim() === "";

    if (selectedCategory === "all") {
      return productNameMatchesSearch;
    } else {
      return (
        productNameMatchesSearch &&
        product.category.toLowerCase() === selectedCategory
      );
    }
  });

  // Get unique category values from products
  const categories = [
    ...new Set(products.map((product) => product.category.toLowerCase())),
  ];

  // Add 'All' as an option to select all categories
  categories.unshift("all");

  return (
    <>
      <Header />
      <ProductsContainer>
        <Carousel ref={carouselRef} style={{ backgroundAttachment: "fixed" }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://roisin.qodeinteractive.com/wp-content/uploads/2020/03/h1-rev-05.jpg"
              alt="First slide"
              style={{ height: "80vh" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://roisin.qodeinteractive.com/wp-content/uploads/2020/03/h1-rev-03.jpg"
              alt="Second slide"
              style={{ height: "80vh" }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://roisin.qodeinteractive.com/wp-content/uploads/2020/03/h1-rev-04.jpg"
              alt="Third slide"
              style={{ height: "80vh" }}
            />
          </Carousel.Item>
        </Carousel>
        <BottomContainer>
          <FiltersContainer
            style={{
              fontFamily: "Comfortaa",
              display: "flex",
              flexDirection: "column",
              padding: "40px",
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "15px",
              height: "50vh",
            }}
          >
            <div className="w-100">
              <h3 style={{ fontSize: "20px" }}>Product Name</h3>
              <SearchBar
                type="text"
                placeholder="Search by product name"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ outline: "none" }}
              />
            </div>

            {/* Create the category filter dropdown */}
            <div className="w-100">
              <h3 style={{ fontSize: "20px" }}>Category</h3>
              <CategoryFilter
                onChange={handleCategoryChange}
                value={selectedCategory}
                style={{ outline: "none" }}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </CategoryFilter>
            </div>
          </FiltersContainer>
          <StyledList>
            {filteredProducts.map((product) => (
              <ListItem key={product._id}>
                <ProductItem
                  id={product._id}
                  img={product.image}
                  name={product.productname}
                  description={product.description}
                  price={product.price}
                />
              </ListItem>
            ))}
          </StyledList>
        </BottomContainer>
      </ProductsContainer>
    </>
  );
};

export default Products;
