/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookies";
import styled from "styled-components";
import { CiCircleRemove } from "react-icons/ci";
import Header from "../Header";
import CheckoutCart from "../CheckoutCart";

// Styled components
const CartContainer = styled.div`
  background-color: lightgray;
  display: flex;
  max-width: 100%;
  text-align: start;
  min-height: 100vh;
`;

const Cart = styled.div`
  font-family: "Rajdhani";
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 70%;
  margin: 20px;
`;
const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 160px;
  margin: 20px;
`;

const ProductImage = styled.img`
  width: 200px;
  height: inherit;
`;

const ProductCont = styled.div`
  color: brown;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: inherit;
  width: 100%;
  padding: 20px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 20px;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;
`;

const AmountCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 20px;
  color: brown;
  font-family: "Rajdhani";
`;

const MyCart = () => {
  const userId = Cookies.getItem("userId");
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    getProductsList();
  }, []);

  useEffect(() => {
    calculateTotalAmount(cartData);
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  useEffect(() => {
    const savedCartData = JSON.parse(localStorage.getItem("cartData"));
    if (savedCartData) {
      setCartData(savedCartData);
      calculateTotalAmount(savedCartData);
    }
  }, []);

  const getProductsList = () => {
    axios
      .get(`http://localhost:5100/cart/${userId}`)
      .then((response) => {
        const updatedCartData = response.data.map((item) => ({
          ...item,
          quantity: localStorage.getItem(`${item._id}_quantity`) || 1,
          countInStock: item.countInStock - 1,
        }));
        setCartData(updatedCartData);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  const handleCancelClick = (productId) => {
    // Send a DELETE request to remove the product from the cart
    axios
      .delete(`http://localhost:5100/remove-from-cart/${productId}`)
      .then(() => {
        setCartData((prevCartData) =>
          prevCartData.filter((item) => item.productId !== productId)
        );
        localStorage.removeItem(`${productId}_quantity`);
        getProductsList();
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    localStorage.setItem(`${productId}_quantity`, newQuantity);
  };
  const calculateTotalAmount = (data) => {
    const total = data.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotalAmount(total);
  };

  const clearCartData = () => {
    Promise.all(
      cartData.map((item) =>
        axios.delete(`http://localhost:5100/remove-from-cart/${item._id}`)
      )
    )
      .then(() => {
        localStorage.clear();
        setCartData([]);
        Object.keys(localStorage).forEach((key) => {
          if (key.includes("_quantity")) {
            localStorage.removeItem(key);
          }
        });
      })
      .catch((error) => {
        console.error("Error removing products from cart:", error);
      });
  };

  return (
    <>
      <Header />
      <CartContainer>
        {cartData.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-3613108-3020773.png"
              alt="Cart Empty"
            />
          </div>
        ) : (
          <>
            <Cart>
              <h1 style={{ fontSize: "20px", color: "brown" }}>My Cart</h1>
              <hr
                style={{
                  width: "100%",
                  color: "brown",
                  border: "solid 1px",
                }}
              />
              {cartData.map((item) => (
                <React.Fragment key={item._id}>
                  <CartItem>
                    <ProductImage src={item.image} alt="Product" />
                    <ProductCont>
                      <ProductInfo>
                        <ProductName>{item.productname}</ProductName>
                        <ProductPrice>Price: ${item.price}</ProductPrice>
                      </ProductInfo>
                      <ActionButtons>
                        <h1 style={{ fontSize: "20px", color: "brown" }}>
                          Quantity:{" "}
                        </h1>
                        <input
                          type="number"
                          min="1"
                          max={item.countInStock + 1}
                          defaultValue={item.quantity}
                          onChange={(e) => {
                            let newQuantity = parseInt(e.target.value);
                            newQuantity = !newQuantity
                              ? 1
                              : Math.min(newQuantity, item.countInStock + 1);
                            const updatedItem = {
                              ...item,
                              quantity: newQuantity,
                            };
                            updateQuantity(item._id, newQuantity);
                            calculateTotalAmount([
                              ...cartData.filter(
                                (cartItem) => cartItem._id !== item._id
                              ),
                              updatedItem,
                            ]);
                          }}
                          onKeyDown={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            const currentValue =
                              e.target.value + String.fromCharCode(charCode);
                            const allowedKeys = [
                              "0",
                              "1",
                              "2",
                              "3",
                              "4",
                              "5",
                              "6",
                              "7",
                              "8",
                              "9",
                              "Backspace",
                              "Delete",
                            ];
                            if (
                              !allowedKeys.includes(e.key) ||
                              currentValue > item.countInStock + 1
                            ) {
                              e.preventDefault();
                              alert(
                                `Available Quantity: ${item.countInStock + 1}`
                              );
                            }
                          }}
                          style={{
                            width: "60px",
                            textAlign: "center",
                            outline: "none",
                          }}
                        />

                        <button
                          className="btn"
                          title="Remove"
                          onClick={() => handleCancelClick(item._id)}
                        >
                          <CiCircleRemove size={30} color="brown" />
                        </button>
                      </ActionButtons>
                    </ProductCont>
                  </CartItem>
                  <hr
                    style={{
                      width: "100%",
                      color: "brown",
                      border: "solid 1px",
                    }}
                  />
                </React.Fragment>
              ))}
            </Cart>
            <AmountCont>
              <h1 style={{ fontSize: "20px" }}>Order Summary</h1>

              <hr
                style={{ width: "100%", color: "brown", border: "solid 1px" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h1
                  style={{
                    fontSize: "24px",
                  }}
                >
                  Subtotal:
                </h1>
                <h1
                  style={{
                    fontSize: "24px",
                  }}
                >
                  ${totalAmount}
                </h1>
              </div>
              <h1
                style={{
                  fontSize: "16px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Estimate Delivery
              </h1>
              <hr
                style={{ width: "100%", color: "brown", border: "solid 1px" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h1
                  style={{
                    fontSize: "24px",
                  }}
                >
                  Total Amount:
                </h1>
                <h1
                  style={{
                    fontSize: "24px",
                  }}
                >
                  ${totalAmount}
                </h1>
              </div>
              <hr
                style={{ width: "100%", color: "brown", border: "solid 1px" }}
              />
              <CheckoutCart clearCartData={clearCartData} />
            </AmountCont>
          </>
        )}
      </CartContainer>
    </>
  );
};

export default MyCart;
