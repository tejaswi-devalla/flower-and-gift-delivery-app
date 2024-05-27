import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./style.css"; // Import your custom CSS for styling
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../../assets/css/fonts.css";
import Header from "../../components/Header";

const Button = styled.button`
  background-color: transparent;
  border: solid 1px #8f9070;
  color: "black";
  border-radius: 10px;
  padding: 10px 20px;
  &:hover {
    background-color: #886a51;
  }
`;

const Dashboard = () => {
  const [data, setData] = useState({
    products: 0,
    users: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, productsResponse, ordersResponse] =
          await Promise.all([
            axios.get("http://localhost:5100/users"),
            axios.get("http://localhost:5100/products"),
            axios.get("http://localhost:5100/orders"),
          ]);

        setData({
          users: usersResponse.data.length,
          products: productsResponse.data.length,
          orders: ordersResponse.data.length,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="dashboard container1">
        <div className="card-container">
          <Card>
            <Card.Img
              src="https://res.cloudinary.com/tejaswi/image/upload/c_thumb,w_200,g_face/v1712214586/flower-logo_ik1vh2.png"
              style={{
                overflow: "hidden",
                backgroundSize: "cover",
                maskImage: "linear-gradient(to top, transparent, black)",
                height: "30vh",
              }}
            />

            <Card.Body>
              <Card.Title>Product Count</Card.Title>
              <Card.Text>{data.products} Products</Card.Text>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/admin/all-products"}
              >
                <Button>View Products</Button>
              </Link>
            </Card.Body>
          </Card>

          <Card>
            <Card.Img
              src="https://cdn.dribbble.com/users/466214/screenshots/2902927/media/2ce556ade137597ff834c8f666a27bad.png?resize=768x576&vertical=center"
              style={{
                overflow: "hidden",
                backgroundSize: "cover",
                maskImage: "linear-gradient(to top, transparent, black)",
                height: "30vh",
              }}
            />
            <Card.Body>
              <Card.Title>User Count</Card.Title>
              <Card.Text>{data.users} Users</Card.Text>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/admin/users"}
              >
                <Button>View Users </Button>
              </Link>
            </Card.Body>
          </Card>

          <Card>
            <Card.Img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLP9Up1L3HDd0SYb1d0RuvHJT-PdHNb2z0_Q&s"
              style={{
                overflow: "hidden",
                backgroundSize: "cover",
                maskImage: "linear-gradient(to top, transparent, black)",
                height: "30vh",
              }}
            />
            <Card.Body>
              <Card.Title>Order Count</Card.Title>
              <Card.Text>{data.orders} Orders</Card.Text>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/admin/orders"
              >
                <Button>View Orders</Button>
              </Link>
            </Card.Body>
          </Card>

          <Card>
            <Card.Img
              src="https://s3.envato.com/files/298534671/seeeee%20(35).jpg"
              style={{
                overflow: "hidden",
                backgroundSize: "cover",
                maskImage: "linear-gradient(to top, transparent, black)",
                height: "30vh",
              }}
            />
            <Card.Body>
              <Card.Title>Add Product</Card.Title>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/admin/add-product"
              >
                <Button style={{ width: "100px" }}>Add</Button>
              </Link>
            </Card.Body>
          </Card>

          <Card>
            <Card.Img
              src="https://design-milk.com/images/2012/04/DesignSoil-14-Fadeless.jpg"
              style={{
                overflow: "hidden",
                backgroundSize: "cover",
                maskImage: "linear-gradient(to top, transparent, black)",
                height: "30vh",
              }}
            />
            <Card.Body>
              <Card.Title>Add Category</Card.Title>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/admin/add-category"
              >
                <Button style={{ width: "100px" }}>Add</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
