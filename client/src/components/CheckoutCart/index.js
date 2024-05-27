import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookies";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  color: brown;
`;

const Form = styled.form`
  border-radius: 10px;
  width: 100%;
  margin-top: 20px;
  font-weight: 500;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;
const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: brown;
  width: 100%;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
`;

const CheckoutCart = ({ clearCartData }) => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
  });

  const userId = Cookies.getItem("userId");
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cartItems = cartData.map((item) => ({
        productId: item._id,
        productName: item.productname,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
      }));

      await axios.post("http://localhost:5100/cart-orders", {
        ...orderDetails,
        user: userId,
        items: cartItems,
        totalAmount: cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
        status: "Pending",
      });
      clearCartData();
      alert("Order created");
      navigate("/shopping");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <h2>Order Details</h2>
          <FormField>
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstname"
              value={orderDetails.firstname}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastname"
              value={orderDetails.lastname}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Phone</Label>
            <Input
              type="text"
              name="phone"
              value={orderDetails.phone}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={orderDetails.address}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Payment Method</Label>
            <Select
              name="paymentMethod"
              value={orderDetails.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="cod">Cash on Delivery (COD)</option>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </Select>
          </FormField>
          <Button type="submit">Place Order</Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CheckoutCart;
