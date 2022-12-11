import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MyServicesCard = (props) => {
    const { users } = useSelector(state=>state);
    const { service, count } = props;

    return (
        <>
            <Card variant='outlined' sx={{ width: 'auto', height: '200', margin: '10px' }}>
                <CardActionArea component={Link} to={`/walker/${service?.userId}`}>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{height:'200', width:'200'}}>
                            <CardMedia
                            component="img"
                            height="200"
                            image={users?.filter(ele=>ele.id===service?.userId)[0]?.avatar || "https://picsum.photos/200/200"}
                            alt={service?.id}
                            sx={{objectFit:'contain', width:'200'}}
                            />
                        </Box>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {count}. {(users?.filter(ele => ele.id === service?.userId))[0]?.firstname}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                Service: {service?.task.length > 1 ? service?.task.join(', ') 
                                            : 
                                          service?.task}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <span style={{color:'black'}}>Description:</span> {service?.serviceDescription}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <span style={{color:'black'}}>Dog Size:</span> {service?.serviceDogsize}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <span style={{color:'black'}}>Price:</span> $ {service?.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <span style={{color:'black'}}>Availability:</span> 
                                {service?.availability.length > 1 ? service?.availability.join(', ')
                                :
                                service?.availability
                                }
                            </Typography>
                        </CardContent>
                        <CardContent sx={{width: '10%'}}>
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                        </CardContent>
                    </Box>
                </CardActionArea>
            </Card>
        </>
    );
};

export default MyServicesCard;