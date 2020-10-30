import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

const FlightSelect = ({ handleFlightSelect }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // TODO: fetch the flight numbers
    fetch("/api/v1/flights")
      .then((res) => res.json())
      .then((json) => setFlights(json.data));
  }, []);

  return (
    <Wrapper>
      <label htmlFor="flight">Flight Number :</label>
      {/* TODO: Create a dropdown from the flight numbers */}
      <FlightsInput
        id="flight"
        name="flights"
        placeholder="Select a flight"
        onClick={handleFlightSelect}
        defaultValue={"Select a flight"}
      >
        <option value="Select a flight" disabled>
          Select a flight
        </option>
        {flights.map((flight, index) => {
          return (
            <option value={`${flight}`} key={index}>
              {flight}
            </option>
          );
        })}
      </FlightsInput>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${themeVars.cadmiumRed};
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${themeVars.pagePadding};
  margin-bottom: ${themeVars.pagePadding};
`;

const FlightsInput = styled.select`
  border: none;
  transform: skewX(-10deg);
  margin-left: 15px;
  margin-top: 10px;
  width: 220px;
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 3px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 25px;
  padding-left: 20px;

  &:focus {
    outline: none;
  }

  /* &:disabled {
    color: #232323;
    font-size: 16px;
  } */
`;
export default FlightSelect;
