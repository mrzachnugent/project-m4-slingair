"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const {
  getFlights,
  getFlight,
  getReservations,
  getSingleReservation,
  addReservations,
  deleteReservation,
  updateReservation,
  updateProfile,
  updateReservationSeat,
} = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  // get flights (flight numbers)
  .get("/api/v1/flights", getFlights)

  // get single flight data
  .get("/api/v1/flights/:flightNum", getFlight)

  //get all reservations from flight
  .get("/api/v1/reservations", getReservations)

  // get single reservation data
  .get("/api/v1/reservations/:id", getSingleReservation)

  // create a reservation
  .post("/api/v1/reservations", addReservations)

  // delete a reservation
  .delete("/api/v1/reservations/:id", deleteReservation)

  //update reservation
  .put("/api/v1/reservations/:id", updateReservation)

  //update profile
  .put("/api/v1/profiles/:email", updateProfile)

  //update seat (should replace update reservation^ but I don't want to delete required project)
  .put("/api/v1/reservations/seat/:id", updateReservationSeat)

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
