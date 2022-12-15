import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editDog } from '../../store';

const EditDog = () => {
    const { dogs } = useSelector((state) => state);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [nickname, setNickname] = useState('');
    const [breed, setBreed] = useState('');
    const [age_year, setAge_year] = useState(0);
    const [weight, setWeight] = useState('');

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
                        <div id='first-last'>
                            <div className='inputPair'>
                                <label><strong>Name </strong></label>
                                <input
                                    name="nickname"
                                    // value={dog.nickname}
                                    onChange={ev => setNickname(ev.target.value)}
                                />
                            </div>
                            <div className='inputPair'>
                                <label><strong>Breed </strong></label>
                                <input 
                                    name="breed" 
                                    // value={dog.breed} 
                                    onChange={ev => setBreed(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='inputPair'>
                                <label><strong>Age </strong></label>
                                <input 
                                    name="age" 
                                    // value={dog.age_year} 
                                    onChange={ev => setAge_year(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div id='email-phone'>
                            <div className='inputPair'>
                                <label><strong>Weight </strong></label>
                                <input 
                                    name="weight" 
                                    // value={dog.weight} 
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
                        <img src={data} />
                        <br></br>
                        <button id='edit-button'>SAVE</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditDog;
