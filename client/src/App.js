import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import pageRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {pageRoutes.map((route) => (
          <Route
            key={route.name}
            path={route.pathname}
            element={route.component}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
