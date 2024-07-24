import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectPage.css';
import ProjectCard from './ProjectCard'; // Adjust path as necessary

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [selectedTag, setSelectedTag] = useState('all');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('http://localhost:3000/api/files/files');
        if (response.ok) {
          const fileList = await response.json();
          const projectList = fileList.map(file => ({
            id: file._id,
            title: file.metadata.title,
            description: file.metadata.description,
            imageUrl: null, // Adjust if you have image URLs
            author: file.metadata.name,
            type: file.metadata.type,
            difficulty: file.metadata.difficulty // Adjust if you have difficulty information
          }));
          setProjects(projectList);
        } else {
          console.error('Failed to fetch projects. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
  }, []);

  // Log projects and selectedTag for debugging
  console.log('Projects:', projects);
  console.log('Selected Tag:', selectedTag);

  const handleTagClick = (type) => {
    setSelectedTag(type);
  };

  // Fix filtering logic for single value type
  const filteredProjects = projects.filter((project) =>
    selectedTag === 'all' || project.type === selectedTag
  );

  return (
    <div className="projects-page">
      <h2>Proiectele mele</h2>
      <div className="tag-buttons">
        <button onClick={() => handleTagClick('programare')}>Programare</button>
        <button onClick={() => handleTagClick('retelistica')}>Retelistica</button>
        <button onClick={() => handleTagClick('all')}>Toate</button>
      </div>
      <div className="project-list">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id} // Pass the project ID
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              author={project.author}
              difficulty={project.difficulty}
              type={project.type}
            />
          ))
        ) : (
          <p>No projects found for this type.</p>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;
