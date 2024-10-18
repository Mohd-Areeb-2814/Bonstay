import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Hotels from './components/Hotels.js'
import Bookings from './components/Bookings.js'
import Home from './components/Home.js'
import Login from "./components/Login";
import Register from "./components/Register.js";
import Reschedule from "./components/Reschedule.js";
import Book from "./components/Book.js"
import Addreview from "./components/Addreview.js";
import Showreview from "./components/Showreview.js"
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
        <Navbar></Navbar>
          <Routes>{/*configure the Route's */}
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/hotels" element={<Hotels/>}></Route>
            <Route path="/bookings" element={<Bookings/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/reschedule/:id" element={<Reschedule/>}></Route>
            <Route path="/book" element={<Book/>}></Route>
            <Route path="/addReview/:id/:hotelName" element={<Addreview/>}></Route>
            <Route path="/viewReview/:id/:hotelName" element={<Showreview/>}></Route>
            <Route path="/*" element = {<Home/>}></Route>
            <Route path="/" element = {<Home/>}></Route>
          </Routes>
        
      
    </>
  );
};

export default App;
