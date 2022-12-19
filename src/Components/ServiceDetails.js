import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ContactForm from "./ContactForm";

import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  FormControl,
  TextField
} 
from "@mui/material";

const ServiceDetails = (ServiceDetailsProps) => {
  const { id } = useParams();
  const { auth, service, users, review } = useSelector((state) => state);
  const [walker, setWalker] = useState();
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWalkers = async () => {
      let response = await axios.get("/api/fetchdata/walker-servicehistory");
      setWalker(response.data.filter(ele => ele.id === id)[0]);
    };
    fetchWalkers();
  }, []);

  if (!walker) {
    return (
      <div>
        <h2>Loading ... (try refreshing)</h2>
      </div>
    );
  }

  let reviews = review?.filter(ele => ele.walkerId === id);
  // if(walker.services[0].serviceevents[0]){
  //   reviews = walker.services[0].serviceevents[0].reviews;
  // }
    
  console.log(review)
  const showContact = () => {
    if(auth.id){
      setView(!view);
    }
    else{
      console.log('Not Logged In')
      navigate('/login')
    }
  };

  const addReview = () => {
    console.log('add review');
    if(auth.id){
      navigate(`/walker/${id}/add_review`);
    }
    else{
      navigate('/login');
    };
  };

  return (
    <div sx={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
      <Card
        sx={{ width: "auto", height: "450", boxShadow: false, display: 'flex', justifyContent:'space-evenly', alignItems:'center' }}
        // raised="true"
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", textAlign: "center" }}
        >
          <Box sx={{height: '400', width: '400', display:'flex', justifyContent:'center'}}>
            <CardMedia
              component="img"
              height="400"
              image={walker?.avatar || "https://picsum.photos/200/200"}
              alt={walker?.firstname + 'profile'}
              sx={{objectFit:'contain', border:'black solid 1px', borderRadius: '75px',}}
            />
          </Box>
          <CardContent sx={{width:'500', display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center'}}>
            <Typography gutterBottom variant="h2" component="div">
                {walker.firstname} {walker.lastname}
            </Typography>
            <Typography variant="h3">
                Bio: {walker.userDescription}
            </Typography>
            <div>
              <Button
                sx={{ borderRadius: "25px", marginTop: '5px' }}
                variant="contained"
                color="success"
                size="large"
                // onClick={() => {
                //   alert(`
                //     ${walker.firstname}'s phone #: ${walker.phone}
                //     ${walker.firstname}'s address: ${walker.address}
                //   `);
                // }}
                onClick={showContact}
              >
                {view ? 'Hide Contact': `Contact ${walker.firstname}`}
              </Button>
            </div>
            {view ? 
            <>
              <Typography variant="h4">Contact Email: {walker.email}</Typography>
              <Typography variant="h4">Contact Phone Number: {walker.phone}</Typography>
            </>
            :
            ''}
          </CardContent>
        </Box>
      </Card>

      {view ? 
      <Box sx={{textAlign:'center'}}>
        <ContactForm email={walker.email}/>
      </Box>
      : ''}


      <Card sx={{ width: "auto", height: "auto", margin: "16px" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardContent sx={{ width: "50%" }}>
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={{ textAlign: "center" }}
            >
              <h3 style={{display:'inline'}}>{walker.firstname}'s Reviews: {' '}</h3><Button variant='outlined'onClick={addReview}>Add Review</Button>
            </Typography>
            <Typography variant="h4">
              <ul>
                {reviews?.map((review) => {
                  if (!!review) {
                    return (
                      <li key={review.id}>
                        <Box key={review.userId} sx={{ margin: "5px" }}>
                          Owner: 
                          {' ' + (users?.filter(ele => ele.id === review.userId)[0]?.firstname) + ' '}
                          {users?.filter(ele => ele.id === review.userId)[0].lastname}
                        </Box>
                        <Box key={review.star} sx={{ margin: "5px" }}>
                          Rating: <Rating name="read-only" value={review.star} readOnly />
                        </Box>
                        <Box key={review.comment} sx={{ margin: "5px" }}>
                          Review: '{review.comment}'
                        </Box>
                      </li>
                    );
                  }
                })}
              </ul>
            </Typography>
          </CardContent>
          <CardContent sx={{ width: "50%" }}>
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={{ textAlign: "center" }}
            >
              <h3>Services</h3>
            </Typography>

            <Typography gutterBottom variant="h4" component="div">
              {walker.services.map((service) => {
                if (!!service) {
                  return (
                    <Box key = {walker.id}>
                      <Card
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          margin: "25px",
                          padding: "10px",
                        }}
                      >
                        <Typography gutterBottom variant="h4">
                          Tasks: {
                          service.task.length>1 
                          ? 
                            service.task.join(', ')
                          :
                            service.task}
                        </Typography>
                        <Typography variant="h5">
                          Info: {service.serviceDescription}
                        </Typography>
                        <Typography variant="h5">
                          Dog Size: {service.serviceDogsize}
                        </Typography>
                        <Typography variant="h5">
                          Price: ${service.price}
                        </Typography>
                        <Typography variant="h5">
                          Availability: {
                          service.availability.length>1
                          ?
                            service.availability.join(', ')
                          :
                            service.availability
                          }
                        </Typography>
                        <br />
                        {/* <div>
                          <Button variant="contained" size="small">
                            Ask about {service.task}
                          </Button>
                        </div> */}
                      </Card>
                    </Box>
                  );
                }
              })}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};

export default ServiceDetails;
