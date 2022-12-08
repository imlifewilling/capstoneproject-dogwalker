import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateAuth, editUser } from '../../store';

const EditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { auth } = useSelector((state) => state);
 
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');

    const [el, setEl] = useState(null);
    // const [data, setData] = useState('');

    // const [inputs, setInputs] = useState({
        //     firstname: auth.firstname,
        //     lastname: auth.lastname,
        //     address: auth.address,
        //     email: auth.email,
        //     phone: auth.phone,
        //     avatar: auth.avatar
        //   });

  useEffect(()=> {
    if(el) {
        el.addEventListener('change', (ev)=> {
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', ()=> {
                setAvatar(reader.result);
                // console.log(avatar);
            })
        })
    }
  }, [el]);

//   const onChange = (ev) => {
//     setInputs({
//       ...inputs,
//       [ev.target.name]: ev.target.value,
//     });
//   };

  const update = (ev) => {
    ev.preventDefault();
    dispatch(editUser({id: auth.id, firstname, lastname, address, email, phone, avatar}, navigate));
    // dispatch(editUser({ id: auth.id, ...inputs }, navigate));
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
                                // onChange={onChange}
                            />
                        </div>
                        <div className='inputPair'>
                            <label><strong>Last Name </strong></label>
                            <input 
                                name="lastname" 
                                value={lastname} 
                                onChange={ev => setLastname(ev.target.value)}
                                // onChange={onChange} 
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
                                // onChange={onChange} 
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
                                // onChange={onChange} 
                            />
                        </div>
                        <div className='inputPair'>
                            <label><strong>Phone </strong></label>
                            <input 
                                name="phone" 
                                value={phone} 
                                onChange={ev => setPhone(ev.target.value)}
                                // onChange={onChange} 
                            />
                        </div>
                    </div>
                    <div>
                        <div className='inputPair'>
                            <label><strong>Profile Photo</strong></label>
                            <input 
                                type='file'
                                ref={x => setEl(x)} 
                                name="avatar"
                                value={avatar}
                                onChange={ev => setAvatar(ev.target.value)}
                                // onChange={onChange}
                            />
                        </div>
                        {/* <button disabled={ !data }>Upload Profile Photo</button> */}
                    </div>
                    {/* image is loading */}
                    <img src={avatar} />
                    <br></br>
                    <button id='edit-button'>Save</button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default EditUser;
