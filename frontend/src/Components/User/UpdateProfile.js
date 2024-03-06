import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../Layouts/Metadata';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../../utils/helpers';

const UpdateProfile = () => {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        const getProfile = async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            };
            try {
                const { data } = await axios.get(`http://localhost:4001/api/me`, config);
                setUser(data.user);
                setName(data.user.name);
                setEmail(data.user.email);
                setAvatarPreview(data.user.avatar.url);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                toast.error('Error fetching user profile', {
                    position: 'top-right', 
                });
            }
        };

        getProfile();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const onChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!name || !email || !avatar) {
            toast.error('All fields are required', {
                position: 'top-right',
            });
            return;
        }
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        try {
            setError('');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getToken()}`,
                },
            };
            setLoading(true);
            const { data } = await axios.put(`http://localhost:4001/api/me/update`, formData, config);
            setIsUpdated(data.success);
            setLoading(false);
            toast.success('Updated Successfully', {
                position: 'top-right',
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.message || 'User update failed', {
                position: 'top-right',
            });
        }
    };

    return (
        <Fragment>
            <MetaData title={'Update Profile'} />

            <section>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-8 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: '.5rem', borderColor: '#8e5f47'}}>
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
                                        <img src={avatarPreview || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                                            alt="Avatar" className="img-fluid my-5" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                                        <h5 style={{ color: '#000', fontSize: '32px', marginBottom: '10px' }}>{name}</h5>
                                        <p style={{ color: '#000', fontSize: '24px', marginBottom: '20px' }}>{user.role}</p>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            {isUpdated && (
                                                <div className="alert alert-success" role="alert">
                                                    Updated successfully!
                                                </div>
                                            )}
                                            <form onSubmit={submitHandler} encType="multipart/form-data">
                                                <div className="form-group">
                                                    <label htmlFor="name_field">Name</label>
                                                    <input
                                                        type="name"
                                                        id="name_field"
                                                        className="form-control"
                                                        name="name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email_field">Email</label>
                                                    <input
                                                        type="email"
                                                        id="email_field"
                                                        className="form-control"
                                                        name="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="avatar_upload">Avatar</label>
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
                                                <button
                                                    type="submit"
                                                    className="btn update-btn btn-block mt-4 mb-3"
                                                    disabled={loading ? true : false}
                                                    style={{marginTop: '30%', backgroundColor: '#BFEA7C',
                                                        borderColor: '#8e5f47'}}
                                                >
                                                    Update
                                                </button>
                                            </form>
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

export default UpdateProfile;
