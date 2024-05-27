import styled from "styled-components";

export const ProductContainer = styled.div`
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #fff;
`;

export const ProductName = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 2px;
  margin-top: 10px;
  font-family: "DM Sans";
  font-weight: bolder;
`;

export const ProductDescription = styled.p`
  color: #555;
  margin-bottom: 10px;
  font-family: "Milonga";
  margin-top: 13px;
`;

export const ProductPrice = styled.p`
  font-weight: bold;
  color: brown;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 260px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  transition: transform 0.3s ease-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-family: "DM Sans";
`;

export const Button = styled.button`
  border: solid 1px #a1784f;
  padding: 8px 16px;
  background-color: transparent;
  color: black;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a1784f;
  }
`;
