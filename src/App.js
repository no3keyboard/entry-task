import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import List from './pages/List/List';
import Detail from './pages/Detail/Detail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        {/* <Route path='/' element={<Navigate to='/list' replace />} /> */}
        {/* <Route path='/' element={<Navigate to='/Detail' replace />} /> */}
        <Route path='/List' element={<List/>}></Route>
        <Route path='/Detail' element={<Detail/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
