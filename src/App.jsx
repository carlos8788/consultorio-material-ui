
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home';
import { Container } from "@mui/material";

function App() {
  
  return (
    <Container maxWidth="sm">      
      <Routes>
        <Route path="/" element={ <Home /> } />
      </Routes>
    </Container>
  );
}

export default App;
