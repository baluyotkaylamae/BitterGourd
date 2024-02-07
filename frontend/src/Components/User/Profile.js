import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/Metadata';
import { getUser } from '../../utils/helpers';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../utils/helpers';

const Profile = () => {
  // const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({}); // Initialize as an object

  const getProfile = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    };
    try {
      const { data } = await axios.get(`http://localhost:4001/api/me`, config);
      console.log(data);
      setUser(data.user);
      // setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Invalid user or password", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Fragment>
      {/* {loading ? ( */}
        {/* <Loader /> */}
      {/* ) : ( */}
        <Fragment>
          <MetaData title={'Your Profile'} />

          <div className="background-page">
            <div className="profile"
              style={{
                border: '3px solid #8e5f47',
                borderRadius: '15px'
              }}>
              {/* <img src="./coffee.png" alt="Coffee Logo" className="mt-1 ml-5" /> */}
              <h2 className="mt-1 ml-5">Profile</h2>

              <div className="mt-5 user-info row">
                {/* Avatar Column */}
                <div className="col-12 col-md-6">
                  <figure className="avatar avatar-profile">
                    {user.avatar && user.avatar.url ? (
                      <img className="rounded img-fluid" src={user.avatar.url} alt={user.name} />
                    ) : null}
                  </figure>
                </div>

                {/* User Details Column */}
                <div className="col-12 col-md-5">
                  <h4>Full Name</h4>
                  <p>{user.name}</p>

                  <h4>Email Address</h4>
                  <p>{user.email}</p>

                  <h4>Joined On</h4>
                  <p>{String(user.createdAt).substring(0, 10)}</p>

                  <div className="button-container">
                    <div className="button">
                      <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block">
                        Edit Profile
                      </Link>
                    </div>
                    <div className="button">
                      <Link to="/password/update" className="btn btn-primary btn-block">
                        Change Password
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      {/* )} */}
    </Fragment>
  );
};

export default Profile;
