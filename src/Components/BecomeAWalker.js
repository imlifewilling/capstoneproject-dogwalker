import React from "react";
import BecomeAWalkerBanner from "./BecomeAWalkerBanner";
import { Typography, Box, Container } from "@mui/material";

const BecomeAWalker = () => {
    console.log('in become a walker.js')
  return (
    <>
      <BecomeAWalkerBanner />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          mt={4}
          mb={6}
          align="center"
          sx={{
            fontWeight: "bold",
            margin: "48 0 0 0",
          }}
        >
          Love dogs but can't own one? Join the pack and become a Goji dog
          walker today!
        </Typography>
        <Typography
          variant="h6"
          mt={4}
          mb={6}
          align="center"
          sx={{
            width: "70%",
            margin: "20 0",
          }}
        >
          The perfect way to get exercise and make furry friends! Become a dog
          walker and enjoy its tail-wagging rewards today!
        </Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          mt={4}
          mb={6}
          align="center"
          sx={{
            fontWeight: "bold",
            margin: "20 0 20 0",
          }}
        >
          Becoming a walker is as easy as 1, 2, 3!
        </Typography>
        <div className="steps">
          <div className="stepline" />
          <div className="nums">
            <div className="stepnum">
              <div className="num">1</div>
            </div>
            <div className="stepnum">
              <div className="num">2</div>
            </div>
            <div className="stepnum">
              <div className="num">3</div>
            </div>
          </div>
        </div>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="../static/images/profile2.webp" width="60" height="60" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", margin: "20 0 5 0" }}
              >
                Build your profile
              </Typography>
              <Typography variant="h6" align="center">
                We'll walk you through building a comprehensive profile that
                showcases your value to pet owners.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="../static/images/messageicon.webp"
              width="90"
              height="90"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", margin: "20 0 5 0" }}
              >
                Accept or send requests
              </Typography>
              <Typography variant="h6" align="center">
                Provide your availability, needs, and accomodations. We'll help
                you work around your schedule.
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="../static/images/payment.jpg" width="90" height="90" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", margin: "20 0 5 0" }}
              >
                Payment Day!
              </Typography>
              <Typography variant="h6" align="center">
                Payments are private, secure, and directly deposited in your
                bank account once you have finished a service.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default BecomeAWalker;
