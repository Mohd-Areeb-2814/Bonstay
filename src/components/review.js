import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

//import axios from "axios";
const Addreview = () => {
  const setReviewsValue=()=>{
    setHotelToBeUpdated((prevState) => ({...prevState, reviews : [...prevState.reviews, state.reviews]}))
  }
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [state, setState] = useState(
    {reviews: "",}
  );
  //state to hold the individual validation errors of the form fields.
  const [formErrors, setFormErrors] = useState({
    reviews: "",
  });
  //state variable to capture the success Message once the review is added successfully.
  const [Message, setMessage] = useState("");
  //state variable to indicate whether user has given values to all the mandatory fields of the form.
  const [mandatory, setMandatory] = useState(false);
  // state variable used to disable the button when the given form value is invalid.
  const [valid, setValid] = useState(false);

  const params = useParams() 
  const hotelId = params.id;

  let [hotelToBeUpdated, setHotelToBeUpdated] = useState({id : 0, hotelName : "", city : "", description : "", amenities : "", phoneNo : 0, address : "", imageUrl : "", reviews : []});
  
  useEffect(() => {
    axios.get("http://localhost:4000/hotels/" + hotelId)
    .then((response) => {
       console.log(response.data)
       setHotelToBeUpdated(response.data)
    })
    .catch((error) => {
      console.log(error.message)
    })
  }, [])

  const change = (event) => {
   
    const {name, value} = event.target;
    console.log("inside change method")
    setState((prevState) => ({
      ...prevState,
      [name] : value,
    }))
    
    setFormErrors((prevState) => ({
      ...prevState,
      reviews : value.trim() === "" ? "Review is a required field" : ""
    }))

    setValid(value.trim() !== "")
   
    // if(valid){
    //   console.log("inside valid condition")
    //   setHotelToBeUpdated((prevState) => ({...prevState, reviews : [...prevState.reviews, value]}))
    //   console.log(hotelToBeUpdated.reviews);
    // }
  };
  const handleSubmit = (event) => {
    // setReviewsValue();
    // 1. This method will be invoked when user clicks on 'Add Review' button.
    // 2. You should prevent page reload on submit
    // 3. check whether the form fields are entered. If the form field is not entered set the mandatory state variable to true.
    // 4.  If the form field values are entered then make axios call to
    // "http://localhost:4000/hotels/:hotelId" and pass the appropriate state as data to the axios call
    // 5. If the axios call is successful, assign the below string to Message state:
    //   "Review is successfully added."
    // 6. If the axios call is not successful, assign the error message to "Something went wrong"
    event.preventDefault();
    setMandatory(state.reviews.trim() === "");
    // alert(state.reviews);
   
    // alert(hotelToBeUpdated.reviews);
    // setHotelToBeUpdated((prevState) => ({...prevState, reviews : [...prevState.reviews, state.reviews]}))
    // setHotelToBeUpdated({...hotelToBeUpdated,[hotelToBeUpdated.reviews]:"ddd"});

       setHotelToBeUpdated((prevState) => ({...prevState, reviews : [...prevState.reviews, state.reviews]}))
       console.log(hotelToBeUpdated.reviews);
    if(valid && !mandatory){
      axios.put(`http://localhost:4000/hotels/${hotelId}`, hotelToBeUpdated)
      .then((response) => {
        setMessage("Review is successfully added.");
      })
      .catch((error) => {
        setMessage("Something went wrong : " + error.message);
      })
    }
  };

  return (
    <>
      <div>
        <div
          className="container mt-3 text-start p-5"
          style={{ width: "90%", fontSize: "14px" }}
        >
          <div className="row p-3">
            <div className="col-lg-6 " style={{ marginRight: "10%" }}>
              {" "}
            </div>
            <div className="col-lg-6" style={{ backgroundColor: "#ebe7e7" }}>
              <form style={{ marginRight: "20px", marginLeft: "20px" }} onSubmit={handleSubmit}>
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
                  Your Reviews means a lot for us
                </div>
                <br />
                <br />
                <div className="mb-2 mt-2">
                  <label className="form-label" style={{ color: "brown" }}>
                    Add your Review:{hotelToBeUpdated.reviews}
                  </label>
                  <textarea
                    type="textarea"
                    className="form-control"
                    name="reviews"
                    rows="4"
                    cols="20"
                    maxLength="100"
                    value={state.reviews}
                    onChange={change}
                  ></textarea>
                  {/* Check whether the reviews error is set, if set display the corresponding error message using conditional rendering
                   */}
                   {formErrors.reviews ? <span className="text-danger">{formErrors.reviews}</span> : null}
                </div>
                <br />
                {/* Bind the disabled attribute to the button to the valid state variable */}
                <button
                  type="submit"
                  className="btn mb-2 d-block text-white"
                  style={{ backgroundColor: "#88685e" }}
                  disabled={!valid}
                >
                  Add Review
                </button>
                <br />
                {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
                {/* {if the form fields are not entered then set the message as 'Enter all the form fields'} */}
                <div data-testid="mandatory" className="text-danger">{mandatory ? <span className="text-danger">Enter all the form fields</span> : null}</div>
                <div data-testid="Message" className="text-danger">{Message}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addreview;
