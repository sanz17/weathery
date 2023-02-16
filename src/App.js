import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import {Banner } from './components/Banner';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from './components/Homepage';
import Cities from './components/Cities';

function App() {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/Cities" element={<Cities />}></Route>
          {/* <Route path="/Add" element={<Add />}></Route>
          <Route path="/View" element={<View />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
