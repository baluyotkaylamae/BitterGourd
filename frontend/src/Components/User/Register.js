import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Metadata from '../Layouts/Metadata';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../Layouts/RLForms.css';

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

      <div className="container register-photo-json">
        <div className="form-container">
          <div className="image-holder-reg"></div>
          <form className="shadow-lg form-json" onSubmit={submitHandler} encType="multipart/form-data">
            <h1 className="mb-3 rl-title-des">REGISTER</h1>

            <div className="form-group rl-des">
              <label htmlFor="email_field">Name</label>
              <input type="name" id="name_field" className="form-control" name="name" value={name} onChange={onChange} />
            </div>

            <div className="form-group rl-des">
              <label htmlFor="email_field">Email</label>
              <input type="email" id="email_field" className="form-control " name="email" value={email} onChange={onChange} />
            </div>

            <div className="form-group rl-des">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="form-group rl-des">
              <label htmlFor="avatar_upload" style={{ paddingTop: '30px' }}>
                Avatar
              </label>
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
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-2 ">
              <button
                id="register_button"
                type="submit"
                className="btn-json"
                // disabled={loading ? false : true}
              >
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;