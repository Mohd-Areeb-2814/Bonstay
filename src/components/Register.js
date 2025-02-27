import React from "react";
import { useState } from "react";
import axios from "axios";
import BonstayImg from "../Bonstay1.jpg";

const Register = () => {
  //const navigate = useNavigate();
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [state, setState] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  //state to hold the individual validation errors of the form fields.
  const [formErrors, setFormErrors] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    password: "",
  });
  //state variable used to disable the button when any given form values is invalid.
  const [valid, setValid] = useState(false);
  //state variable to indicate whether user has given values to all the mandatory fields of the form.
  const [mandatory, setMandatory] = useState(false);
  //state variable to capture the success Message once the registration is completed successfully.
  const [successMessage, setSuccessMessage] = useState("");

  const change = (event) => {
    /*
       1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
       2. 'event' input parameter will contain both name and value of the form field.
       3. Set state using the name and value recieved from event parameter 
       */
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));

    if (name === "name") {
      setFormErrors((prevState) => ({
        ...prevState,
        name:
          value.length < 3
            ? "The length of the name should be minimum 3 character"
            : "",
      }));
    } else if (name === "address") {
      setFormErrors((prevState) => ({
        ...prevState,
        address: value.length < 1 ? "Address is required" : "",
      }));
    } else if (name === "phoneNo") {
      setFormErrors((prevState) => ({
        ...prevState,
        phoneNo:
          value.length !== 10 ? "Phone number should have 10 digits" : "",
      }));
    } else if (name === "email") {
      setFormErrors((prevState) => ({
        ...prevState,
        email: !/^\S+@\S+$/.test(value)
          ? "Email should match the basic email format"
          : "",
      }));
    } else if (name === "password") {
      setFormErrors((prevState) => ({
        ...prevState,
        password:
          value.length < 8 || value.length > 12
            ? "Password must be between 8 and 12 characters"
            : "",
      }));
    }

    setValid(Object.values(formErrors).every((error) => error === ""));

    // set the condition as The length of the name should be minimum 3 character.

    // set the condition as required field.

    // set the condition as the Phone number should have 10 digits.

    // set the condition as the Email should match the basic email format.

    // set the condition as The length of the password should be between 8 and 12 characters
  };
  const handleSubmit = (event) => {
    // 1. This method will be invoked when user clicks on 'Register' button.
    // 2. You should prevent page reload on submit
    // 3. check whether all the form fields are entered. If any of the form fields is not entered set the mandatory state variable to true.
    // 4.  If all the form fields values are entered then make axios call to
    // "http://localhost:4000/users/" and pass the appropriate state as data to the axios call
    // 5. If the axios call is successful, assign the below string to successMessage state:
    //    "User registered successfully with the id "+ <id>
    // 6. If the axios call is not successful, assign the error message to "Error while registering user"
    event.preventDefault();
    setMandatory(Object.values(state).some((value) => value === ""));
    if (valid && !mandatory) {
      axios
        .post("http://localhost:4000/users/", state)
        .then((response) => {
          setSuccessMessage(
            "User registered successfully with the id " + response.data.id
          );
          setFormErrors("");
        })
        .catch((error) => {
          setFormErrors("Error while registering user");
          setSuccessMessage("");
        });
    } else {
      setSuccessMessage("Enter all the form fields");
    }
  };
  return (
    <>
      <div className="Bgimage">
        <div
          className="container mt-3 text-start p-5"
          style={{ width: "60%", fontSize: "14px" }}
        >
          <div className="row p-3">
            <div className="col-lg-6 ">
              <img src={BonstayImg} alt="bonstay" height={512} width={419} />
            </div>
            <div className="col-lg-6" style={{ backgroundColor: "#ebe7e7" }}>
              <form onSubmit={handleSubmit}>
                {/*
                1. Display successMessage or errorMessage after submission of form
                2. Form should be controlled
                3. Event handling methods should be binded appropriately
                4. Invoke the appropriate method on form submission
                */}
                <div className="mb-2 mt-2">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={change}
                  />
                  {/* check whether name error is set,if set display the corresponding error message using conditional rendering */}
                  {formErrors.name ? (
                    <span className="text-danger">{formErrors.name}</span>
                  ) : null}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    onChange={change}
                  />
                  {/* check whether address error is set,if set display the corresponding error message using conditional rendering */}
                  {formErrors.address ? (
                    <span className="text-danger">{formErrors.address}</span>
                  ) : null}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">PhoneNo:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNo"
                    onChange={change}
                  />
                  {/* check whether phoneNo error is set,if set display the corresponding error message using conditional rendering */}
                  {formErrors.phoneNo ? (
                    <span className="text-danger">{formErrors.phoneNo}</span>
                  ) : null}
                </div>
                <div className="mb-2 mt-2">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={change}
                  />
                  {/* check whether email error is set,if set display the corresponding error message using conditional rendering */}
                  {formErrors.email ? (
                    <span className="text-danger">{formErrors.email}</span>
                  ) : null}
                </div>
                <div className="mb-2">
                  <label className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={change}
                  />
                  {/* check whether password error is set,if set display the corresponding error message using conditional rendering */}
                  {formErrors.password ? (
                    <span className="text-danger">{formErrors.password}</span>
                  ) : null}
                </div>
                {/* bind the disabled attribute to the button to the valid state variable */}
                <button
                  type="submit"
                  className="btn mb-2 d-block text-white"
                  style={{ backgroundColor: "#88685e" }}
                  disabled={!valid}
                >
                  Register
                </button>
                <br />
                {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
                {/* {if the form fields are not entered then set the message as 'Enter all the form fields'} */}
                <div data-testid="mandatory" className="text-danger">
                  {mandatory ? (
                    <span className="text-danger">
                      Enter all the form fields
                    </span>
                  ) : null}
                </div>
                <div data-testid="successMessage" className="text-danger">
                  {successMessage ? (
                    <span className="text-danger">{successMessage}</span>
                  ) : null}
                </div>
                {/* create a link for Login page */}
                <a href="/login">Login</a> with your existing account
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
