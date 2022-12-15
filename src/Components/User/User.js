import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Dog from '../Dog/Dog'; 
// import { deleteUser } from '../../store';

//add button to become walker 

const User = () => {
  const { auth } = useSelector((state) => state);
  const { id } = useParams();
  console.log(id)
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
      <div className='profile-card-container'>
        <div id='heading-card'>
      <h1>Account Information</h1>
        <div className='profile-card'>
          <div className='profile-info'>
            <img className='profile-img'src={auth.avatar}></img>
            <div className='user-info-div'>
              <strong>Name:</strong> {auth.firstname} {auth.lastname}
              <p>
              <p>
              <strong>Address:</strong> {auth.address}
              </p>
              <strong>Email:</strong> {auth.email}
              </p>
              <p>
              <strong>Phone:</strong> {auth.phone}
              </p>
            </div>
          </div>
        <div id='update-button-div'>
          <h3><Link to={`/users/${auth.id}/edit`}>Update</Link></h3>
        </div>
        {/* <button onClick={() => deleteAccount()}>Delete Account</button> */}
        </div>
        </div>
      </div>
      <div className='profile-card-container'>
        <div id='heading-dog'>
          <div id='hr-container'>
            <div id='profile-hr'>
              <hr></hr> 
            </div>
          </div>
          <h2>Pets</h2>
          <Dog />
        </div>
          
      </div>
    </div>
  );
};

export default User;
