import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookies";
import {
  ProductContainer,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductImage,
  Button,
  ButtonContainer,
} from "./styledComponents";

const ProductItem = ({ id, name, description, price, img }) => {
  // State to track whether the description is expanded
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleAddToCart = async () => {
    const userId = Cookies.getItem("userId"); // Get the user ID from cookies or your authentication system

    try {
      await axios.post("http://localhost:5100/add-to-cart", {
        userId,
        productId: id,
      });

      // Handle success here, you can show a success message or update the UI.
      alert("Product Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle error here, show an error message or log it.
    }
  };

  // Function to toggle the expansion of the description
  const toggleDescriptionExpansion = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <ProductContainer>
      <ProductImage src={img} alt={name} />
      <div style={{ padding: "14px" }}>
        <ProductName>{name}</ProductName>

        {isDescriptionExpanded ? (
          <ProductDescription>
            {description}
            <Button
              onClick={toggleDescriptionExpansion}
              style={{
                display: "inline-block",
                padding: 0,
                margin: 0,
                background: "none",
                border: "none",
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Show Less
            </Button>
          </ProductDescription>
        ) : (
          <ProductDescription>
            {description.slice(0, 30)}
            {description.length > 30 && (
              <>
                ...{"   "}
                <Button
                  onClick={toggleDescriptionExpansion}
                  style={{
                    display: "inline-block",
                    padding: 0,
                    margin: 0,
                    background: "none",
                    border: "none",
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  View More
                </Button>
              </>
            )}
          </ProductDescription>
        )}

        <ProductPrice>${price}</ProductPrice>
        <ButtonContainer>
          <Link
            to={`/order-details/${id}`}
            className="btn btn-primary"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "3px",
              backgroundColor: "brown",
              border: "none",
            }}
          >
            Buy Now
          </Link>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </ButtonContainer>
      </div>
    </ProductContainer>
  );
};

export default ProductItem;
