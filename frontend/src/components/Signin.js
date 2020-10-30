import React from "react";
import styled from "styled-components";
import { themeVars } from "./GlobalStyles";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export const Signin = ({
  userData,
  setUserData,
  setIsLoggedIn,
  setFormData,
  formData,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  let history = useHistory();
  const handleChange = (val, item) => {
    setUserData({ ...userData, [item]: val });
  };

  const validateEmail = () => {
    const emailParts = userData.email.split("@");
    return (
      emailParts.length === 2 &&
      emailParts[0].length > 0 &&
      emailParts[1].length > 0
    );
  };

  useEffect(() => {
    if (validateEmail()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userData]);

  return (
    <Container>
      <SigninH1>Sign in</SigninH1>
      <SignInForm>
        <div style={{ textAlign: "right" }}>
          <label htmlFor="givenName">First Name:</label>
          <Input
            type="text"
            name="givenName"
            id="givenName"
            placeholder="John"
            required
            onChange={(ev) => handleChange(ev.target.value, "givenName")}
          />
          <label htmlFor="surname">Last Name:</label>
          <Input
            type="text"
            name="surname"
            id="surname"
            placeholder="Doe"
            required
            onChange={(ev) => handleChange(ev.target.value, "surname")}
          />
          <label htmlFor="email">Email:</label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@doeinc.ca"
            required
            onChange={(ev) => handleChange(ev.target.value, "email")}
          />
        </div>
        <SubmitButton
          type="submit"
          disabled={isDisabled}
          onClick={(e) => {
            e.preventDefault();
            localStorage.setItem("userData", JSON.stringify(userData));
            setIsLoggedIn(true);
            fetch(`/api/v2/users/${userData.email}`)
              .then((res) => res.json())
              .then((json) => {
                const { status, message, data } = json;
                if (data.email === "") {
                  setFormData({ ...formData, ...userData });
                  history.push("/seats");
                } else {
                  history.push("/profile");
                  setFormData({ ...data });
                }
              });
          }}
        >
          Sign in
        </SubmitButton>
      </SignInForm>
      <Disclaimer>
        If you do not have an account, one will be create for you.
      </Disclaimer>
      <AdminButton>Admin</AdminButton>
    </Container>
  );
};

const Container = styled.div`
  width: 515px;
  margin: 70px auto;
  background: ${themeVars.selectiveYellow};
  padding: 25px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SigninH1 = styled.h1`
  color: ${themeVars.alabamaCrimson};
  font-size: 78px;
  margin-bottom: 33px;
`;

const Input = styled.input`
  margin: 20px 0 20px 10px;

  &::placeholder {
    font-size: 16px;
    opacity: 0.5;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  cursor: pointer;
  border: none;
  background: ${themeVars.alabamaCrimson};
  border-radius: 7px;
  margin-top: 20px;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Disclaimer = styled.p`
  padding: 25px 0;
  color: ${themeVars.alabamaCrimson};
`;

const AdminButton = styled.button`
  margin: 50px auto 0 auto;
  border: none;
  background: transparent;
  color: ${themeVars.cadmiumRed};
  font-size: 18px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
