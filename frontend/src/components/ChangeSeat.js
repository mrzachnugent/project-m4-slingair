import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Plane from "./SeatSelect/Plane";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";
import { Link } from "react-router-dom";

export const ChangeSeat = ({ userReservation, setUserReservation }) => {
  const { id } = useParams();
  const handleSeatSelect = (seatID) => {
    setUserReservation({ ...userReservation, seat: seatID });
    console.log(userReservation);
  };
  const [isId, setIsId] = useState(false);
  fetch("/api/v1/reservations")
    .then((res) => res.json())
    .then((json) => json.data)
    .then((allRes) => {
      const newArr = allRes.filter((reserve) => {
        if (reserve.id === `${id}`) {
          return true;
        }
      });
      return newArr.length;
    })
    .then((userRes) => {
      if (userRes > 0) {
        setIsId(true);
      }
    });
  if (isId) {
    return (
      <Container>
        <h1>Flight: SA231</h1>
        <ResNumText>
          <span>Reservation #:</span> {id}
        </ResNumText>
        <Plane
          selectedSeat={userReservation.seat}
          flightNumber={"SA231"}
          handleSeatSelect={handleSeatSelect}
        />
        <NoStyleLink to="/view-reservation">
          <Button
            onClick={() => {
              console.log(userReservation.seat);
              fetch(`/api/v1/reservations/seat/${id}`, {
                method: "PUT",
                body: JSON.stringify(userReservation),
                headers: {
                  Accept: "application/json",
                  "Content-type": "application/json",
                },
              }).then((res) => res.json());
            }}
          >
            Submit
          </Button>
        </NoStyleLink>
      </Container>
    );
  } else {
    return (
      <>
        <h1>Must be valid Reservation</h1>
      </>
    );
  }
};

const Container = styled.div`
  border: 2px solid ${themeVars.alabamaCrimson};
  padding: 20px 50px;
  margin: 50px auto;
  background: ${themeVars.selectiveYellow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResNumText = styled.p`
  padding: 15px 0;
  span {
    font-weight: bold;
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

const NoStyleLink = styled(Link)`
  text-decoration: none;
`;
