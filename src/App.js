import './App.css';
import Home from './pages/home/home'
import GameLibrary from './pages/gameLibrary/gameLibrary'
import GameDetail from './pages/gameLibrary/gameDetail'
import BuzzInformation from './pages/buzzInformation/buzzInformation'
import BuzzDetail from './pages/buzzInformation/buzzDetail'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/gameLibrary' element={<GameLibrary />}></Route>
          <Route exact path='/gameDetail' element={<GameDetail />}></Route>
          <Route exact path='/buzzInformation' element={<BuzzInformation />}></Route>
          <Route exact path='/buzzDetail' element={<BuzzDetail />}></Route>
        </Routes>
      </div>
    </Router>      
  );
}

export default App;
