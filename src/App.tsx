import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import CurriculumVitae from './components/CurriculumVitae'

import HexGrid from './backgrounds/HexGrid';

import './App.css';

type Page = 'home' | 'cv' | 'projects' | 'skills' | 'timeline';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const pageContentRef = useRef<HTMLDivElement>(null);

  /*
    .page-content is the scroll container, and it is not remounted between
    pages — only its children swap — so its scroll position would otherwise
    carry over. Reset it to the top on every page change.
  */
  useEffect(() => {
    pageContentRef.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentPage]);

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

  return (
    <div className="app">
      {<HexGrid />}
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-window">
          <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
          <div className="page-content" ref={pageContentRef}>
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;