import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dog = () => {
  const { dogs, auth } = useSelector((state) => state);

  const getDogs = dogs.filter((dog) => dog.userId === auth.id); 

  if(!getDogs) return <h1>...loading</h1>

  const DogCard = (props) => {
    return (
      <div id='pet-profile-card'> 
        <div className='profile-info'>
          <img className='profile-img'src={props.avatar}></img>
          <div className='user-info-div'>
            <strong className='profile-heading'>{props.nickname}</strong> 
            <p>
            <strong>Breed:</strong> {props.breed}
            </p>
            <p>
            <strong>Age:</strong> {props.age_year} years old
            </p>
            <p>
            <strong>Weight:</strong> {props.weight} lbs.
            </p>
          </div>
        </div>
        <div id='update-button-div'>
          <h3><Link className='profile-link' to={`/dogs/${props.id}/edit`}>Update</Link></h3>
        </div> 
      </div>
    )
  }

  return (
    <div>
      {/* <hr></hr> 
      <h2>Pets</h2> */}
        {getDogs.length >= 1 ? (
            getDogs.map((dog)=> {
              return (
                <div>
                  <div>
                    <DogCard 
                      id={dog.id}
                      key={dog.id}
                      avatar={dog.avatar}
                      nickname={dog.nickname}
                      breed={dog.breed}
                      age_year={dog.age_year}
                      weight={dog.weight}
                    />
                  </div>
                </div>
              )
            }        
          ) 
         )
         : (
          <div>
          </div>
        )
      }
      <div>
        <h4><Link to={'/createdog'}>Add pet</Link></h4>
      </div>
    </div>
  )
};

export default Dog;

