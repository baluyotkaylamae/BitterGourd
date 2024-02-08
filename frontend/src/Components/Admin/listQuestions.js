import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBDataTable } from 'mdbreact';
import Dashboard from './Dashboard';
// import './CRUD.css';

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4001/api/questions')
      .then((res) => {
        setQuestions(res.data.questions);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (questionId) => {
    axios
      .delete(`http://localhost:4001/api/questions/${questionId}`)
      .then(() => {
        setQuestions(questions.filter((question) => question._id !== questionId));
        toast.success('Question deleted successfully');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to delete question');
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
          label: 'Question Text',
          field: 'questionText',
          sort: 'asc',
        },
        {
          label: 'Options',
          field: 'options',
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

    questions.forEach((question) => {
      data.rows.push({
        _id: question._id,
        questionText: question.questionText,
        options: question.options.join(', '), // Assuming options is an array
        actions: (
          <div>
            <Link to={`/questions/update/${question._id}`} className="btn btn-warning mr-2">
              Edit
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(question._id)}
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
      <Dashboard />
      <div className="row">
        <div className="col-md-3">
        
        </div>
        <div className="col-md-9" style={{ color: '#A97155' }}>
          <h2 className="title-crud">List of Questions</h2>
          <Link to="/questions/create" className="btn btn-primary mb-3">
            Create Question
          </Link>
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

export default QuestionsList;
