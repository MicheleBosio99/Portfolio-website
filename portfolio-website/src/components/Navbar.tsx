import React from 'react';
import './Navbar.css';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: 'home'  | 'cv' | 'projects' | 'skills' | 'timeline') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'cv', label: 'Resume' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'timeline', label: 'Timeline' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={currentPage === item.id ? 'active' : ''}
                onClick={() => onPageChange(item.id as any)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;