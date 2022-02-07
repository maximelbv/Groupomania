import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";
import Signup from './views/Signup/Signup';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home />}/>
        <Route path = "signup" element={<Signup />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
