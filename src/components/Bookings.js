import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  //State to capture the error message when the call made to get all the bookings, fails.
  const [errMsg, setErrMessage] = useState("");
  // State to capture the  message when the call made to delete the given booking is successful.
  const [deleteSuccess, setDeleteSuccess] = useState("");

  useEffect(() => {
    getBookings()
  }, []);
  //useEffect can be used to fetch the booking details when the component is mounted. Hence the data obtained is to be updated in the corresponding state.
  //in case of failure to fetch data the .catch block should generate a message stating "Something went Wrong"
  //function to delete the service with given id
  const getBookings = () => {

    axios
      .get("http://localhost:4000/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        setErrMessage("Something went wrong" + error.message);
      });
  }
  const handleAction = (id) => {
    // Delete the booking from the database by placing HTTP delete request to the
    // url - http://localhost:4000/bookings/<plan ID>
    // If the Axios call is successful, generate an alert "The booking for Booking ID :" <id > " is deleted"
    // If the Axios call fails, generate alert "Something went wrong".
    axios
      .delete(`http://localhost:4000/bookings/${id}`)
      .then((response) => {
        setDeleteSuccess(`The booking for Booking ID: ${id} is deleted`);
        getBookings()
      })
      .catch((error) => {
        setErrMessage("Something went wrong : " + error.message);
      });
  };

  const handleReschedule = (id) => {
    navigate("/reschedule/" + id)
  };
  return (
    <>
      {/* display individual bookings in Cards and apply some inline styling */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
      {bookings.map((booking) => (
        <div className="col">
        <div
          key={booking.id}
          className="card text-center w-75 mx-auto mt-4"
          style={{ margin: "10px", padding: "10px", backgroundColor: "#f3efee"}}
        >
          <h4 style={{color: "#88685e"}}>{booking.id}</h4>
          <div>
            <p>Hotel Name : {booking.hotelName}</p>
            <p>Start Date : {booking.startDate}</p>
            <p>End Date : {booking.endDate}</p>
            <p>No of Persons : {booking.noOfPersons}</p>
            <p>No of Rooms : {booking.noOfRooms}</p>
            <p>Type of Rooms : {booking.typeOfRoom}</p>

            <div className="d-grid col-8 mx-auto mt-4">
              <button
                className="btn btn-secondary"
                data-testid="Reschedule-button"
                style={{
                  backgroundColor: "#88685e",
                }}
                onClick={() => {
                  handleReschedule(booking.id);
                }}
              >
                Reschedule
              </button>
              {/* generate necessary code to call the function to handle reschedule opration of the user */}
              <br />

              <button
                className="btn btn-secondary"
                data-testid="delete-button"
                style={{
                  backgroundColor: "#88685e",
                }}
                onClick={() => {
                  handleAction(booking.id);
                }}
              >
                Cancel
              </button>
            </div>

            {/* generate necessary code to call the function to handle delete opration of the user and set the successful delete message */}
          </div>
        </div>
        </div>
      ))}
      {errMsg && <div className="text-danger">{errMsg}</div>}
      {deleteSuccess && <div className="text-success">{deleteSuccess}</div>}
      </div>
    </>
  );
};

export default Bookings;

/* <h4>booking.id</h4>

<div>
  <p>Hotel Name : </p>
  <p>Start Date :</p>
  <p>End Date :</p>
  <p>No of Persons :</p>
  <p>No of Rooms :</p>
  <p>Type of Rooms :</p>

  <button className="btn btn-secondary" data-testid="Reschedule-button">
    Reschedule
  </button>
  {/* generate necessary code to call the function to handle reschedule opration of the user 
  <br />
  <br />

  <button className="btn btn-secondary" data-testid="delete-button">
    Cancel
  </button>
  {/* generate necessary code to call the function to handle delete opration of the user and set the successful delete message 
</div> */
