import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Welcome from "./views/Welcome/Welcome";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "welcome" element={<Welcome />}/>
        <Route path = "/" element={<Home />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
