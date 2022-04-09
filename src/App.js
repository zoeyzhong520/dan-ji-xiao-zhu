import './App.css';
import Home from './pages/home/home'
import GameLibrary from './pages/gameLibrary/gameLibrary'
import GameDetail from './pages/gameLibrary/gameDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/gameLibrary' element={<GameLibrary />}></Route>
          <Route exact path='/gameDetail' element={<GameDetail />}></Route>
        </Routes>
      </div>
    </Router>      
  );
}

export default App;
