import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const theme = createTheme();

const Owners = () => {
  const id = useParams();
  const owners = [];
  //taking owners from redux store
  const { users, auth } = useSelector((state) => state);

  //taking owners from /api/fetchdata/user-servces, which includes services array
  for (const user of users) {
    if (!user.isWalker) {
      console.log(user);
      owners.push(user);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative"></AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Hello {auth.firstname}!
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              This is a list of dogs/owners in need of a walker near your
              location at walker.address
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Box>

        <Container sx={{ py: 8, display:'flex', flexDirection:'row' }} maxWidth="md">
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {owners.map((owner) => (
              <Grid item key={owner?.id} xs={12} sm={6} md={4} sx={{display:'flex', flexDirection:'row'}}>
                <Card
                  sx={
                    {
                      // height: "auto",
                      // display: "flex",
                      // flexDirection: "column",
                      width: '300'
                    }
                  }
                >
                  {/* <CardMedia
                  //why doesnt this shit work
                    component="img"
                    sx={
                      {
                      }
                    }
                    image="https://picsum.photos/300/300"
                    // src={owner.avatar};
                    alt="random"
                  /> */}
                  <img src={owner.avatar} height="400" width="300" style={{objectFit:'contain'}}/>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {owner.firstname} {owner.lastname}
                    </Typography>
                    <Typography>Description/Notes: </Typography>
                    <Typography>Number Dog: </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" component={Link} to={`/owners/${owner.id}`}>
                      See Details
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        alert(`Phone: ${owner?.phone}
                        Address: ${owner?.address}
                        `);
                      }}
                    >
                      Contact/Chat
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              //end of card
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Owners;
