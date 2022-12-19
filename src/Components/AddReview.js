import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
    Typography,
    Rating,
    Box,
    TextField,
    Button,
    Stack,
    FormControl,
    Grid,
} from '@mui/material';
import { addReview } from "../store/review";

const AddReview = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, auth } = useSelector(state=>state);
    const filteredUser = users.filter(user => user.id === id)[0];

    const [star, setStar] = useState(5);
    const [hover, setHover] = useState(-1);
    const [comment, setComment] = useState();
  
    const handleComment = (event) => {
      setComment(event.target.value);
    };
  
    const submit = (ev) => {
      ev.preventDefault();
      console.log(star, comment)
      dispatch(addReview(id, star, comment, navigate));
    };

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
        <Box sx={{display:'flex', flexDirection:'column',maxWidth:'50%', justifyContent:'center', width:'100vw'}}>
            <h1 style={{textAlign:'center'}}>Add Review Form for {filteredUser?.firstname} {filteredUser?.lastname}</h1>
            <Stack spacing={2} mb={4}>
                {auth.id ? (
                    <FormControl>
                    <Grid container spacing={2} sx={{ display:'flex', justifyContent:'center', alignItems: 'center' }}>
                        <Grid item>
                        <Typography variant="body1" sx={{ fontWeight: '500' }}>
                            Rating:
                        </Typography>
                        </Grid>
                        <Grid item>
                        <Rating
                            name="simple-controlled"
                            value={star}
                            max={5}
                            onChange={(event, newValue) => {
                            event.preventDefault();
                            if (newValue !== null) {
                                setStar(newValue);
                            }
                            }}
                            onChangeActive={(event, newHover) => {
                            setHover(newHover);
                            }}
                        />
                        </Grid>
                        <Grid item>
                        {star !== null && <Box>{hover !== -1 ? hover : star}</Box>}
                        </Grid>
                    </Grid>
                    <Stack spacing={2} alignItems="center">
                        <TextField
                        multiline
                        id="comment"
                        value={comment}
                        onChange={handleComment}
                        placeholder="Please Write Your Review Here"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        rows={5}
                        />
                        <Button
                        variant="contained"
                        onClick={submit}
                        style={{ width: '33%', align: 'center' }}
                        >
                        Submit Your Review
                        </Button>
                    </Stack>
                    </FormControl>
                ) : (
                    <>
                    <br />
                    <Typography variant="body1">
                        {'\n'}Please &nbsp;<Link to="/login">Login</Link>
                    </Typography>
                    </>
                )}
            </Stack>
        </Box>
        </div>
    );
};

export default AddReview;