import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookies";
import styled from "styled-components";
import Header from "../Header";
import "../../assets/css/fonts.css";

// Styled components
const Container = styled.div`
  padding: 20px;
  text-align: start;
  min-height: 100vh;
  background-color: rgb(160, 155, 155, 0.5);
`;

const Heading = styled.h2`
  font-size: 24px;
  color: brown;
  margin-top: "30px";
  margin-bottom: "30px";
  margin-bottom: 30px;
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  font-family: "Varela Round";
  flec-wrap: wrap;
`;

const OrderItem = styled.li`
  padding: 16px;
`;

const Strong = styled.strong`
  font-weight: bold;
`;

const History = () => {
  const userId = Cookies.getItem("userId");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios
      .get(`http://localhost:5100/my-orders/${userId}`)
      .then((response) => {
        // Assuming response.data is an array of orders
        const sortData = response.data.sort((a) => {
          if (a.status === "Delivered") return -1;
          return 1;
        });
        setOrders(sortData);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [userId]);

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
        <Heading>My History</Heading>
        <div
          style={{
            fontFamily: "sans-serif",
            fontWeight: "500",
            fontSize: "18px",
            color: "brown",
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
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <OrderList>
          {filteredOrders.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/remove-search-from-history-2763629-2302823.png?f=webp"
                alt="No History Logo"
              />
            </div>
          ) : (
            filteredOrders.map((order) => {
              const isDelivered =
                order.status === "Delivered" || order.status === "Canceled";

              return (
                isDelivered && (
                  <div
                    key={order._id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      border:
                        order.status === "Delivered"
                          ? "1px solid green"
                          : "1px solid brown",
                      marginTop: "20px",
                      marginRight: "20px",
                      width: "48%",
                    }}
                  >
                    <OrderItem
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ paddingBottom: "5px" }}>
                        <Strong>Order ID:</Strong> {order._id} <br />
                      </div>
                      <div style={{ paddingBottom: "5px" }}>
                        <Strong>Name:</Strong> {order.firstname}{" "}
                        {order.lastname}
                        <br />
                      </div>
                      <div style={{ paddingBottom: "5px" }}>
                        <Strong>Product Name:</Strong> {order.productName}{" "}
                        <br />
                      </div>
                      <div style={{ paddingBottom: "5px" }}>
                        <Strong>Phone:</Strong> {order.phone} <br />
                      </div>
                      <div style={{ paddingBottom: "5px" }}>
                        <Strong>Date:</Strong> {order.createdAt} <br />
                      </div>
                      <div style={{ paddingBottom: "5px" }}>
                        <Strong>Price:</Strong> {order.price} <br />
                      </div>
                      <div style={{ paddingBottom: "5px" }}>
                        <Strong>Status:</Strong> {order.status} <br />
                      </div>
                      <div style={{ paddingBottom: "5px" }}>
                        <Strong>Payment Method:</Strong> {order.paymentMethod}
                        <br />
                      </div>
                    </OrderItem>

                    <div
                      style={{
                        height: "100%",
                      }}
                    >
                      <img
                        src={order.image}
                        alt={order.productName}
                        style={{ height: "100%" }}
                      />
                    </div>
                  </div>
                )
              );
            })
          )}
        </OrderList>
      </Container>
    </>
  );
};

export default History;
