import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'

const Showreview = () => {
  const [hotels, sethotel] = useState([]);
  const [error, setError] = useState("");

  //useEffect can be used to fetch the review details when the component is mounted. Hence the data obtained is to be updated in the corresponding state.
  //in case of failure to fetch data the .catch block should generate a message stating "Something went Wrong"
  const params = useParams() 
  const id = params.id;

  useEffect(() => {
       axios.get("http://localhost:4000/hotels/" + id)
       .then((response) => {
            sethotel(response.data.reviews);
       })
       .catch((error) => {
        setError("Something went Wrong : " + error.message);
       })
  }, [])
  return (
    <>
      {/* display all the reviews with selected hotel name in a card and apply some inline styling */}
      {/* <div className="row row-cols-4 row-cols-md-3 g-4">
        <div className="col">
          <div className="card text-center w-75 mx-auto mt-4" style={{ margin: "10px", padding: "10px", backgroundColor: "#f3efee"}}>
            <h3>Customers Reviews</h3>
          </div>
        </div>
      </div>   */}

      <div class="card mx-auto text-dark mb-3 outer-card" style={{maxWidth : "26rem", backgroundColor: "#f3efee", marginTop:100 }}>
        <h4 className="text-center" style = {{color: "#88685e", marginTop: 8}}>Customers Reviews</h4>
        {hotels.map((review) => {
        return (
          <>
            <div className="card mt-4 inner-card" style={{maxWidth : "24rem", backgroundColor: "#eeeeee", marginLeft : 16}}>
              <p className=" text-center mt-2">{review}</p>
            </div>
             
             
          </>
        )
      })}
      <div className="mt-4"></div>  
      </div>
      
    </>
  );
};

export default Showreview;
