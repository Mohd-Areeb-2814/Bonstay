import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const navigate = useNavigate();
  //State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [state, setstate] = useState({
    userid: "",
    password: "",
  });
  //state to hold the individual validation errors of the form fields.
  const [formErrors, setFormErrors] = useState({
    userid: "",
    password: "",
  });
  //state variable used to disable the button when any given form values is invalid.
  const [valid, setValid] = useState(false);
  //state variable to capture the success Message once the Login is completed successfully.
  const [Message, setMessage] = useState("");

  const change = (event) => {
    /*
       1. This method will be invoked whenever the user changes the value of any form field. This method should also validate the form fields.
       2. 'event' input parameter will contain both name and value of the form field.
       3. Set state using the name and value recieved from event parameter 
       */
    // set the condition as it's a required field.
    // set the condition as The length of the password should be between 8 and 12 characters
    const {name, value} = event.target;
    setstate((prevState) => ({...prevState, [name] : value,}));
    if(name === "userid"){
      setFormErrors((prevState) => ({...prevState, userid: value.length < 1 ? "User ID is required" : "",}));
    } else if(name === "password"){
      setFormErrors((prevState) => ({...prevState, password : value.length < 8 || value.length > 12 ? "Password must be between 8 and 12 characters" : "",}));
    }
    setValid(Object.values(formErrors).every((error) => error === ""))
  };
  const handleSubmit = (event) => {
    // 1. This method will be invoked when user clicks on 'Login' button.
    // 2. You should prevent page reload on submit
    // 3.  If all the form fields values are entered then make axios call to
    // "http://localhost:4000/users/" and pass the appropriate state as data to the axios call
    // 4. If the axios call is successful, assign the below string to successMessage state:
    //    "user logged in successfully."
    // 5. If the axios call is not successful, assign the error message to "Error while logging in"
    event.preventDefault();
    
    if(valid) {
      axios.get("http://localhost:4000/users/" + state.userid)
        .then((response) => {
          if(response.data.password === state.password && response.data.id === state.userid){
            //setMessage("User logged in successfully.");
            localStorage.setItem("userId", response.data.id)
            navigate("/home")
          }
          else{
            setMessage("Invalid Credentials");
          }
          
        })
        .catch((error) => {
          setMessage("Error while logging in");
        });
    } 
    else{
      setMessage("Please fill in all required fields correctly.");
    }
  };

  return (
    <>
      <br />
      <div className="row">
        <div>
          <br />
          <div
            className="cards mx-auto"
            style={{
              backgroundColor: "lavender",
              width: "500px",
              marginLeft: "600px",
              marginBottom: "100px",
            }}
          >
            <div className="card-body">
              <div className="row p-3">
                <div className="col-lg-6 "></div>
                <div style={{ backgroundColor: "#ebe7e7" }}>
                  <form onSubmit={handleSubmit}>
                    {/*
                1. Display successMessage or errorMessage after submission of form
                2. Form should be controlled
                3. Event handling methods should be binded appropriately
                4. Invoke the appropriate method on form submission
                */}
                    <h3
                      style={{
                        textAlign: "center",
                        fontFamily: "revert-layer",
                        color: "brown",
                      }}
                    >
                      Bonstay with us
                    </h3>
                    <div className="mb-2 mt-2">
                      <label className="form-label">UserId:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="userid"
                        value={state.userid}
                        onChange={change}
                      />
                      {/* check whether userid error is set,if set display the corresponding error message using conditional rendering */}
                      {formErrors.userid && (<span className="text-danger">{formErrors.userid}</span>)}
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={state.password}
                        onChange={change}
                      />
                      {/* check whether password error is set,if set display the corresponding error message using conditional rendering */}
                      {formErrors.password && (<span className="text-danger">{formErrors.password}</span>)}
                    </div>
                    {/* bind the disabled attribute to the button to the valid state variable */}
                    <button
                      type="submit"
                      className="btn mb-2 d-block text-white"
                      style={{
                        backgroundColor: "#88685e",
                        paddingRight: "20px",
                        paddingLeft: "15px",
                      }}
                      disabled={!valid}
                    >
                      Login
                    </button>
                    <br />
                    {/*Using the concept of conditional rendering,display success message, error messages related to required fields and axios calls */}
                    <div data-testid="Message" className="text-danger">{Message}</div>
                    {/* create a link for Register page */}
                    <p>
                      <a href="/register">Sign Up</a> to create a new account
                    </p>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
