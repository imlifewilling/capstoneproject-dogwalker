import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Dog = () => {
  const { dogs, auth } = useSelector((state) => state);

  console.log(dogs)

  const getDogs = dogs.filter((dog) => dog.userId === auth.id); 

  if(!getDogs) return <h1>...loading</h1>

  return (
    <div>
      <hr></hr>
        {getDogs.length >= 1 ? (
            getDogs.map((dog)=> {
              return (
                <div key={dog.id} id={dog.id}>
                  {dog.nickname}
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

export default Dog;

