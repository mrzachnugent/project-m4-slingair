import React, { useState } from "react";
import { Link } from "react-router-dom";
import FlightSelect from "./SeatSelect/FlightSelect";
import Plane from "./SeatSelect/Plane";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";

export const Admin = () => {
  const [flightNumber, setFlightNumber] = useState(null);
  //prevents app from crashing since plane needs a handleSeatSelect
  const [garbage, setGarbage] = useState({});
  const handleFlightSelect = (ev) => {
    if (ev.target.value !== "Select a flight") {
      setFlightNumber(ev.target.value);
    }
  };
  const handleSeatSelect = (seatId) => {
    setGarbage({ ...garbage, seat: seatId });
  };
  return (
    <Container>
      <FlightSelect handleFlightSelect={handleFlightSelect} />
      <Plane flightNumber={flightNumber} handleSeatSelect={handleSeatSelect} />
      <Link to="/admin/reservations">
        <AllResButton>See All reservations</AllResButton>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  margin: 33px auto 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AllResButton = styled.button`
  background: ${themeVars.alabamaCrimson};
  border: none;
  margin-top: 33px;
  border-radius: 7px;
  padding: 7px;
  cursor: pointer;
`;
