import styled from "styled-components";
import "../../assets/css/fonts.css";

export const HomeContainer = styled.section`
  background: linear-gradient(rgba(20, 20, 20, 0.5), rgba(20, 20, 20, 0.5)),
    url("https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Flower%20Shop/02.jpg");
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const CenteredRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ContentColumn = styled.div`
  flex: 1;
  text-align: center;
`;

export const Heading = styled.h2`
  font-size: 3rem;
  margin-bottom: 15px;
  font-family: "Varela Round";
  font-weight: 400;
  font-style: normal;
`;

export const Paragraph = styled.p`
  font-size: 30px;
  color: #fff;
  margin-bottom: 20px;
  font-family: "Cedarville Cursive";
  font-weight: 500;
  font-style: normal;
`;

export const PrimaryButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  font-family: "Courier New", Courier, monospace;
  background-color: transparent;
  border: solid 1px gray;
  padding: 20px 40px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: gray;
  }
`;
