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
    const [data, setData] = useState('');

    const [el, setEl] = useState(null);
    // const [data, setData] = useState('');

    useEffect(()=> {
        if(el) {
            el.addEventListener('change', (ev)=> {
                const file = ev.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.addEventListener('load', ()=> {
                    setData(reader.result);
                    // console.log(avatar);
                })
            })
        }
    }, [el]);

    const update = (ev) => {
        ev.preventDefault();
        dispatch(updateAuth({id: auth.id, firstname, lastname, address, email, phone, avatar: data}, navigate))
        // navigate(`/users/${auth.id}`)
    
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
                                    value={firstname}
                                    onChange={ev => setFirstname(ev.target.value)}
                                />
                            </div>
                            <div className='inputPair'>
                                <label><strong>Last Name </strong></label>
                                <input 
                                    name="lastname" 
                                    value={lastname} 
                                    onChange={ev => setLastname(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='inputPair'>
                                <label><strong>Address </strong></label>
                                <input 
                                    name="address" 
                                    value={address} 
                                    onChange={ev => setAddress(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div id='email-phone'>
                            <div className='inputPair'>
                                <label><strong>Email </strong></label>
                                <input 
                                    name="email" 
                                    value={email} 
                                    onChange={ev => setEmail(ev.target.value)}
                                />
                            </div>
                             <div className='inputPair'>
                                <label><strong>Phone </strong></label>
                                <input 
                                    name="phone" 
                                    value={phone} 
                                    onChange={ev => setPhone(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='inputPair'>
                                <label><strong>Profile Photo</strong></label>
                                 <input 
                                    type='file'
                                    ref={x => setEl(x)} 
                                    name="data"
                                    // value={data}
                                    onChange={ev => setData(ev.target.value)}
                                />
                            </div>
                            {/* <button disabled={ !data }>Upload Profile Photo</button> */}
                        </div>
                        {/* image is loading */}
                        <img src={data} />
                        <br></br>
                        <button id='edit-button'>Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
