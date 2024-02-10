import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Layouts/Header';
import Home from './Home';
import Footer from './Components/Layouts/Footer';
import QuestionsList from './Components/Admin/listQuestions'; // Import the new component for managing questions
import CreateQuestion from './Components/Admin/createQuestions'; // Import the new component for creating questions
import UpdateQuestion from './Components/Admin/updateQuestions';
import Createcategorypost from './Components/Admin/Createcategorypost';
import Listcategorypost from './Components/Admin/Listcategorypost';
import Updatecategorypost from './Components/Admin/Updatecategorypost';
import AnswerForm from './Components/SurveyForm'; // Import the new component
import Posts from './Components/Posts';
import Login from './Components/User/Login'
import Register from './Components/User/Register';
import Profile from './Components/User/Profile'
import UpdateProfile from './Components/User/UpdateProfile';
import ForgotPassword from './Components/User/ForgotPassword';
import NewPassword from './Components/User/NewPassword';
import UpdatePassword from './Components/User/UpdatePassword';
import ProtectedRoute from './Components/Route/ProtectedRoute';
import { getUser } from './utils/helpers';
import UserManagement from './Components/Admin/userManagement';
// import Dashboard from './Components/Admin/Dashboard';
import "react-toastify/dist/ReactToastify.css";
import Sidebar from './Components/Admin/Sidebar';
import Dashboard from './Components/Admin/Dashboard';
import PostList from './Components/Admin/PostList';
import CreatePost from './Components/Admin/PostCreate';
import UpdatePost from './Components/Admin/PostUpdate';
import PostDetails from './Components/Postdetails';




function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact="true" />
          {/* <Route path="/questions" element={<QuestionsList />} />
          <Route path="/questions/create" element={<CreateQuestion />} />
          <Route path="/questions/update/:id" element={<UpdateQuestion />} /> */}

          <Route path="/questions" element={
            <ProtectedRoute isAdmin={true}>
              <QuestionsList />
            </ProtectedRoute>
          } />
          <Route path="/questions/create" element={
            <ProtectedRoute isAdmin={true}>
              <CreateQuestion />
            </ProtectedRoute>
          } />


          <Route path="/questions/update/:id" element={
            <ProtectedRoute isAdmin={true}>
              <UpdateQuestion />
            </ProtectedRoute>
          } />


          <Route path="/dashboard" element={
            <ProtectedRoute isAdmin={true}>

              <Dashboard />
            </ProtectedRoute>
          } end />
          <Route path="/sidebar" element={
            <ProtectedRoute isAdmin={true}>
              <Sidebar />
            </ProtectedRoute>
          } end />


          {/* category */}
          <Route path="/category/create" element={
            <ProtectedRoute isAdmin={true}>
              <Createcategorypost />
            </ProtectedRoute>
          } end />
          <Route path="/category/update/:id" element={
            <ProtectedRoute isAdmin={true}>
              <Updatecategorypost />
            </ProtectedRoute>
          } end />
          <Route path="/category/list" element={
            <ProtectedRoute isAdmin={true}>
              <Listcategorypost />
            </ProtectedRoute>
          } end />

          {/* Post */}
          <Route path="/post/list" element={
            <ProtectedRoute isAdmin={true}>
              <PostList />
            </ProtectedRoute>
          } end />
          <Route path="/post/create" element={
            <ProtectedRoute isAdmin={true}>
              <CreatePost />
            </ProtectedRoute>
          } end />
          <Route path="/post/update/:id" element={
            <ProtectedRoute isAdmin={true}>
              <UpdatePost />
            </ProtectedRoute>
          } end />




          <Route path="/Post" element={<Posts />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/form" element={<AnswerForm />} /> {/* Add the new route for AnswerForm

          {/* login */}
          <Route path="/login" element={<Login />} exact="true" />
          <Route path="/register" element={<Register />} exact="true" />
          <Route path="/me" element={<Profile />} exact="true" />
          <Route path="/me/update" element={<UpdateProfile />} exact="true" />
          <Route path="/password/forgot" element={<ForgotPassword />} exact="true" />
          <Route path="/password/reset/:token" element={<NewPassword />} exact="true" />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UserManagement />
              </ProtectedRoute>
            }
            end
          />



        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
