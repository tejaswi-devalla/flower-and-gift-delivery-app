import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

const commonFields = [
  { controlId: "firstName", label: "FirstName", type: "text" },
  { controlId: "lastName", label: "LastName", type: "text" },
  { controlId: "username", label: "UserName", type: "text" },
  { controlId: "email", label: "Email", type: "email" },
  { controlId: "password", label: "Password", type: "password" },
];

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, username, email, password } = formData;
    const response = await fetch("http://localhost:5100/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, username, email, password }),
    });
    try {
      if (response.ok) {
        const data = await response.json();
        alert(`${data.message}`);
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      alert(`Error during registration: ${error}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Header />

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          paddingTop: "10vh",
          paddingBottom: "10px",
        }}
      >
        <Card className="shadow p-4" style={{ width: "400px" }}>
          <Card.Body>
            <h2
              className="mb-4"
              style={{ fontFamily: "Cedarville Cursive", fontWeight: "bolder" }}
            >
              Sign Up
            </h2>
            <Form onSubmit={handleSubmit}>
              {commonFields.map((field) => (
                <Form.Group
                  style={{ textAlign: "start", marginBottom: "10px" }}
                  controlId={field.controlId}
                  key={field.controlId}
                >
                  <Form.Label style={{ fontFamily: "Recursive" }}>
                    {field.label}
                  </Form.Label>
                  <Form.Control
                    type={field.type}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    name={field.controlId}
                    value={formData[field.controlId]}
                    onChange={handleInputChange}
                    required
                    style={{ fontFamily: "Recursive", padding: "10px" }}
                  />
                </Form.Group>
              ))}
              <Button
                type="submit"
                className="w-100 mt-3"
                style={{
                  marginBottom: "10px",
                  backgroundColor: "brown",
                  border: "none",
                  color: "#000",
                  fontWeight: "bold",
                  fontFamily: "Recursive",
                }}
              >
                Sign Up
              </Button>
            </Form>
            <p style={{ fontFamily: "Recursive", marginTop: "15px" }}>
              Already have an account? <Link to="/login">Log In</Link>
            </p>
            {/* <div className="w-100 text-center mt-3">
                        
                    </div> */}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Registration;
