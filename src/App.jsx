import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UnicornsContainer from './unicorns/UnicornsContainer';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/unicornios" element={<UnicornsContainer />} />
    </Routes>
  </BrowserRouter>
);

export default App;