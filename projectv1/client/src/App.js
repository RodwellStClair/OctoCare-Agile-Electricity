import Login from './Components/login'; // Fix the casing of the file name
import Details from './Components/Details';
import { useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

const [credentials, setCredentials] = useState({});


  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://octopus.energy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1><strong>Octopus</strong>Energy</h1>
          </a>
        </header>
        <Routes>
        
         <Route path='/' element={<Login setCredentials={ setCredentials} credentials = {credentials}  />}></Route>
         <Route path='/details' element={<Details credentials = {credentials} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
