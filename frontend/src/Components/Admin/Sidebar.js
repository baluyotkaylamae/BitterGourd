import React, { useState } from 'react';
import '../Layouts/FH.css';

const Sidebar = () => {
  const [isQuestionOpen, setQuesttionOpen] = useState(false);

  const toggleQuestion = () => {
    setQuesttionOpen(!isQuestionOpen);
  };



  return (
    <div className="container sidebar-JSON ">
      <div className="bg-light border-right " id="sidebar">
        <div className="list-group list-group-flush ">
          {/* <a href="/dashboard" className="list-group-item list-group-item-action sidebar-dashboard">
            DASHBOARD
          </a> */}

          <button
            onClick={toggleQuestion}
            className="list-group-item list-group-item-action sidebar-dashboard"
            data-toggle="collapse"
            data-target="#categoryDropdown"
          >
           Questions
          </button>
          <div id="questionDropdown" className={`collapse ${isQuestionOpen ? 'show' : ''}`}>
            <a href="/questions/create" className="list-group-item list-group-item-action sidebar-dashboard">
              Create question
            </a>
            <a href="/questions" className="list-group-item list-group-item-action sidebar-dashboard">
              questions List
            </a>
          </div>

          {/* <button
            onClick={toggleAllUsers}
            className="list-group-item list-group-item-action sidebar-dashboard"
            data-toggle="collapse"
            data-target="#userDropdown"
          >
           USERS
          </button>
          <div id="userDropdown" className={`collapse ${isUserOpen ? 'show' : ''}`}>
            <a href="/admin/users" className="list-group-item list-group-item-action sidebar-dashboard">
              User List
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;