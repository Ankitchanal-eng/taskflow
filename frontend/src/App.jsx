import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
      <Route path="/login" element={<Login/>} />
      <Route path="register" element={<Register/>} />

      {/* Protected Routes - These require the PrivateRoute check */}
      <Route element={<PrivateRoute />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* You could add a 404 page here */}
        {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
      </Routes>
    </Router>
  );
}

export default App;