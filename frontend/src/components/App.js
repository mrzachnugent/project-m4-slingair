import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import GlobalStyles, { themeVars } from "./GlobalStyles";
import { Profile } from "./Profile";
import { Reservation } from "./Reservation";
import { ChangeSeat } from "./ChangeSeat";
import { Signin } from "./Signin";

const initialState = { seat: "" };
const userInitialState = { givenName: "", surname: "", email: "" };
const App = () => {
  const [userReservation, setUserReservation] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [userData, setUserData] = useState(userInitialState);
  const [isShowing, setIsShowing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateUserReservation = (newData) => {
    setUserReservation({ ...userReservation, ...newData });
  };

  useEffect(() => {
    // TODO: check localStorage for an id
    // if yes, get data from server and add it to state
  }, [setUserReservation]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setFormData={setFormData}
      />
      <Main>
        <Switch>
          <Route exact path="/">
            <Signin
              userData={userData}
              setUserData={setUserData}
              setIsLoggedIn={setIsLoggedIn}
              formData={formData}
              setFormData={setFormData}
            />
          </Route>
          <Route path="/seats">
            <SeatSelect
              formData={formData}
              setFormData={setFormData}
              updateUserReservation={updateUserReservation}
              setIsShowing={setIsShowing}
            />
          </Route>
          <Route exact path="/confirmed">
            <Confirmation form={formData} />
          </Route>
          <Route path="/profile">
            <Profile
              userReservation={userReservation}
              setUserReservation={setUserReservation}
              userData={userData}
              setUserData={setUserData}
              formData={formData}
            />
          </Route>
          <Route exact path="/view-reservation">
            <Reservation
              userReservation={userReservation}
              setUserReservation={setUserReservation}
            />
          </Route>
          <Route path="/view-reservation/:id">
            <ChangeSeat
              userReservation={userReservation}
              setUserReservation={setUserReservation}
            />
          </Route>
          <Route path="">404: Oops!</Route>
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: ${themeVars.background};
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 110px);
`;

export default App;
