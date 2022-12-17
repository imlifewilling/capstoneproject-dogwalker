import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUser, updateAuth } from '../../store';

const EditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { auth } = useSelector((state) => state);
 
    const [firstname, setFirstname] = useState(auth.firstname || '');
    const [lastname, setLastname] = useState(auth.lastname || '');
    const [address, setAddress] = useState(auth.address || '');
    const [email, setEmail] = useState(auth.email || '');
    const [phone, setPhone] = useState(auth.phone || '');
    const [isWalker, setIsWalker] = useState(auth.isWalker || false);
    const [data, setData] = useState(auth.avatar || '');

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

    console.log(isWalker)

    return (
        <div id='edit_account_page'>
            <div id='edit-account-conatiner'>
                <div id='edit-account-div'>
                    <form onSubmit={update}>
                        <h1>Edit Account Info</h1>
                        <div id='first-last' className='side-by-side'>
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
                            {isWalker ? 
                             <input 
                                type="checkbox" 
                                id="yes" 
                                name="yes" 
                                checked
                                onChange={ev => setIsWalker(!isWalker)}
                            />
                            :
                            <input 
                            type="checkbox" 
                            id="yes" 
                            name="yes" 
                            onChange={ev => setIsWalker(!isWalker)}
                            />
                            }
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
                        <img className='img-size' src={data} />
                        <button className='account-button'>SAVE</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
