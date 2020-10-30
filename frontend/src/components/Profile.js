import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";

export const Profile = ({
  userReservation,
  userData,
  setUserData,
  setUserReservation,
}) => {
  if (localStorage.getItem("confirmationId") === null) {
    return (
      <ProfileContainer>
        <ProfileTitle>Profile</ProfileTitle>
        <NoProfileYetText>
          A profile will automatically be created when you reserve a seat on a
          flight.
        </NoProfileYetText>
        <NoStyleLink to="/">
          <StyledButton>Pick a flight</StyledButton>
        </NoStyleLink>
      </ProfileContainer>
    );
  } else {
    const localStorageUserData = JSON.parse(localStorage.userData);

    const handleChange = (val, item) => {
      setUserData({ ...userData, [item]: val });
      setUserReservation({ ...userReservation, [item]: val });
    };

    const updateUser = (ev) => {
      ev.preventDefault();
      fetch(`/api/v1/profiles/${localStorageUserData.email}`, {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }).then((res) => res.json());
      console.log(userData);
    };

    return (
      <ProfileContainer>
        <ProfileTitle>Profile</ProfileTitle>

        <UpdateForm>
          <InputLabel htmlFor="givenName">First name:</InputLabel>
          <input
            type="text"
            name="givenName"
            value={userReservation.givenName}
            onChange={(ev) => handleChange(ev.target.value, "givenName")}
          />
          <InputLabel htmlFor="lastName">Last name:</InputLabel>
          <input
            type="text"
            name="lastName"
            value={`${userReservation.surname}`}
            onChange={(ev) => handleChange(ev.target.value, "surname")}
          />
          <InputLabel htmlFor="email">Email:</InputLabel>
          <input
            type="email"
            name="email"
            value={`${userReservation.email}`}
            placeholder={`${userReservation.email}`}
            disabled={true}
          />
          <StyledButton type="submit" onClick={updateUser}>
            Save Changes
          </StyledButton>
        </UpdateForm>

        <NoStyleLink to="/view-reservation">
          <StyledButton>See my reservation(s)</StyledButton>
        </NoStyleLink>
      </ProfileContainer>
    );
  }
};

const ProfileContainer = styled.div`
  border: 2px solid ${themeVars.alabamaCrimson};
  padding: 20px;
  margin: 50px auto;
  background: ${themeVars.selectiveYellow};
`;

const ProfileTitle = styled.h1`
  font-size: 75px;
`;

const NoProfileYetText = styled.h2`
  color: ${themeVars.alabamaCrimson};
  font-family: monospace;
  margin: 25px;
  padding: 50px 0;
  max-width: 600px;
`;

const StyledButton = styled.button`
  background: ${themeVars.alabamaCrimson};
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  color: ${themeVars.selectiveYellow};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${themeVars.headingFont};
  font-size: 18px;
  height: 68px;
  margin: 25px 0;
  padding: 0 14px;
  width: 100%;
  text-decoration: none;
  transition: all ease 200ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background: ${themeVars.selectiveYellow};
    color: ${themeVars.alabamaCrimson};
    border-color: ${themeVars.alabamaCrimson};
  }
`;

const NoStyleLink = styled(Link)`
  text-decoration: none;
`;

const UpdateForm = styled.form`
  width: 300px;
  padding: 5px 0;
`;

const InputLabel = styled.label`
  line-height: 50px;
`;
