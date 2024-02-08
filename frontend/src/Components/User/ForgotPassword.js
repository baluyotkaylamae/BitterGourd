import React, { Fragment, useState } from 'react';
import MetaData from '../Layouts/Metadata';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const forgotPassword = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(`http://localhost:4001/api/password/forgot`, formData, config);
      console.log(data.message);

      setLoading(false);
      toast.success(data.message, {
        position: 'top-center',
      });
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message, {
        position: 'top-center',
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      email,
    };
    forgotPassword(formData);
  };

  return (
    <Fragment>
      <MetaData title={'Forgot Password'} />
      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="card-body p-md-5 mx-md-4">
                  <h1 className="mb-3">Forgot Password</h1>
                  <form onSubmit={submitHandler}>
                    <div className="form-outline mb-4">
                      <label htmlFor="email_field">Enter Email</label>
                      <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="text-center pt-1 mb-5 pb-1 text-black">
                      <button
                        id="forgot_password_button"
                        type="submit"
                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 text-black"
                        disabled={loading ? true : false}
                      >
                        Send Email
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ForgotPassword;
