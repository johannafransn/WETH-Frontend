import { Route, Routes } from 'react-router-dom';

import HomeWrap from './pages/HomeWrap'; 
import Wrap from './pages/Wrap'; 

import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<HomeWrap />} />
          <Route path='/wrap' element={<Wrap />} />
          <Route path='/about' element={<About />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

