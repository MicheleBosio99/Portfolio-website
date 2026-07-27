import './CurriculumVitae.css';
import { education, workExperience } from '../data/resume';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import cvPdf from '../assets/pdf/Michele_Bosio_CV_Slim.pdf';

const CurriculumVitae: React.FC = () => {
  return (
    <div className="cv-page">
      <h1>Resume</h1>

      {/* EDUCATION SECTION */}
      <section className="cv-section">
        <div className="cv-left">
          <div className="cv-icon-wrapper">
            <FaGraduationCap className="cv-icon" />
            <div className="cv-line"></div>
          </div>
        </div>

        <div className="cv-right">
          <h2 className="cv-section-title">Education</h2>

          {education.map((edu) => (
            <div key={edu.id} className="cv-entry">
              <div className="cv-entry-marker"></div>

              <div className="cv-entry-content">
                <h3 className="cv-entry-title">{edu.degree}</h3>
                <p className="cv-entry-subtitle">
                  {edu.school} — {edu.location}
                </p>
                <p className="cv-entry-dates">
                  {edu.start} → {edu.end}
                </p>

                {edu.accomplishments && (
                  <ul className="cv-entry-list">
                    {edu.accomplishments.map((acc, i) => (
                      <li key={i}>{acc}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORK EXPERIENCE SECTION */}
      <section className="cv-section">
        <div className="cv-left">
          <div className="cv-icon-wrapper">
            <FaBriefcase className="cv-icon" />
            <div className="cv-line"></div>
          </div>
        </div>

        <div className="cv-right">
          <h2 className="cv-section-title">Work Experience</h2>

          {workExperience.map((job) => (
            <div key={job.id} className="cv-entry">
              <div className="cv-entry-marker"></div>

              <div className="cv-entry-content">
                <h3 className="cv-entry-title">{job.role}</h3>
                <p className="cv-entry-subtitle">
                  {job.company} — {job.location}
                </p>
                <p className="cv-entry-dates">
                  {job.start} → {job.end}
                </p>

                {job.accomplishments && (
                  <ul className="cv-entry-list">
                    {job.accomplishments.map((acc, i) => (
                      <li key={i}>{acc}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DOWNLOAD BUTTON */}
      <div className="cv-download-container">
        <a href={cvPdf} download="Michele_Bosio_CV.pdf" className="cv-download-btn">
          Download Resume
        </a>
      </div>

    </div>
  );
};

export default CurriculumVitae;
