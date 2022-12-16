import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUser, updateAuth } from '../../store';

const EditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { auth } = useSelector((state) => state);
 
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isWalker, setIsWalker] = useState(false);
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

    const update = (ev) => {
        ev.preventDefault();
        dispatch(updateAuth({id: auth.id, firstname, lastname, address, email, phone, isWalker, avatar: data}, navigate))
    };

    return (
        <div id='edit_account_page'>
            <div id='edit-account-conatiner'>
                <div id='edit-account-div'>
                    <form onSubmit={update}>
                        <h1>Edit Account Info</h1>
                        <div id='first-last'>
                            <div className='inputPair'>
                                <label><strong>First Name </strong></label>
                                <input
                                    name="firstname"
                                    defaultValue={auth.firstname}
                                    onChange={ev => setFirstname(ev.target.value)}
                                />
                            </div>
                            <div className='inputPair'>
                                <label><strong>Last Name </strong></label>
                                <input 
                                    name="lastname" 
                                    defaultValue={auth.lastname}
                                    onChange={ev => setLastname(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='inputPair'>
                                <label><strong>Address </strong></label>
                                <input 
                                    name="address" 
                                    defaultValue={auth.address}
                                    onChange={ev => setAddress(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div id='email-phone'>
                            <div className='inputPair'>
                                <label><strong>Email </strong></label>
                                <input 
                                    name="email" 
                                    defaultValue={auth.email}
                                    onChange={ev => setEmail(ev.target.value)}
                                />
                            </div>
                             <div className='inputPair'>
                                <label><strong>Phone </strong></label>
                                <input 
                                    name="phone" 
                                    defaultValue={auth.phone}
                                    onChange={ev => setPhone(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div id='checkbox'>
                            <label for="yes"><strong>Become a walker</strong></label><br/>
                            <input 
                                type="checkbox" 
                                id="yes" 
                                name="yes" 
                                onChange={ev => setIsWalker(ev.target.value)}
                            />
                        </div>
                        <div>
                            <div className='inputPair'>
                                <label><strong>Profile Photo</strong></label>
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
                        <button id='edit-button'>SAVE</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
