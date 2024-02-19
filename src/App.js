import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav/Nav'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from './Components/Homepage/Home'
import Details from './Components/renderdetails/Details';

import './App.css'

function App() {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <Router>
          <Nav />
          <Routes>
          <Route path="/" element={<Home />} />

            {/* <Route path="/Contact" element={<Contact />}/> */}
            <Route path="/Details/:id" element={<Details />} />
          </Routes>
        </Router>

      </QueryClientProvider>
    </>
  )
}

export default App
