import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

//import components
import NavBar from "./components/NavBar"

//import pages
import Home from "./pages/Home";
import SingleCountry from "./pages/SingleCountry";

const App = () => {
  return (
    <>
      <Container>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/country/:name' element={<SingleCountry />} />
          </Routes>
        </Router>
      </Container>
    </>
  )
}

export default App;