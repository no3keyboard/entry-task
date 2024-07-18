import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import List from './pages/List/List';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Login/>}></Route> */}
        <Route path='/' element={<Navigate to='/list' replace />} />
        <Route path='/List' element={<List/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
