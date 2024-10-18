import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Hotels = () => {
  const navigate = useNavigate();
  const [Hotels, sethotel] = useState([]);
  const [error, setError] = useState("");

  //useEffect can be used to fetch all the hotel details when the component is mounted. Hence the data obtained is to be updated in the corresponding state.
  //in case of failure to fetch data the .catch block should generate a message stating "Something went Wrong"

  useEffect(() => {
    axios
      .get("http://localhost:4000/hotels")
      .then((response) => {
        //console.log(response.data)
        sethotel(response.data);
      })
      .catch((err) => {
        setError("Something went Wrong : " + err.message);
      });
  }, []);

  const goToBookPage = () => {
        navigate("/book")
  }
  const goToAddReviewPage = (id,hotelName) => {
     navigate("/addReview/" + id + "/" + hotelName)
  }
  const goToShowReviewPage = (id,hotelName) => {
    navigate("/viewReview/" + id + "/" + hotelName)
  }
  return (
    <>
    <div >
      {Hotels.map((hotel) => {
        return (
          <>

            <div className="card w-75 mx-auto mt-4">
              <div className="row">
                <div className="col-md-4">
                  <img className="rounded-circle mx-auto d-block mt-4"  src={`/images/${hotel.imageUrl}`}  style={{height:150,width:150}}/>
                </div>
                <div className="col-md-6">
                  <div key={hotel.id}>
                    <h4 style={{color: "#88685e", marginTop: 4}}>{hotel.hotelName}</h4>
                    <div>
                      <p>City: {hotel.city}</p>
                      <p>Amenities :{hotel.amenities} </p>
                      <p>Address: {hotel.address}</p>
                      <p>Contact No: {hotel.phoneNo}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="mt-3">
                    <button
                      className="btn btn-success bsb-btn-xl float-right"
                      type="active"
                      style={{
                        backgroundColor: "#88685e",
                      }}
                      onClick={goToBookPage}
                    >
                      Book Room{" "}
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      className="btn btn-success bsb-btn-xl float-right"
                      type="active"
                      style={{ backgroundColor: "#88685e" }}
                      onClick={() => {goToAddReviewPage(hotel.id, hotel.hotelName)}}
                    >
                      Add Review{" "}
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      className="btn btn-success bsb-btn-xl float-right"
                      type="active"
                      style={{ backgroundColor: "#88685e" }}
                      onClick={() => {goToShowReviewPage(hotel.id, hotel.hotelName)}}
                    >
                      View Review{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
      </div>
    </>
  );
  // return (
  //   <>
  //     {/* display individual hotel details in Cards and apply some inline styling */}
  //     <h4>hotel Name</h4>
  //     <div>
  //       <p>City : </p>
  //       <p>Amenities : </p>
  //       <p>Address :</p>
  //       <p>Contact No :</p>

  //       <div class="col-md-12  text-right">
  //         <button
  //           className="btn btn-success btn-lg float-right"
  //           type="active"
  //           style={{
  //             backgroundColor: "#88685e",
  //           }}
  //         >
  //           Book A Room{" "}
  //         </button>
  //         {/* generate necessary code to redirect to Book page after clicking on Book A Room button */}
  //         <br />
  //         <br />
  //         <button
  //           className="btn btn-success btn-lg float-right"
  //           type="active"
  //           style={{ backgroundColor: "#88685e" }}
  //         >
  //           Add Review{" "}
  //         </button>
  //         {/* generate necessary code to redirect to Add review page after clicking on Add Review button */}
  //         <br />
  //         <br />
  //         <br />
  //         <button
  //           className="btn btn-success btn-lg float-right"
  //           type="active"
  //           style={{ backgroundColor: "#88685e" }}
  //         >
  //           View Review{" "}
  //         </button>
  //         {/* generate necessary code to redirect to show review page after clicking on  View Review button */}
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Hotels;
