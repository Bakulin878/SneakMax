// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './styles/globals.css';
// import Header from './components/Header/Header'
// import Main from './components/Main/Maine'
// import Footer from './components/Footer/Footer'
// import HeroSection from './components/HeroSection/HeroSection';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {

  return (
    <div >
      {/* <Header />
      <HeroSection />
      <Main />
      <Footer /> */}
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
