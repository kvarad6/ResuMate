import './App.css';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Response from './components/Response';
import { Box } from '@mui/material';


function App() {
  return (
    <div className="background-image">
      <Box sx={{ height: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/response" element={<Response />} />
        </Routes>
      </Box>
    </div >
  );
}


export default App;




