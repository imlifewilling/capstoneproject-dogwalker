import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { deleteUser } from '../../store';

const User = () => {
  const { auth } = useSelector((state) => state);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

//   const deleteAccount = () => {
//     if (auth.isAdmin) {
//       const admins = users.filter((user) => user.isAdmin === true);
//       if (admins.length < 2) {
//         alert('Please create another admin before deleting your account.');
//       }
//     }
//     if (confirm('Are you sure you want to delete your account?')) {
//       dispatch(deleteUser(auth, navigate));
//     }
//   };

  return (
    <div id='account_page'>
        <h1>Account Information</h1>
        <img src={auth.avatar}></img>
        <p>
            <strong>Name:</strong> {auth.firstname} {auth.lastname}
        </p>
        <p>
            <strong>Email:</strong> {auth.email}
        </p>
        <p>
            <strong>Phone:</strong> {auth.phone}
        </p>
        <p>
            <strong>Address:</strong> {auth.address}
        </p>
        <h3><Link to={`/users/${auth.id}/edit`}>Edit Account Information</Link></h3>
      <br></br>
      {/* <button onClick={() => deleteAccount()}>Delete Account</button> */}
    </div>
  );
};

export default User;
