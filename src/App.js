import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SearchQuestion from './SearchQuestion';
import ManageQuestions from './ManageQuestion';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact Component={Home}/>
        <Route path='/search-questions' Component={SearchQuestion}/>
        <Route path='/manage-questions' Component={ManageQuestions}/>
      </Routes>
    </Router>
  );
}

export default App;
