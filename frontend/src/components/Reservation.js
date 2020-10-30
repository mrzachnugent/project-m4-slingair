import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { themeVars } from "./GlobalStyles";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Reservation = ({ userReservation, setUserReservation }) => {
  const [allUserRes, setAllUserRes] = useState([]);
  const localStorageUserData = JSON.parse(localStorage.userData);

  useEffect(() => {
    fetch("/api/v1/reservations")
      .then((res) => res.json())
      .then((json) => json.data)
      .then((allRes) => {
        const newArr = allRes.filter((reserve) => {
          if (
            reserve.givenName === `${userReservation.givenName}` &&
            reserve.surname === `${userReservation.surname}` &&
            reserve.email === `${userReservation.email}`
          ) {
            return true;
          }
        });
        return newArr;
      })
      .then((userRes) => setAllUserRes(userRes));
  }, [userReservation]);

  return (
    <AllReservationsContainer>
      <ReservationTitle>Reservations</ReservationTitle>
      {allUserRes.map((res, index) => {
        return (
          <SingleReservationContainer key={index}>
            <ReservationInfo>
              <span>Reservation #:</span> {res.id}
            </ReservationInfo>
            <ReservationInfo>
              <span>Name:</span> {res.surname}, {res.givenName}
            </ReservationInfo>
            <ReservationInfo>
              <span>Flight:</span> {res.flight}
            </ReservationInfo>
            <ReservationInfo>
              <span>Seat:</span> {res.seat}
            </ReservationInfo>
            <ButtonDiv>
              <NoStyleLink to={`/view-reservation/${res.id}`}>
                <Button>Change Seat</Button>
              </NoStyleLink>
              <NoStyleLink to="/profile">
                <Button
                  className="delete"
                  onClick={() => {
                    fetch(`/api/v1/reservations/${res.id}`, {
                      method: "DELETE",
                    })
                      .then((res) => res.json())
                      .then((res) => {});
                  }}
                >
                  Delete
                </Button>
              </NoStyleLink>
            </ButtonDiv>
          </SingleReservationContainer>
        );
      })}
    </AllReservationsContainer>
  );
};

const AllReservationsContainer = styled.div`
  border: 2px solid ${themeVars.alabamaCrimson};
  padding: 20px 50px;
  margin: 50px auto;
  background: ${themeVars.selectiveYellow};
`;

const ReservationTitle = styled.h1`
  font-size: 75px;
  padding-bottom: 15px;
`;

const SingleReservationContainer = styled.div`
  padding: 25px 0;
  background: ${themeVars.orange};
  border-radius: 50px;
  margin: 25px 0;
`;

const ButtonDiv = styled.div`
  text-align: center;
  .delete {
    background: ${themeVars.cadmiumRed};
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 7px;
  margin: 15px;
  background: ${themeVars.alabamaCrimson};
  cursor: pointer;

  &:hover {
    background: ${themeVars.selectiveYellow};
    color: ${themeVars.alabamaCrimson};
    box-shadow: 2px 2px 5px ${themeVars.alabamaCrimson};
  }
`;

const NoProfileYetText = styled.h2`
  color: ${themeVars.alabamaCrimson};
  font-family: monospace;
  margin: 25px;
  padding: 50px 0;
  max-width: 700px;
`;

const NoStyleLink = styled(Link)`
  text-decoration: none;
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

const ReservationInfo = styled.p`
  font-size: 18px;
  padding: 20px 50px;
  span {
    font-weight: 900;
  }
`;
