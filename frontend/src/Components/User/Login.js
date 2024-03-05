import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Metadata from '../Layouts/Metadata';
import Loader from '../Layouts/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authenticate, getUser } from '../../utils/helpers';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import '../Layouts/FH.css';
import '../Layouts/RLForms.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  let location = useLocation();
  //   const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '';
  // const notify = (error) =>
  // toast.error(error, {
  //   position: 'bottom-center',
  // });


  const login = async (email, password) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(`http://localhost:4001/api/login`, { email, password }, config);
      console.log(data);

      authenticate(data, () => navigate('/'));
      window.location.reload();

    } catch (error) {
      toast.error('Invalid user or password', {
        position: 'top-right',
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
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
                          <p>Please login to your account</p>
                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              id="form2Example11"
                              className="form-control"
                              placeholder="email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="form-label" htmlFor="form2Example11">Username</label>
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="form2Example22"
                              className="form-control"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="form-label" htmlFor="form2Example22">Password</label>
                          </div>
                          <div className="text-center pt-1 mb-5 pb-1">
                            <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 text-black" type="submit">Log in</button>
                            {/* <a className="text-muted" href="/password/forgot">Forgot password?</a> */}
                          </div>
                          <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">Don't have an account?</p>
                            <Link to="/register" className="btn btn-outline-success">Create new</Link>
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
      )}
      <Metadata title={'Login'} />
      <ToastContainer />
    </Fragment>
  );
};


export default Login;