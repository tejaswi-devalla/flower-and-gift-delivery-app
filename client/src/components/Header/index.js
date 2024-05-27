import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookies";
import { useEffect, useState } from "react";
import { GiButterflyFlower } from "react-icons/gi";
import "./index.css";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const token = Cookies.getItem("jwtToken");
  const adminToken = localStorage.getItem("adminJwtToken");
  const location = useLocation();

  useEffect(() => {
    if (adminToken) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [adminToken]);

  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.removeItem("adminJwtToken");
    const res = window.confirm("Are you sure you want to log out?");
    if (res) {
      localStorage.clear();
      Cookies.removeItem("jwtToken");
      navigate("/login");
    }
  };
  return (
    <div>
      {isAdmin ? (
        <Navbar expand="lg" variant="light" className="nav-bar">
          <Navbar.Brand>
            <Link
              to="/admin/dashboard"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GiButterflyFlower
                alt="flower-gift-logo"
                className="flower-gift-logo"
                color="black"
                size={60}
              />
              <h4
                style={{
                  paddingLeft: "10px",
                  color: "#000",
                  fontFamily: "Cedarville Cursive",
                }}
              >
                Floret
              </h4>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse
            id="navbarSupportedContent"
            className="nav-bar-items"
          >
            <Nav className="mr-auto">
              <NavLink
                to="/admin/dashboard"
                className={`nav-link ${
                  location.pathname === "/admin/dashboard" ? "active-nav" : ""
                }`}
              >
                Home
              </NavLink>
              <NavLink
                to="/admin/all-products"
                className={`nav-link ${
                  location.pathname === "/admin/all-products"
                    ? "active-nav"
                    : ""
                }`}
              >
                Products
              </NavLink>
              <NavLink
                to="/admin/orders"
                className={`nav-link ${
                  location.pathname === "/admin/orders" ? "active-nav" : ""
                }`}
              >
                Orders
              </NavLink>
              <NavLink
                to="/admin/users"
                className={`nav-link ${
                  location.pathname === "/admin/users" ? "active-nav" : ""
                }`}
              >
                Users
              </NavLink>

              {!adminToken ? (
                <NavLink
                  as={NavLink}
                  to={location.pathname === "/login" ? "/signup" : "/login"}
                  className={`nav-link ${
                    location.pathname === "/login" ||
                    location.pathname === "/signup"
                      ? "active-nav"
                      : ""
                  }`}
                >
                  {location.pathname === "/login" ? "Signup" : "Login"}
                </NavLink>
              ) : (
                <NavLink className="nav-link" to="/login" onClick={onLogout}>
                  Logout
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar expand="lg" variant="light" className="nav-bar">
          <Navbar.Brand>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GiButterflyFlower
                alt="flower-gift-logo"
                className="flower-gift-logo"
                color="black"
                size={60}
              />
              <h4
                style={{
                  paddingLeft: "10px",
                  color: "#000",
                  fontFamily: "Cedarville Cursive",
                }}
              >
                Floret
              </h4>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse
            id="navbarSupportedContent"
            className="nav-bar-items"
          >
            <Nav className="ml-auto">
              <NavLink
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active-nav" : ""
                }`}
              >
                Home
              </NavLink>
              <NavLink
                to="/shopping"
                className={`nav-link ${
                  location.pathname === "/shopping" ? "active-nav" : ""
                }`}
              >
                Shop
              </NavLink>
              <NavLink
                to="/my-cart"
                className={`nav-link ${
                  location.pathname === "/my-cart" ? "active-nav" : ""
                }`}
              >
                MyCart
              </NavLink>
              <NavLink
                to="/my-orders"
                className={`nav-link ${
                  location.pathname === "/my-orders" ? "active-nav" : ""
                }`}
              >
                Orders
              </NavLink>
              <NavLink
                to="/my-history"
                className={`nav-link ${
                  location.pathname === "/my-history" ? "active-nav" : ""
                }`}
              >
                History
              </NavLink>

              {!token ? (
                <NavLink
                  as={NavLink}
                  to={location.pathname === "/login" ? "/signup" : "/login"}
                  className={`nav-link ${
                    location.pathname === "/login" ||
                    location.pathname === "/signup"
                      ? "active-nav"
                      : ""
                  }`}
                >
                  {location.pathname === "/login" ? "Signup" : "Login"}
                </NavLink>
              ) : (
                <NavLink className="nav-link" to="/login" onClick={onLogout}>
                  Logout
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
  );
};

export default Header;
