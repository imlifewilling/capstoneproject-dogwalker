import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createDog } from '../../store';
import { useNavigate } from 'react-router-dom';

const CreateDog = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => state);

  const userId = auth.id;

  const [nickname, setNickname] = useState('');
  const [age_year, setAge_year] = useState(0);
  const [age_month, setAge_month] = useState(0);
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [breed, setBreed] = useState('');
  const [dogDescription, setDogDescription] = useState('');

  const [data, setData] = useState('');
  const [el, setEl] = useState(null);

  useEffect(()=> {
    if(el) {
        el.addEventListener('change', (ev)=> {
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', ()=> {
                setData(reader.result);
            })
        })
    }
}, [el]);   


  const create = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(createDog({userId, nickname, age_year, age_month, gender, weight, breed, dogDescription, avatar: data}, navigate));
    } catch (err) {
        console.log(err);
    }
  };

  return (
    <div id='creat-dog-page'>
      <h1>Tell Us About Your Pet</h1>
      <form onSubmit={create}>
        <div>
          <label><strong>Name </strong></label>
          <input
            placeholder="Name"
            name="nickname"
            value={nickname}
            onChange={(ev) => {
                setNickname(ev.target.value)
            }}
          />
        </div>
        <div>
          <label><strong>Age: </strong></label>
          <input
            placeholder="Years"
            name="age_year"
            value={age_year}
            onChange={(ev) => {
                setAge_year(ev.target.value)
            }}
          />
           <input
            placeholder="Months"
            name="age_month"
            value={age_month}
            onChange={(ev) => {
                setAge_month(ev.target.value)
            }}
          />
        </div>
        <div>
          <label><strong>Gender: </strong></label>
          <input
            placeholder="Gender"
            name="gender"
            value={gender}
            onChange={(ev) => {
                setGender(ev.target.value)
            }}
          />
        </div>
        <div>
          <label><strong>Weight: </strong></label>
          <input
            placeholder="Weight"
            name="weight"
            value={weight}
            onChange={(ev) => {
                setWeight(ev.target.value)
            }}
          />
        </div>
        <div>
          <label><strong>Breed: </strong></label>
          <input
            placeholder="Breed"
            name="breed"
            value={breed}
            onChange={(ev) => {
                setBreed(ev.target.value)
            }}
          />
        </div>
        <div>
          <label><strong>About your pet: </strong></label>
          <textarea
            placeholder="Add a description of your pet"
            name="dogDescription"
            value={dogDescription}
            onChange={(ev) => {
                setDogDescription(ev.target.value)
            }}
          />
        </div>
        <div>
                            <div className='inputPair'>
                                <label><strong>Photo</strong></label>
                                <div id='input-field'>
                                 <input 
                                    className='photo-upload'
                                    type='file'
                                    ref={x => setEl(x)} 
                                    name="data"
                                    onChange={ev => setData(ev.target.value)}
                                />
                                </div>
                            </div>
                        </div>
                        <img src={data} />
        <button>Save pet</button>
      </form>
    </div>
  );
};

export default CreateDog;
