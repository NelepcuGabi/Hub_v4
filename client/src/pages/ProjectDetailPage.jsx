import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProjectDetailPage.css'; // Ensure you have styles for the detail page

function ProjectDetailPage() {
  const { id } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`http://localhost:3000/api/files/files${title}`); // Adjust API route as needed
        if (response.ok) {
          const projectData = await response.json();
          setProject(projectData);
        } else {
          console.error('Failed to fetch project. Status:', response.status);
          setProject(null); // Handle error by setting project to null
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setProject(null); // Handle error by setting project to null
      }
    }

    fetchProject();
  }, [id]);

  if (project === null) {
    return <div>Loading...</div>; // Show a loading message or component while fetching
  }

  // Check if project.metadata is available
  const { metadata } = project;
  if (!metadata) {
    return <div>No project details available.</div>; // Handle the case where metadata is not present
  }

  return (
    <div className="project-detail-page">
      <h2>{metadata.title || 'No title available'}</h2>
      <p>{metadata.description || 'No description available'}</p>
      {metadata.imageUrl && <img src={metadata.imageUrl} alt={metadata.title || 'No title available'} />}
      <div>Author: {metadata.name || 'No author information'}</div>
      {/* Add additional project details here */}
    </div>
  );
}

export default ProjectDetailPage;
