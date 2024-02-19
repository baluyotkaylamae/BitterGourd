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
import TutorialPage from './Components/categorypages/TutorialsCategory';
import Tips from './Components/categorypages/TipsCategorypage';
import Facts from './Components/categorypages/FactsCategory';
import Video1 from './Components/Videos/video1';
import StaticHome from './Components/Static/StaticHome';
import StaticPage1 from './Components/Static/StaticPage1';
import StaticPage2 from './Components/Static/StaticPage2';
import StaticPage3 from './Components/Static/StaticPage3';
import StaticPage4 from './Components/Static/StaticPage4';
import StaticPage5 from './Components/Static/StaticPage5';
import StaticPage6 from './Components/Static/StaticPage6';
import StaticPage7 from './Components/Static/StaticPage7';
import StaticPage8 from './Components/Static/StaticPage8';
import StaticPageContent from './Components/Static/StaticPageContent';

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


         
        
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/form" element={<AnswerForm />} /> {/* Add the new route for AnswerForm
          
           {/* CateforyPages */}
          <Route path="/tutorials" element={<TutorialPage/>} />
          <Route path="/Tips" element={<Tips/>} />
          <Route path="/Facts" element={<Facts/>} />

          {/* videos */}
          <Route path="/statichome" element={<StaticHome/>} />
          <Route path="/staticvid1" element={<StaticPage1/>} />
          <Route path="/staticvid2" element={<StaticPage2/>} />
          <Route path="/staticvid3" element={<StaticPage3/>} />
          <Route path="/staticvid4" element={<StaticPage4/>} />
          <Route path="/staticvid5" element={<StaticPage5/>} />
          <Route path="/staticvid6" element={<StaticPage6/>} />
          <Route path="/staticvid7" element={<StaticPage7/>} />
          <Route path="/staticvid8" element={<StaticPage8/>} />
          <Route path="/staticvidcontent/:videoId" element={<StaticPageContent />} />
          <Route path="/video1" element={<Video1/>} />

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
