import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";

export const Profile = ({
  userReservation,
  userData,
  setUserData,
  setUserReservation,
  formData,
}) => {
  if (localStorage.getItem("userData") === null) {
    return (
      <ProfileContainer>
        <ProfileTitle>Profile</ProfileTitle>
        <NoProfileYetText>
          You need to sign in to see your profile.
        </NoProfileYetText>
        <NoStyleLink to="/">
          <StyledButton>Sign in</StyledButton>
        </NoStyleLink>
      </ProfileContainer>
    );
  } else {
    const localStorageUserData = JSON.parse(localStorage.userData);
    console.log(localStorageUserData.email);

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
      <Wrapper>
        <MessageBoard>
          <ConfirmationTitle>Your profile</ConfirmationTitle>
          <ListContainer>
            <ReservatoinDetails>
              <span>Reservation #:</span>
              {formData.id}
              {/* <span>Reservation #:</span> {form.id} */}
            </ReservatoinDetails>
            <ReservatoinDetails>
              <span>Flight #:</span> {formData.flight}
            </ReservatoinDetails>
            <ReservatoinDetails>
              <span>Seat #:</span> {formData.seat}
            </ReservatoinDetails>
            <ReservatoinDetails>
              <span>Name:</span> {formData.givenName} {formData.surname}
            </ReservatoinDetails>
            <ReservatoinDetails>
              <span>Email:</span> {formData.email}
            </ReservatoinDetails>
          </ListContainer>
        </MessageBoard>
      </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px - 110px);
`;

const MessageBoard = styled.div`
  border: 2px solid ${themeVars.alabamaCrimson};
  padding: 30px;
  border-radius: 5px;
`;

const ConfirmationTitle = styled.h1`
  font-size: 28px;
  font-family: monospace;
  color: ${themeVars.alabamaCrimson};
  border-bottom: 2px solid ${themeVars.alabamaCrimson};
  padding-bottom: 10px;
`;

const ListContainer = styled.ul`
  padding: 10px 0;
  font-size: 21px;

  li > span {
    font-weight: 700;
  }
`;

const ReservatoinDetails = styled.li`
  padding: 10px 0;
  font-size: 18px;
`;
