import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={ <Dashboard /> } />
          <Route path='/login' element={ <Login /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
