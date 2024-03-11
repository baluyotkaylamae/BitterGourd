import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import { MDBDataTable } from 'mdbreact';
import './Crud.css';

const CategoryDataTable = () => {
    const [forums, setForum] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:4001/api/forum')
            .then((res) => {
                console.log(res.data)
                setForum(res.data.forum);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleDelete = (forumId) => {
        axios
            .delete(`http://localhost:4001/api/forum/${forumId}`)
            .then(() => {
                setForum(forums.filter((forum) => forum._id !== forumId));
                toast.success('Forum deleted successfully');
            })
            .catch((err) => {
                console.error(err);
                toast.error('Failed to delete forum ');
            });
    };

    const setDataTable = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: '_id',
                    sort: 'asc',
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc',
                },
                {
                    label: 'Content',
                    field: 'content',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc',
                },
                
            ],
            rows: [],
        };

        forums?.forEach((forum) => {
            data.rows.push({
                _id: forum._id,
                title: forum.title, // Include title field
                content: forum.content, // Include content field
                actions: (
                    <div>
                        <button
                            className="btn btn-danger ml-2"
                            onClick={() => handleDelete(forum._id)}
                        >
                            Delete
                        </button>
                    </div>
                ),
            });
        });

        return data;
    };


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9" style={{ color: '#A97155' }}>
                    <h2 className="title-crud">List of Forum</h2>

                    <MDBDataTable
                        data={setDataTable()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default CategoryDataTable;