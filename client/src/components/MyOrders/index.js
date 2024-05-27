import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookies";
import styled from "styled-components";
import Header from "../Header";

// Styled components
const Container = styled.div`
  background: lightgray;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  text-align: start;
  min-height: 100vh;
  font-family: "Rajdhani";
  font-weight: 400;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: brown;
  margin-top: "30px";
  margin-bottom: "30px";
  margin-bottom: 30px;
`;

const OrderList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
`;

const OrderItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  padding: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  border: solid 1px brown;
`;

const Strong = styled.strong`
  font-weight: bold;
`;

const MyOrders = () => {
  const userId = Cookies.getItem("userId");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios
      .get(`http://localhost:5100/my-orders/${userId}`)
      .then((response) => {
        // Assuming response.data is an array of orders
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [userId]); // Include userId in the dependency array to re-fetch orders when it changes
  const handleCancelOrder = (orderId, prodId) => {
    if (window.confirm("Are you sure you want to cancel the order?")) {
      axios
        .put(`http://localhost:5100/cancel-order/${orderId}/${prodId}`, {
          status: "Canceled",
        })
        .then((response) => {
          setOrders(response.data);
          window.alert("Order Canceled Successfully");
        })
        .catch((error) => {
          console.error("Error Canceling Order: ", error);
          window.alert("Error Canceling Order");
        });
    }
  };

  useEffect(() => {
    if (filter === "All") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === filter);
      setFilteredOrders(filtered);
    }
  }, [filter, orders]);

  return (
    <>
      <Header />
      <Container>
        <Heading>My Orders</Heading>
        <div
          style={{
            fontFamily: "sans-serif",
            fontWeight: "500",
            fontSize: "18px",
            color: "brown",
            marginBottom: "20px",
          }}
        >
          <label htmlFor="filter">Status:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              outline: "none",
              marginLeft: "20px",
              border: "none",
              padding: "6px",
              borderRadius: "5px",
            }}
          >
            <option value="All">All</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
          </select>
        </div>
        {filteredOrders.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "60vh",
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSChE0cO2l-3y-SfaaMASaFZqKgHz3COnfU8A&s"
              alt="No Orders"
              style={{ height: "40vh", width: "400px", borderRadius: "20px" }}
            />
          </div>
        ) : (
          <OrderList>
            {filteredOrders.map(
              (order, index) =>
                order.status !== "Delivered" &&
                order.status !== "Canceled" && (
                  <OrderItem key={index}>
                    <div>
                      <Strong>Order ID:</Strong> {order._id} <br />
                      <Strong>Name:</Strong> {order.firstname} {order.lastname}{" "}
                      <br />
                      <Strong>Product Name:</Strong> {order.productName} <br />
                      <Strong>Phone:</Strong> {order.phone} <br />
                      <Strong>Date:</Strong> {order.createdAt} <br />
                      <Strong>Price:</Strong> {order.price} <br />
                      <Strong>Status:</Strong> {order.status} <br />
                      <Strong>Payment Method:</Strong> {order.paymentMethod}
                      <br />
                      {filteredOrders.status !== "Shipped" &&
                        filteredOrders.status !== "Confirmed" &&
                        filteredOrders.status !== "Canceled" && (
                          <button
                            style={{
                              backgroundColor: "brown",
                              border: "None",
                              padding: "15px",
                              color: "#fff",
                              marginTop: "15px",
                            }}
                            onClick={() =>
                              handleCancelOrder(order._id, order.productId)
                            }
                          >
                            Cancel Order
                          </button>
                        )}
                    </div>
                    <div style={{ backgroundColor: "black" }}>
                      <img
                        src={order.image}
                        alt={order.productName}
                        style={{
                          backgroundPosition: "right",
                          backgroundAttachment: "fixed",
                          height: "100%",
                        }}
                      />
                    </div>
                  </OrderItem>
                )
            )}
          </OrderList>
        )}
      </Container>
    </>
  );
};

export default MyOrders;
