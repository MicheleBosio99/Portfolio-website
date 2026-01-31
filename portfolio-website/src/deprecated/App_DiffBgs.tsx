import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import CurriculumVitae from './components/CurriculumVitae'

// Background imports
import AsciiDonut from './backgrounds/AsciiDonut';
import CodeSnippets from './backgrounds/CodeSnippets';
import HexGrid from './backgrounds/HexGrid';
import NeuralNetwork from './backgrounds/NeuralNetwork';
import RetroTerminal from './backgrounds/RetroTerminal';

import './App.css';

type Page = 'home' | 'cv' | 'projects' | 'skills' | 'timeline';

// ============================================
// CHANGE THIS TO SWITCH BACKGROUNDS
// Options: 'donut' | 'code' | 'hex' | 'neural' | 'retro' | 'none'
// ============================================
const ACTIVE_BACKGROUND: 'donut' | 'code' | 'hex' | 'neural' | 'retro' | 'none' = 'hex';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'timeline':
        return <Timeline />;
      case 'cv':
        return <CurriculumVitae />;
      default:
        return <Home />;
    }
  };

  // const renderBackground = () => {
  //   switch (ACTIVE_BACKGROUND) {
  //     case 'donut':
  //       return <AsciiDonut />;
  //     case 'code':
  //       return <CodeSnippets />;
  //     case 'hex':
  //       return <HexGrid />;
  //     case 'neural':
  //       return <NeuralNetwork />;
  //     case 'retro':
  //       return <RetroTerminal />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="app">
      {<HexGrid />}
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-window">
          <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
          <div className="page-content">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
