import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUser } from '../../store';

const EditUser = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstname: auth.firstname,
    lastname: auth.lastname,
    email: auth.email,
    phone: auth.phone,
    address: auth.address
  });

  const onChange = (ev) => {
    setInputs({
      ...inputs,
      [ev.target.name]: ev.target.value,
    });
  };

  const update = (ev) => {
    ev.preventDefault();
    dispatch(editUser({ id: auth.id, ...inputs }, navigate));
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
                    <br></br>
                    <button id='edit-button'>Save</button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default EditUser;
