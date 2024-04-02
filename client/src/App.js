import Login from './Components/login'; 
import Details from './Components/Details';
import Consumption from './Components/Consumption';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/details' element={<Details />}></Route>
          <Route path='/Consumption' element={<Consumption />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
