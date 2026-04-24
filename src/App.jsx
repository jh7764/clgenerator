import React from 'react'
import Home from './components/Home'
import './components/Home.css'
import Content from './components/Content'
import Templates from './components/Templates'
import { HashRouter, Routes, Route } from 'react-router-dom'


export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/content" element={<Content />} />
      </Routes>

    </HashRouter>
    
  );

}