import React from "react";
import {
  HomeContainer,
  Container,
  CenteredRow,
  ContentColumn,
  Heading,
  Paragraph,
  PrimaryButton,
} from "./styledComponents";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import About from "../About";
import Offer from "../Offer";
import Header from "../Header";

const Home = () => {
  return (
    <>
      <Header />
      <HomeContainer>
        <Container>
          <CenteredRow>
            <ContentColumn>
              <Heading>Welcome to Our Flower and Gift Store</Heading>
              <Paragraph>Is There Such a Thing as Too Many Flowers?</Paragraph>
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
            </ContentColumn>
          </CenteredRow>
        </Container>
      </HomeContainer>
      <About />
      <Offer />
      <Footer />
    </>
  );
};

export default Home;
