import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Bine ati venit pe CodeNetHub</h1>
        <p>Explorati o multime de cursuri pentru a va imbunatati cunostintele</p>
        <input
          type="text"
          placeholder="Cauta cursuri..."
          className="search-bar"
        />
      </section>
      
      {/* Courses Section */}
      <section className="courses-section">
        <h2>Cursurile noastre</h2>
        <div className="courses-container">
          <div className="course-card">
            <h3>Cursul 1</h3>
            <p>Invata-ti bazele programarii cu acest curs introductiv.</p>
          </div>
          <div className="course-card">
            <h3>Cursul 2</h3>
            <p>Tehnici avansate de dezvoltare web.</p>
          </div>
          <div className="course-card">
            <h3>Cursul 3</h3>
            <p>Introducere si perfectionare in retelistica.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}

export default Home;
