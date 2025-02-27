import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const Reschedule = () => {
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [state, setState] = useState({
    startDate: "",
    endDate: "",
  });
  //state variable to capture the success Message once the rescheduling is completed successfully.
  const [Message, setMessage] = useState("");

  const params = useParams() 
  const bookingId = params.id;

  let [bookingToBeUpdated, setBookingToBeUpdated] = useState({ id: 0, startDate: "", endDate: "", noOfPersons: 0, noOfRooms: 0, typeOfRoom: "", hotelName: "", hotelId: 0, userId: 0 })

  useEffect(() => {
    axios.get("http://localhost:4000/bookings/"+bookingId)
    .then((response) => {
      //console.log(response.data)
      setBookingToBeUpdated(response.data)
      
    })
    .catch((error) => { console.log(error.message) })
  },[])
  const handleSubmit = (event) => {
    // 1. This method will be invoked when user clicks on 'Book' button.
    // 2. You should prevent page reload on submit
    // 3.  If all the form fields values are entered then make axios call to
    // "http://localhost:4000/bookings/:userId" and pass the appropriate state as data to the axios call
    // 4. If the axios call is successful, assign the below string to successMessage state:
    //   "Reschedule is successfully done"
    // 5. If the axios call is not successful, assign the error message to "Something went wrong"
    event.preventDefault();
    axios.put(`http://localhost:4000/bookings/${bookingId}`, bookingToBeUpdated)
    .then((response) => {
        setMessage("Reschedule is successfully done");
    })
    .catch((error) => {
        setMessage("Something went wrong : " + error.message)
    })
  };

  const change = (event) => {
    /*
       1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
       2. 'event' input parameter will contain both name and value of the form field.
       3. Set state using the name and value recieved from event parameter 
       */
      const {name, value} = event.target;
      setState((prevState) => ({
        ...prevState,
        [name] : value,
      }));

      setBookingToBeUpdated((prevState) => ({...prevState, [name] : value,}))
  };

  return (
    <>
      <div>
        <div
          className="container mt-3 text-start p-5"
          style={{ width: "60%", fontSize: "14px" }}
        >
          <div className="row p-3">
            <div className="col-lg-6 "></div>
            <div className="col-lg-6" style={{ backgroundColor: "#ebe7e7" }}>
              <form onSubmit={handleSubmit}>
                {/*
                1. Display successMessage or errorMessage after submission of form
                2. Form should be controlled
                3. Event handling methods should be binded appropriately
                4. Invoke the appropriate method on form submission
                */}
                <div
                  className="navbar-brand"
                  style={{
                    color: "brown",
                    textAlign: "center",
                    fontFamily: "sans-serif",
                    fontWeight: "bolder",
                    paddingTop: "25px",
                    fontSize: "2em",
                  }}
                >
                  Book a Room
                </div>

                <br />
                <br />
                <div className="mb-2 mt-2">
                  <label className="form-label">Start Date:</label>
                  <input
                    type="Date"
                    className="form-control"
                    name="startDate"
                    value={state.startDate}
                    onChange={change}
                  />
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">End Date:</label>
                  <input type="Date" className="form-control" name="endDate" value={state.endDate} onChange={change} />
                </div>
                <br />
                <button
                  type="submit"
                  className="btn mb-2 d-block text-white"
                  style={{ backgroundColor: "#88685e", width: "100%" }}
                >
                  Reschedule
                </button>
                {/*Using the concept of conditional rendering,display success message, error messages related to axios calls */}
                <div data-testid="Message" className="text-danger">{Message}</div>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reschedule;
