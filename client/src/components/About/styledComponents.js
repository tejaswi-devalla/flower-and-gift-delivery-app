import styled from "styled-components";

export const AboutContainer = styled.div`
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: lightgray;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: "Josefin Sans";
  display: flex;
  justify-content: space-between;
  height: 80vh;
  user-select: none;
`;

export const ParaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const Title = styled.h2`
  color: #333;
`;

export const Paragraph = styled.p`
  color: #555;
  margin-bottom: 10px;
`;

export const ContactInfo = styled.p`
  margin-top: 20px;
  font-style: italic;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
`;
export const Img = styled.img`
  height: 100%;
  width: 40vw;
`;
