import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import MidSection from './Midsection/MidSection';
import Header from './Header/Header';
import Footer from './Footer/Footer';


function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <MidSection></MidSection>
      <Footer></Footer>
    </BrowserRouter>

  );
}

export default App;
