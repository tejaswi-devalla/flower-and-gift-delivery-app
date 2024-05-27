import React, { useState, useEffect } from "react";
import axios from "axios";
import LoaderSpinner from "../../components/LoaderSpinner";
import Header from "../../components/Header";
import "../../assets/css/fonts.css";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [statusForm, setStatusForm] = useState({
    status: "Confirmed", // Default status
  });
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  // Simulating isLoading with a useEffect delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating 2 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  // Fetch data when not loading
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (filter === "All") {
      setFilteredOrders(data);
    } else {
      const filtered = data.filter((order) => order.status === filter);
      setFilteredOrders(filtered);
    }
  }, [filter, data]);

  const getData = () => {
    axios
      .get("http://localhost:5100/orders")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => {
          if (a.status === "Canceled" && b.status !== "Canceled") return 1;
          if (a.status !== "Canceled" && b.status === "Canceled") return -1;
          if (a.status === "Delivered" && b.status !== "Delivered") return 1;
          if (a.status !== "Delivered" && b.status === "Delivered") return -1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const onSubmit = (formData) => {
    axios
      .put(
        `http://localhost:5100/orders/${selectedOrderId}/${selectedProductId}`,
        formData
      )
      .then((response) => {
        setIsUpdate(false);
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onChangeStatus = (orderId, prodId) => {
    setIsUpdate(true);
    setSelectedOrderId(orderId);
    setSelectedProductId(prodId);
  };

  return (
    <>
      <Header />
      <div
        style={{
          fontFamily: "sans-serif",
          fontWeight: "500",
          fontSize: "18px",
          color: "brown",
          paddingTop: "50px",
          paddingLeft: "40px",
          paddingBottom: "20px",
          backgroundColor: "rgb(160, 155, 155, 0.5)",
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
          <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>
      <div>
        <div
          style={{
            textAlign: "start",
            paddingLeft: "40px",
            paddingRight: "40px",
            backgroundColor: "rgb(160, 155, 155, 0.5)",
          }}
        >
          {isLoading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LoaderSpinner />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minHeight: "100vh",
              }}
            >
              <div className="col-12 text-center">
                <img
                  src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRZlomJ41lC2fMqrFeASilgAY_T1Hp7rQQGpx_Iqt9sOAwl4SMd"
                  alt="No Cart Items"
                  style={{ height: "40vh", borderRadius: "20px" }}
                />
                <h3
                  className="mt-3"
                  style={{ color: "rgb(62,62,62)", fontWeight: "bold" }}
                >
                  No Orders
                </h3>
                <p style={{ color: "#787878" }}>No orders in your shop!</p>
              </div>
            </div>
          ) : (
            <div>
              {isUpdate ? (
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onSubmit(statusForm);
                    }}
                  >
                    <div className="form-group">
                      <label
                        htmlFor="statusSelect"
                        style={{
                          marginBottom: "20px",
                          fontFamily: "Varela Round",
                        }}
                      >
                        Select Status
                      </label>
                      <select
                        className="form-control"
                        id="statusSelect"
                        value={statusForm.status}
                        onChange={(e) =>
                          setStatusForm({
                            ...statusForm,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              ) : null}
              {!isUpdate ? (
                <div className="row">
                  {filteredOrders.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        margin: "10px",
                        border: "2px solid brown",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontFamily: "Noto Sans",
                            padding: "20px",
                          }}
                        >
                          <div
                            style={{
                              padding: "30px",
                            }}
                          >
                            <h5>
                              <strong>Order ID:</strong> {item._id}
                            </h5>
                            <p>
                              <strong>Fullname:</strong> {item.firstname}{" "}
                              {item.lastname}
                            </p>
                            <p>
                              <strong>Phone:</strong> {item.phone}
                            </p>
                            <p>
                              <strong>Product ID:</strong> {item.productId}
                            </p>
                            <p>
                              <strong>Product Name:</strong> {item.productName}
                            </p>
                            <p>
                              <strong>Quantity:</strong> {item.quantity}
                            </p>
                            <p>
                              <strong>Total price:</strong> {item.price}
                            </p>
                            <p>
                              <strong>Payment Method:</strong>{" "}
                              {item.paymentMethod}
                            </p>
                            <p>
                              <strong>Address:</strong> {item.address}
                            </p>
                            <p>
                              <strong>Created At:</strong> {item.createdAt}
                            </p>
                          </div>
                          <div
                            style={{
                              width: "40%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={item.image}
                                alt={item.productName}
                                style={{
                                  borderRadius: "20px",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                padding: "20px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <p>
                                <strong>Status:</strong> {item.status}
                              </p>
                              {item.status !== "Canceled" &&
                              item.status !== "Delivered" ? (
                                <button
                                  onClick={() =>
                                    onChangeStatus(item._id, item.productId)
                                  }
                                  disabled={item.status === "Delivered"}
                                  style={{
                                    backgroundColor: "brown",
                                    color: "#fff",
                                    width: "150px",
                                    padding: "15px 20px",
                                    border: "none",
                                  }}
                                >
                                  Update status
                                </button>
                              ) : (
                                ""
                              )}
                              {item.status === "Canceled" ? (
                                <button
                                  onClick={() =>
                                    onChangeStatus(item._id, item.productId)
                                  }
                                  disabled={item.status === "Canceled"}
                                  className="btn btn-danger"
                                >
                                  Customer Canceled
                                </button>
                              ) : (
                                ""
                              )}
                              {item.status === "Delivered" ? (
                                <button
                                  onClick={() =>
                                    onChangeStatus(item._id, item.productId)
                                  }
                                  disabled={item.status === "Delivered"}
                                  style={{
                                    padding: "15px 20px",
                                    border: "none",
                                    backgroundColor: "#04850d",
                                    color: "#fff",
                                  }}
                                >
                                  Delivered
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
