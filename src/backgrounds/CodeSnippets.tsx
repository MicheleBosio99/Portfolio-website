import React, { useEffect, useRef } from 'react';
import './CodeSnippets.css';

const CodeSnippets: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const snippets = [
      'const app = () => { }',
      'function render() { }',
      'import React from "react"',
      'let x = 42;',
      'async def main():',
      'if (true) { }',
      'for (let i = 0; i < n; i++)',
      'return <div />',
      'class Component { }',
      'npm install react',
      'git commit -m "fix"',
      'SELECT * FROM users',
      'docker-compose up',
      'while (condition) { }',
      'export default App;',
      '{ useState } from "react"',
      'const [state, setState]',
      'arr.map(x => x * 2)',
      'try { } catch (e) { }',
      'interface Props { }'
    ];

    const elements: HTMLDivElement[] = [];

    for (let i = 0; i < 25; i++) {
      const el = document.createElement('div');
      el.className = 'code-snippet';
      el.textContent = snippets[Math.floor(Math.random() * snippets.length)];
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.animationDuration = `${20 + Math.random() * 40}s`;
      el.style.animationDelay = `${Math.random() * 20}s`;
      el.style.opacity = `${0.05 + Math.random() * 0.1}`;
      
      containerRef.current.appendChild(el);
      elements.push(el);
    }

    return () => {
      elements.forEach(el => el.remove());
    };
  }, []);

  return <div ref={containerRef} className="code-snippets-background" />;
};

export default CodeSnippets;
