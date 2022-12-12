import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ContactForm from "./ContactForm";

import { CardContent, CardMedia, Typography } from "@mui/material";

const OwnerDetails = () => {
  const [view, setView] = useState(false);
  const [owner, setOwner] = useState([]);
  const { id } = useParams();
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  console.log(auth);
  useEffect(() => {
    const fetchOwners = async () => {
      let response = await axios.get("/api/fetchdata/users");
      console.log("RESPONSE", response);
      setOwner(response.data.filter((ele) => ele.id === id)[0]);
    };
    fetchOwners();
  }, []);

  if (!owner) {
    return (
      <div>
        <h2>Loading ... (try refreshing)</h2>
      </div>
    );
  }
  const showContact = () => {
    if (auth.id) {
      setView(!view);
    } else {
      console.log("Not Logged In");
      navigate("/login");
    }
  };
  return (
    <div
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card
        sx={{
          width: "auto",
          height: "450",
          boxShadow: false,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        // raised="true"
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", textAlign: "center" }}
        >
          <Box
            sx={{
              height: "400",
              width: "400",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              height="400"
              image={owner?.avatar || "https://picsum.photos/200/200"}
              alt={owner?.firstname + "profile"}
              sx={{
                objectFit: "contain",
                border: "black solid 1px",
                borderRadius: "75px",
              }}
            />
          </Box>
          <CardContent
            sx={{
              width: "500",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h2" component="div">
              {owner.firstname} {owner.lastname}
            </Typography>
            <Typography variant="h3">
              Bio:{" "}
              {owner.userDescription
                ? owner.userDescription
                : "No userDescription added"}
            </Typography>
            <div>
              <Button
                sx={{ borderRadius: "25px", marginTop: "5px" }}
                variant="contained"
                color="success"
                size="large"
                // onClick={() => {
                //   alert(`
                //     ${owner.firstname}'s phone #: ${owner.phone}
                //     ${owner.firstname}'s address: ${owner.address}
                //   `);
                // }}
                onClick={showContact}
              >
                {view ? "Hide Contact" : `Contact ${owner.firstname}`}
              </Button>
            </div>
            <Card>
              {view ? (
                <>
                  <Typography variant="h4">
                    Contact Email: {owner.email}
                  </Typography>
                  <Typography variant="h4">
                    Contact Phone Number: {owner.phone}
                  </Typography>
                </>
              ) : (
                ""
              )}
            </Card>
          </CardContent>
        </Box>
      </Card>
      {view ? (
        <Box sx={{ textAlign: "center" }}>
          <ContactForm email={owner.email} />
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};

export default OwnerDetails;
