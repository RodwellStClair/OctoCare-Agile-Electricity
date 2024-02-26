import Login from './Components/login'; // Fix the casing of the file name
import Details from './Components/Details';
import Monthconsump from './Components/Monthconsump';
import QuarterConsump from './Components/QuarterConsump';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const [credentials, setCredentials] = useState({});


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login setCredentials={setCredentials} credentials={credentials} />}></Route>
        <Route path='/details' element={<Details credentials={credentials} />}></Route>
        <Route path='/month' element={<Monthconsump/>}></Route>
        <Route path='/quarter' element={<QuarterConsump/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
