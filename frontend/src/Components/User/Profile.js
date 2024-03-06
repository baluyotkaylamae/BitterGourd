import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../Layouts/Metadata';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../utils/helpers';

const Profile = () => {
  const [user, setUser] = useState({});

  const getProfile = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    };
    try {
      const { data } = await axios.get(`http://localhost:4001/api/me`, config);
      setUser(data.user);
    } catch (error) {
      console.log(error);
      toast.error("Invalid user or password", {
        position: 'top-right'
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Fragment>
      <MetaData title={'Your Profile'} />

      <section>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-8 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: '.5rem',borderColor: '#8e5f47' }}>
                <div className="row g-0">
                  <div className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: '.5rem',
                      borderBottomLeftRadius: '.5rem',
                      padding: '40px',
                      height: '100%', 
                      display: 'flex',
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                    <img src={user.avatar?.url || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                      alt="Avatar" className="img-fluid my-5" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                    <h5 style={{ color: '#000', fontSize: '32px', marginBottom: '10px' }}>{user.name}</h5>
                    <p style={{ color: '#000', fontSize: '24px', marginBottom: '20px' }}>{user.role}</p>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted" style={{ fontSize: '20px' }}>{user.email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Joined On</h6>
                          <p className="text-muted" style={{ fontSize: '20px' }}>{String(user.createdAt).substring(0, 10)}</p>
                        </div>
                      </div>
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
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Profile;
