import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateAuth } from '../../store';

const EditUser = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [el, setEl] = useState(null);
  const [data, setData] = useState('');

  useEffect(()=> {
    if(el) {
        el.addEventListener('change', (ev)=> {
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', ()=> {
                setData(reader.result);
                console.log(data);
            })
        })
    }
  }, [el]);

  const [inputs, setInputs] = useState({
    firstname: auth.firstname,
    lastname: auth.lastname,
    address: auth.address,
    email: auth.email,
    phone: auth.phone,
    avatar: auth.avatar
  });

  const onChange = (ev) => {
    setInputs({
      ...inputs,
      [ev.target.name]: ev.target.value,
    });
  };

  const update = (ev) => {
    ev.preventDefault();
    dispatch(updateAuth({id: auth.id, ...inputs}, navigate));
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
                                value={inputs.firstname}
                                onChange={onChange}
                            />
                        </div>
                        <div className='inputPair'>
                            <label><strong>Last Name </strong></label>
                            <input name="lastname" value={inputs.lastname} onChange={onChange} />
                        </div>
                    </div>
                    <div>
                        <div className='inputPair'>
                            <label><strong>Address </strong></label>
                            <input name="address" value={inputs.address} onChange={onChange} />
                        </div>
                    </div>
                    <div id='email-phone'>
                        <div className='inputPair'>
                            <label><strong>Email </strong></label>
                            <input name="email" value={inputs.email} onChange={onChange} />
                        </div>
                        <div className='inputPair'>
                            <label><strong>Phone </strong></label>
                            <input name="phone" value={inputs.phone} onChange={onChange} />
                        </div>
                    </div>
                    <div>
                        <input 
                            type='file'
                            ref={x => setEl(x)} 
                            name="avatar"
                            value={inputs.avatar}
                            onChange={onChange}
                        />
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
