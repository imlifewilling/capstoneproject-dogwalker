import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editDog } from '../../store';

const EditDog = () => {
    const { dogs } = useSelector((state) => state);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [nickname, setNickname] = useState('');
    // const [breed, setBreed] = useState('');
    // const [age_year, setAge_year] = useState(0);
    // const [weight, setWeight] = useState('');

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

    const dog = dogs.find((dog) => dog.id === id);

    if(!dog) return <h1>...loading</h1>

    const update = (ev) => {
        ev.preventDefault();
        dispatch(editDog({id: dog.id, nickname, breed, age_year, weight, avatar: data}, navigate))
    };

    return (
        <div id='edit_account_page'>
            <div id='edit-account-conatiner'>
                <div id='edit-account-div'>
                    <form onSubmit={update}>
                        <h1>Edit Dog Info</h1>
                        <div className='side-by-side'>
                    <div className='inputPair'>
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
                <div className='side-by-side'>
                    <div className='inputPair'>
                        <label><strong>Age (years) </strong></label>
                        <input
                            placeholder="Years"
                            name="age_year"
                            value={age_year}
                            onChange={(ev) => {
                                setAge_year(ev.target.value)
                            }}
                        />
                    </div>
                    <div className='inputPair'>
                        <label><strong>(months) </strong></label>
                        <input
                            placeholder="Months"
                            name="age_month"
                            value={age_month}
                            onChange={(ev) => {
                                setAge_month(ev.target.value)
                            }}
                        />
                    </div>
                </div>
                </div>
                <div className='side-by-side'>
                    <div className='inputPair'>
                        <label><strong>Gender </strong></label>
                        <input
                            placeholder="Gender"
                            name="gender"
                            value={gender}
                            onChange={(ev) => {
                                setGender(ev.target.value)
                            }}
                        />
                    </div>
                    <div className='inputPair'>
                        <label><strong>Weight </strong></label>
                        <input
                            placeholder="Weight"
                            name="weight"
                            value={weight}
                            onChange={(ev) => {
                                setWeight(ev.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className='inputPair'>
                    <label><strong>Breed </strong></label>
                    <input
                        placeholder="Breed"
                        name="breed"
                        value={breed}
                        onChange={(ev) => {
                            setBreed(ev.target.value)
                        }}
                    />
                </div>
                <div className='inputPair'>
                    <label><strong>About your pet </strong></label>
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
                    <img className='img-size' src={data} />
                        {/* <div id='first-last'>
                            <div className='inputPair'>
                                <label><strong>Name </strong></label>
                                <input
                                    name="nickname"
                                    defaultValue={dog.nickname}
                                    onChange={ev => setNickname(ev.target.value)}
                                />
                            </div>
                            <div className='inputPair'>
                                <label><strong>Breed </strong></label>
                                <input 
                                    name="breed" 
                                    defaultValue={dog.breed}
                                    onChange={ev => setBreed(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='inputPair'>
                                <label><strong>Age </strong></label>
                                <input 
                                    name="age" 
                                    defaultValue={dog.age_year}
                                    onChange={ev => setAge_year(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div id='email-phone'>
                            <div className='inputPair'>
                                <label><strong>Weight </strong></label>
                                <input 
                                    name="weight" 
                                    defaultValue={dog.weight}
                                    onChange={ev => setWeight(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='inputPair'>
                                <label><strong>Photo</strong></label>
                                 <input 
                                    type='file'
                                    ref={x => setEl(x)} 
                                    name="data"
                                    onChange={ev => setData(ev.target.value)}
                                />
                            </div>
                        </div>
                        <img className='img-size' src={data} /> */}
                        <button className='account-button'>SAVE</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditDog;
