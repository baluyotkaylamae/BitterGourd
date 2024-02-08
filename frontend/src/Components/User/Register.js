import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Metadata from '../Layouts/Metadata';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../Layouts/RLForms.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error) {
      toast.error(error, {
        position: 'top-right',
      });
      setError('');
    }
  }, [error, isAuthenticated, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !email || !password || !avatar) {
      toast.error('All fields are required, including the avatar', {
        position: toast,
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);

    register(formData);
  };

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const register = async (userData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(`http://localhost:4001/api/register`, userData, config);
      console.log(data.user);
      setIsAuthenticated(true);
      setLoading(false);
      setUser(data.user);
      navigate('/');
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      setUser(null);
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <Metadata title={'Register User'} />
      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src="/images/logo.png" style={{ width: '185px' }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">We are The BitterFloral Guard Team</h4>
                      </div>
                      <form onSubmit={submitHandler}>
                        <p>Please register your account</p>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="name_field"
                            className="form-control"
                            placeholder="Enter your name"
                            name="name"
                            value={name}
                            onChange={onChange}
                          />
                          <label className="form-label" htmlFor="name_field">Name</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            placeholder="Enter your email"
                            name="email"
                            value={email}
                            onChange={onChange}
                          />
                          <label className="form-label" htmlFor="email_field">Email</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            placeholder="Enter your password"
                            name="password"
                            value={password}
                            onChange={onChange}
                          />
                          <label className="form-label" htmlFor="password_field">Password</label>
                        </div>
                        <div className="form-group mb-4">
                          <label htmlFor="avatar_upload">Avatar</label>
                          <div className="d-flex align-items-center">
                            <div>
                              <figure className="avatar mr-3 item-rtl ">
                                <img src={avatarPreview} className="rounded-circle" alt="Avatar Preview" />
                              </figure>
                            </div>
                            <div className="custom-file">
                              <input
                                type="file"
                                name="avatar"
                                className="custom-file-input"
                                id="customFile"
                                accept="image/*"
                                onChange={onChange}
                              />
                              <label className="custom-file-label" htmlFor="customFile">Choose Avatar</label>
                            </div>
                          </div>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 text-black" type="submit">Register</button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Already have an account?</p>
                          <Link to="/login" className="btn btn-outline-success">Login</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">Embrace the bitterness of life's challenges just as you would the bitter gourd,
                         for within its bitterness lies the potential for growth and health.</p>
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

export default Register;
