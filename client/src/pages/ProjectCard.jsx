import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectCard.css'; // Ensure you have styles for your cards

function ProjectCard({ id, title, description, imageUrl, author }) {
  return (
    <Link to={`/project/${id}`} className="project-card-link">
      <div className="project-card">
        <div className="card-image">
          {imageUrl && <img src={imageUrl} alt={title} />}
        </div>
        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="card-author">
          <p>by {author}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
