import React from "react";
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const PetCard = (props) => {
    const {pet, count} = props;

    return (
        <>
            <Card variant='outlined' sx={{ width: '700', height: '200', margin: '10px' }}>
                {/* <CardActionArea component={Link} to={`/walker/${service?.userId}`}> */}
                <Box>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{height:'200', width:'200'}}>
                            <CardMedia
                            component="img"
                            height="200"
                            // image="https://picsum.photos/200/200"
                            image={pet?.avatar || "https://picsum.photos/200/200"}
                            alt={pet?.id}
                            sx={{objectFit:'contain', width:'200'}}
                            />
                        </Box>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {count}. {pet?.nickname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <span style={{color:'black'}}>Description:</span> {pet?.dogDescription}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <span style={{color:'black'}}>Dog Size:</span> {pet?.weight} lbs
                            </Typography>
                        </CardContent>
                        <CardContent sx={{width: '20%'}}>
                            <Typography variant="body2" color="text.secondary">
                            <span style={{color:'black'}}>Breed:</span> {pet?.breed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <span style={{color:'black'}}>Age:</span> {pet?.age_year} Years
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <span style={{color:'black'}}>Gender:</span> {pet?.gender}
                            </Typography>
                        </CardContent>
                    </Box>
                </Box>
            </Card>
        </>
    );
};

export default PetCard;