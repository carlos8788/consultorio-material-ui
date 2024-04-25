
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home';
import { Container } from "@mui/material";
import Layout from "./Layout";
function App() {

  return (
    <Container maxWidth="sm">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Container>
  );
}

export default App;
