"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//  Use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const getFlights = (req, res) => {
  res.status(200).json({
    status: 200,
    data: Object.keys(flights),
  });
};

const getFlight = (req, res) => {
  const { flightNum } = req.params;
  const FlightNumData = flights[flightNum];
  if (FlightNumData === undefined) {
    res.status(400).json({
      status: 400,
      message: "There are no flights with that number",
      data: req.params,
    });
  } else {
    res.status(200).json({
      status: 200,
      message: "success",
      data: FlightNumData,
    });
  }
};

const getReservations = (req, res) => {
  res.status(200).json({
    status: 200,
    message: "success",
    data: reservations,
  });
};

const getSingleReservation = (req, res) => {
  const { id } = req.params;
  const getResFromId = reservations.filter((reserv) => {
    if (reserv.id === id) {
      return true;
    }
  });

  if (getResFromId.length === 0) {
    res.status(400).json({
      status: 400,
      message: "There are no reservations with that ID.",
      data: id,
    });
  } else {
    res.status(200).json({
      status: 200,
      message: "success",
      data: getResFromId,
    });
  }
};

const addReservations = (req, res) => {
  const { seat, givenName, surname, email, flight } = req.body;
  if (
    seat == undefined ||
    givenName == undefined ||
    surname == undefined ||
    email == undefined ||
    flight == undefined
  ) {
    res.status(400).json({
      status: 400,
      message:
        "Unable to create reservation due to missing information. Please try again.",
      data: `flight: ${flight}, seat: ${seat}, givenName: ${givenName}, surname: ${surname}, email: ${email}`,
    });
  } else {
    req.body.id = uuidv4();
    reservations.push(req.body);
    res.status(201).json({
      status: 201,
      message: `Reservation for ${givenName} ${surname} was successfully created.`,
      data: req.body,
    });
  }
};

const deleteReservation = (req, res) => {
  const { id } = req.params;
  const targetResFromId = reservations.filter((reserv) => {
    if (reserv.id === id) {
      return true;
    }
  });
  if (targetResFromId.length === 0) {
    res.status(400).json({
      status: 400,
      message: "There are no reservations with that ID.",
      data: id,
    });
  } else {
    const reservationIndex = reservations.indexOf(targetResFromId[0]);
    reservations.splice(reservationIndex, 1);
    res.status(200).json({
      status: 200,
      message: `Reservation with id of ${id} has been deleted`,
      data: "{}",
    });
  }
};

const updateReservation = (req, res) => {
  const { id } = req.params;
  const targetResFromId = reservations.filter((reserv) => {
    if (reserv.id === id) {
      return true;
    }
  });
  if (targetResFromId.length === 0) {
    res.status(400).json({
      status: 400,
      message: "There are no reservations with that ID.",
      data: id,
    });
  } else {
    const { flight, seat, givenName, surname, email } = req.query;
    const queryKeysArr = Object.keys(req.query);
    const reservationDetails = targetResFromId[0];
    queryKeysArr.forEach((key) => {
      if (key === "flight") {
        reservationDetails[key] = flight;
      } else if (key === "seat") {
        reservationDetails[key] = seat;
      } else if (key === "givenName") {
        reservationDetails[key] = givenName;
      } else if (key === "surname") {
        reservationDetails[key] = surname;
      } else if (key === "email") {
        reservationDetails[key] = email;
      }
    });
    res.status(200).json({
      status: 200,
      message: `The Reservation with ID ${id} has successfully been updated.`,
      data: reservationDetails,
    });
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
