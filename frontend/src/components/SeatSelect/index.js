import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FlightSelect from "./FlightSelect";
import Form from "./Form";

const SeatSelect = ({
  updateUserReservation,
  formData,
  setFormData,
  setIsShowing,
}) => {
  const history = useHistory();
  const [flightNumber, setFlightNumber] = useState(null);

  const [disabled, setDisabled] = useState(true);
  const [subStatus, setSubStatus] = useState("idle");

  useEffect(() => {
    // This hook is listening to state changes and verifying whether or not all
    // of the form data is filled out.
    Object.values(formData).includes("") || flightNumber === ""
      ? setDisabled(true)
      : setDisabled(false);
  }, [flightNumber, formData, setDisabled]);

  const handleFlightSelect = (ev) => {
    if (ev.target.value !== "Select a flight") {
      setFlightNumber(ev.target.value);
    }
  };

  const handleSeatSelect = (seatId) => {
    setFormData({ ...formData, seat: seatId });
  };

  const handleChange = (val, item) => {
    setFormData({ ...formData, [item]: val });
  };

  const validateEmail = () => {
    const emailParts = formData.email.split("@");
    return (
      emailParts.length === 2 &&
      emailParts[0].length > 0 &&
      emailParts[1].length > 0
    );
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (validateEmail()) {
      formData.flight = flightNumber;
      // TODO: Send data to the server for validation/submission
      // TODO: if 201, add reservation id (received from server) to localStorage
      // TODO: if 201, redirect to /confirmed (push)
      // TODO: if error from server, show error to user (stretch goal)

      fetch("/api/v1/reservations", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          const { status, message, data } = json;
          if (status === 201) {
            console.log(message);
            setSubStatus("confirmed");
            localStorage.setItem("confirmationId", `${data.id}`);
            localStorage.setItem("userData", JSON.stringify(data));
            updateUserReservation(data);
            setIsShowing(true);
            // formData.id = data.id;
            history.push("/confirmed");
          } else {
            console.log(status, message, data);
            setSubStatus("error");
          }
        });
    }
  };

  return (
    <>
      <FlightSelect
        flightNumber={flightNumber}
        handleFlightSelect={handleFlightSelect}
      />
      <h2>Select your seat and Provide your information!</h2>
      <Form
        flightNumber={flightNumber}
        formData={formData}
        handleChange={handleChange}
        handleSeatSelect={handleSeatSelect}
        handleSubmit={handleSubmit}
        disabled={disabled}
        subStatus={subStatus}
      />
    </>
  );
};

export default SeatSelect;
