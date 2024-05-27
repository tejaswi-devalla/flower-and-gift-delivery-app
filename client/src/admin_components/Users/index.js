import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Header from "../../components/Header";
import "../../assets/css/fonts.css";

// Styled components

const ListContainer = styled.div`
  min-height: 100vh;
  background-color: rgb(160, 155, 155, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 50px;
  padding-left: 40px;
  padding-right: 40px;
  font-family: "Varela Round";
`;
const UserListContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
`;

const UserItem = styled.div`
  border: 1px solid brown;
  padding: 30px;
  margin: 10px 20px;
`;

const UserName = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const UserEmail = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5100/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <ListContainer>
        <UserListContainer>
          {users.map((user) => (
            <UserItem key={user._id}>
              <p>
                <strong>UserId: {user._id}</strong>
              </p>
              <UserName>UserName: {user.username}</UserName>
              <UserEmail>Email: {user.email}</UserEmail>
            </UserItem>
          ))}
        </UserListContainer>
      </ListContainer>
    </>
  );
};

export default Users;
