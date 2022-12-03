import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ServiceCard = (props) => {
    const { users } = useSelector(state=>state);
    const { service } = props;

    return (
        <>
            <Card sx={{ width: 'auto', height: '200', margin: '10px' }}>
                <CardActionArea component={Link} to={`/services/${service?.id}`}>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <CardMedia
                        component="img"
                        height="200"
                        image="https://picsum.photos/200/200"
                        alt={service?.id}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {(users?.filter(ele => ele.id === service?.userId))[0]?.firstname}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                Service: {service?.task}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {service?.serviceDescription}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Dog Size: {service?.serviceDogsize}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                $ {service?.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Availability: {service?.availability}
                            </Typography>
                        </CardContent>

                    </Box>
                </CardActionArea>
            </Card>
        </>
    );
};

export default ServiceCard;