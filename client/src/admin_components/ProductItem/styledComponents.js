import styled from "styled-components";

export const ProductContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-bottom: 15px;
  background-color: transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
`;

export const ProductContentCont = styled.div`
  padding: 20px;
  border-radius: 20px;
  background-color: white;
`;

export const ProductName = styled.h3`
  font-size: 18px;
  color: black;
  margin-bottom: 2px;
  margin-top: 10px;
  font-family: sans-serif;
`;

export const ProductDescription = styled.p`
  color: #555;
  margin-bottom: 10px;
`;

export const ProductPrice = styled.p`
  font-weight: bold;
  color: brown;
`;

export const ProductImage = styled.img`
  background-size: cover;
  overflow: hidden;
  width: inherit;
  height: 260px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 20vw;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;
