import React from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "./styledComponents";
import "./index.css";

function Offer() {
  return (
    <div className="offer-container">
      <div className="inside-offer-cont">
        <h1 className="offer-text">
          10% Off On Selected Flowers for Mother's Day
        </h1>
        <p className="offer-para">
          This Mother's Day, show your love and appreciation with a stunning
          bouquet of flowers, and enjoy 10% off your purchase! Our handpicked
          arrangements feature the season's most beautiful blooms, perfect for
          brightening your mom's day. Place your order now and make this
          Mother's Day one to remember!
        </p>
        <Link
          to="/shopping"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bolder",
          }}
        >
          <PrimaryButton>Shop Now</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}

export default Offer;
