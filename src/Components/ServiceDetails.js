import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import services from "../store/service";

// import { User, Service, ServiceEvent, Review } from "../../server/db/index.js";

const ServiceDetails = (ServiceDetailsProps) => {
  const { id } = useParams();
  const { service, users } = useSelector((state) => state);
  //const walker = users.find((user) => id === user.id)
  //  if (!walker) return <h2>Loading...</h2>;

  return (
    <div>
      <div>
        <h3>walker.firstname walker.lastname</h3>

        <img
          className="service-detail-image"
          //src={.imageUrl}
        />
        <div>walker.address</div>
        <div>
          <button
            onClick={() => {
              alert("walker.phone");
            }}
          >
            Contact walker.firstname
          </button>
        </div>
      </div>
      <hr />
      <div>
        <div>Services</div>
        <div>
          <div>Task: walker.services.task</div>
          <div>Description: walker.services.serviceDescription</div>
          <div>Price: $walker.services.price</div>
          <div>For dogs of size: walker.services.serviceDogSize </div>
          <div>At time of day: walker.services.availability</div>

          {/* <ul>
            {services.map((service) => {
                <li>
                Task: {service.task}
                Description: {service.serviceDescription}
                Price: ${service.price}

                    </li>
            })}
           </ul> */}
        </div>
      </div>
      <hr />
      <div>
        <div>walker.firstname's reviews:</div>
        <div>walker.services.serviceevents.reviews.map((()=>{}))</div>
      </div>
    </div>
  );
};

export default ServiceDetails;
