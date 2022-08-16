import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Render the application
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* If the URL path is /, render the dashboard, else render the login screen */}
          <Route path='/' element={ <Dashboard /> } />
          <Route path='/login' element={ <Login /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
