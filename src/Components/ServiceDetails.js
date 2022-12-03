import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import services from "../store/service";
import axios from "axios";

let walker;

const fetchWalkers = async () => {
  let users = await axios.get("/api/fetchdata/walker-servicehistory");
  walker = users.data[2];
  console.log(walker);
};
fetchWalkers();

const ServiceDetails = (ServiceDetailsProps) => {
  const { id } = useParams();
  const { service, users } = useSelector((state) => state);
  //const walker = users.find((user) => id === user.id)
  //  if (!walker) return <h2>Loading...</h2>;

  // useEffect(() => {
  //   fetchWalkers();
  // }, []);

  if (!walker) {
    return (
      <div>
        <h2>Loading ... (try refreshing)</h2>
      </div>
    );
  }

  const reviews = walker.services[0].serviceevents[0].reviews;
  console.log("reviews", reviews);

  return (
    <div>
      <div>
        <h3>
          Name: {walker.firstname} {walker.lastname}
        </h3>

        <img
          className="service-detail-image"
          //src={.imageUrl}
        />
        <div>Address: {walker.address}</div>
        <div>
          <button
            onClick={() => {
              alert(`${walker.firstname}'s phone #: ${walker.phone}`);
            }}
          >
            Contact {walker.firstname}
          </button>
        </div>
      </div>
      <hr />
      <div>
        <div>Services</div>
        <div>
          <div className="ServiceTask">Task: {walker.services[0].task}</div>
          <div className="ServiceDescription">
            Description: {walker.services[0].serviceDescription}
          </div>
          <div className="ServicePrice">Price: ${walker.services[0].price}</div>
          <div className="ServiceDogSize">
            For dogs of size: {walker.services[0].serviceDogsize}{" "}
          </div>
          <div className="ServiceAvailability">
            At time of day: {walker.services[0].availability}
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div>{walker.firstname}'s reviews:</div>
        <div>
          <ul>
            {reviews.map((review) => {
              if (!!review) {
                return <li key={review.id}>
                  Owner {review.id} says: <br/>
                  <em> '{review.comment}' </em> <br/>
                  Rating: {review.star*1}/5
                  </li>;
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
