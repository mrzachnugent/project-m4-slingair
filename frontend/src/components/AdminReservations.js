import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";

export const AdminReservations = () => {
  const [startingIndex, setStartingIndex] = useState(0);
  const [reservationList, setReservationList] = useState([]);

  useEffect(() => {
    fetch(`/api/v2/users?limit=25&start=${startingIndex}`)
      .then((res) => res.json())
      .then((json) => setReservationList(json.data))
      .then(() => console.log(reservationList));
  }, [startingIndex]);
  return (
    <Container>
      <h1>All Reservations</h1>
      <Link to="/admin">
        <AdminHomeButton>Admin Home</AdminHomeButton>
      </Link>
      {reservationList.map((reserve) => {
        return (
          <ResContainer>
            <p>
              <span>Name:</span> {reserve.givenName} {reserve.surname}
            </p>
            <p>
              <span>Email:</span> {reserve.email}
            </p>
            <p>
              <span>Reservation #:</span> {reserve.id}
            </p>
            <p>
              <span>Flight:</span> {reserve.flight}
            </p>
            <p>
              <span>Seat:</span> {reserve.seat}
            </p>
          </ResContainer>
        );
      })}
      <div>
        <PageNavButton
          onClick={() => {
            if (startingIndex < 0) {
              return;
            } else {
              setStartingIndex(startingIndex - 25);
            }
          }}
        >
          previous
        </PageNavButton>
        <PageNavButton
          onClick={() => {
            if (reservationList.length === 0) {
              return;
            } else {
              setStartingIndex(startingIndex + 25);
            }
          }}
        >
          Next
        </PageNavButton>
      </div>
    </Container>
  );
};

const AdminHomeButton = styled.button`
  background: transparent;
  border: none;
  font-family: monospace;
  color: ${themeVars.alabamaCrimson};
  font-weight: bold;
  text-decoration: underline;
  font-size: 18px;
  padding: 25px 0;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResContainer = styled.div`
  background: ${themeVars.selectiveYellow};
  margin: 10px 0;
  border-radius: 7px;
  padding: 14px;

  p > span {
    font-weight: bold;
  }
`;

const PageNavButton = styled.button`
  margin: 10px;
  border: none;
  cursor: pointer;
  background: ${themeVars.alabamaCrimson};
  border-radius: 7px;
`;
