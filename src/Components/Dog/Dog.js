import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Dog = (props) => {
  const dispatch = useDispatch();
  const { dogs, auth } = useSelector((state) => state);
  const authID = props.id;
  const getDogs = dogs.filter((dog) => dog.authId === authID);

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
        ) : (
          <div>
            Add a pet!
          </div>
        )
      }
    </div>
  )
};

export default Dog;
