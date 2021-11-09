import './App.css';
import { useEffect } from 'react'
import { ConnectionContext, socket } from './connection';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Play from './pages/Play';

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    })
  }, []);

  return (
    <ConnectionContext.Provider value={socket}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/play' element={<Play />} />
        </Routes>
      </Router>
      {/* <div className="App">
        <p>Hey there</p>
      </div> */}
    </ConnectionContext.Provider>
  );
}

export default App;
