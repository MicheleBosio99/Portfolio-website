import React, { useState, useRef, useEffect } from 'react';
import './ProjectCard.css';

/** How long the "private repository" notice stays up after a click. */
const NOTICE_DURATION_MS = 4000;

interface ProjectCardProps {
  title: string;
  image: string;
  link: string;
  description: string;
  tech: string[];
  isPrivate?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({title, image, link, description, tech, isPrivate}) => {
  const [showPrivateNotice, setShowPrivateNotice] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  // Don't leave a timer running if the card unmounts (e.g. category filter change).
  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const revealPrivateNotice = () => {
    /*
      Fixed duration, independent of hover: the notice stays put even if the
      pointer leaves the card, so the message is readable on the way out.
      Clicking again restarts the 4 seconds rather than stacking timers.
    */
    window.clearTimeout(timeoutRef.current);
    setShowPrivateNotice(true);
    timeoutRef.current = window.setTimeout(
      () => setShowPrivateNotice(false),
      NOTICE_DURATION_MS
    );
  };

  const content = (
    <div className="project-card">
      <div className="card-image-wrapper">
        <img src={image} alt={title} />

        {/* Overlay */}
        <div className="card-overlay">
          <p className="overlay-description">{description}</p>
          <div className="overlay-divider"></div>
          <ul className="overlay-tech">
            {tech.map(t => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        {isPrivate && (
          <>
            <span className="private-badge" aria-hidden="true">Private</span>
            <div
              className={`private-notice${showPrivateNotice ? ' is-visible' : ''}`}
              role="status"
              aria-live="polite"
            >
              {showPrivateNotice && (
                <span>
                  This repository is private,
                  <br />
                  so it can&apos;t be opened.
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <h3 className="card-title">{title}</h3>
    </div>
  );

  /*
    Private projects must never navigate, so they are a <button> rather than an
    <a> — there is no href to leak or middle-click open, and it stays keyboard
    operable. Public projects with a link stay a normal anchor.
  */
  if (isPrivate) {
    return (
      <button
        type="button"
        className="project-card-link project-card-private"
        onClick={revealPrivateNotice}
        aria-label={`${title} — private repository, source not publicly available`}
      >
        {content}
      </button>
    );
  }

  return link ? (
  <a href={link} target="_blank" rel="noopener noreferrer" className="project-card-link">{content}</a>) :
  (content);
};

export default ProjectCard;
