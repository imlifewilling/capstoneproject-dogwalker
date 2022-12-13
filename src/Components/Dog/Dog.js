import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dog = () => {
  const { dogs, auth } = useSelector((state) => state);

  console.log(dogs)

  const getDogs = dogs.filter((dog) => dog.userId === auth.id); 

  if(!getDogs) return <h1>...loading</h1>

  return (
    <div>
      <hr></hr>
      <h2>Pets</h2>
        {getDogs.length >= 1 ? (
            getDogs.map((dog)=> {
              return (
                <div key={dog.id} className='profile-card'>
                  <div className='profile-info'>
                    <img className='profile-img'src={dog.avatar}></img>
                    <div className='user-info-div'>
                      <strong>Name:</strong> {dog.nickname}
                      <p>
                        <strong>Breed:</strong> {dog.breed}
                      </p>
                      <p>
                        <strong>Age:</strong> {dog.age_year} years old
                      </p>
                      <p>
                        <strong>Weight:</strong> {dog.weight} lbs.
                      </p>
                    </div>
                  </div>
                  <div id='update-button-div'>
                    <h3><Link to='#'>Update</Link></h3>
                  </div>
                </div>
              )
            }
          ) 
         )
         : (
          <div>
            Add a pet!
          </div>
        )
      }
    </div>
  )
};


{/* 
            <img className='profile-img'src={auth.avatar}></img>
            <div id='user-info-div'>
              <strong>Name:</strong> {auth.firstname} {auth.lastname}
              <p>
              <p>
              <strong>Address:</strong> {auth.address}
              </p>
              <strong>Email:</strong> {auth.email}
              </p>
              <p>
              <strong>Phone:</strong> {auth.phone}
              </p>
            </div>
          </div> */}

export default Dog;

