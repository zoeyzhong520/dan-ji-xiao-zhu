import './App.css';
import Home from './pages/home/home'
import GameLibrary from './pages/gameLibrary/gameLibrary'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/gameLibrary' element={<GameLibrary />}></Route>
        </Routes>
      </div>
    </Router>      
  );
}

export default App;
