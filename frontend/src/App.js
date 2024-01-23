import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Layouts/Header';
import Home from './Home';
import Footer from './Components/Layouts/Footer';
import QuestionsList from './Components/Admin/listQuestions'; // Import the new component for managing questions
import CreateQuestion from './Components/Admin/createQuestions'; // Import the new component for creating questions
import UpdateQuestion from './Components/Admin/updateQuestions';
import AnswerForm from './Components/SurveyForm'; // Import the new component

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact="true" />
          <Route path="/questions" element={<QuestionsList />} />
          <Route path="/questions/create" element={<CreateQuestion />} />
          <Route path="/questions/update/:id" element={<UpdateQuestion />} />

          <Route path="/form" element={<AnswerForm />} /> {/* Add the new route for AnswerForm */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
