import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';

//import components
import NavBar from "./components/NavBar"

//import pages
import Home from "./pages/Home";
import SingleCountry from "./pages/SingleCountry";
import SplashPage from "./components/SplashPage";
import PopPage from "./pages/ByPopulation";

const App = () => {
  return (
    <>
      <Container>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<SplashPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/country/:name' element={<SingleCountry />} />
            <Route path='/by-population' element={<PopPage />} />
          </Routes>
        </Router>
      </Container>
    </>
  )
}

export default App;