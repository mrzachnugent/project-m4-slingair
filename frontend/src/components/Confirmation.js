import React from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";
import tombstone from "../assets/tombstone.png";

const Confirmation = ({ form }) => {
  return (
    <Wrapper>
      <MessageBoard>
        <ConfirmationTitle>Your flight is confirmed!</ConfirmationTitle>
        <ListContainer>
          <ReservatoinDetails>
            <span>Reservation #:</span> {localStorage.getItem("confirmationId")}
            {/* <span>Reservation #:</span> {form.id} */}
          </ReservatoinDetails>
          <ReservatoinDetails>
            <span>Flight #:</span> {form.flight}
          </ReservatoinDetails>
          <ReservatoinDetails>
            <span>Seat #:</span> {form.seat}
          </ReservatoinDetails>
          <ReservatoinDetails>
            <span>Name:</span> {form.givenName} {form.surname}
          </ReservatoinDetails>
          <ReservatoinDetails>
            <span>Email:</span> {form.email}
          </ReservatoinDetails>
        </ListContainer>
      </MessageBoard>
      <img
        src={tombstone}
        alt="tombstone"
        width="220px"
        style={{ marginTop: 50 + "px" }}
      />
    </Wrapper>
  );
};

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

export default Confirmation;
