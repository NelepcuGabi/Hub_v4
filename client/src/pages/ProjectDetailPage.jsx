import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProjectDetailPage.css'; // Ensure you have styles for the detail page

function ProjectDetailPage() {
    // Get the project ID from the URL
    const { id } = useParams();
    const [project, setProject] = useState(null); // Initialize state to null for loading state
    const [error, setError] = useState(null); // State to hold any error messages
    
    useEffect(() => {
        async function fetchProject() {
            const response = await fetch(`http://localhost:3000/api/files/${id}`);
            console.log(response)
            if (!id) {
                setError('No project ID provided');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/api/files/files/${id}`);
                if (response.ok) {
                    const file = await response.json();
                    setProject(file); // Set project data
                } else {
                    throw new Error('Failed to fetch project. Status: ' + response.status);
                }
            } catch (error) {
                setError(error.message); // Set error message to state
                console.error('Error fetching project:', error);
            }
        }

        fetchProject();
    }, [id]); // Dependency array includes id to refetch if it changes

    if (error) {
        return <div>Error: {error}</div>; // Show error message
    }

    if (!project) {
        return <div>Loading...</div>; // Show a loading message while fetching
    }

    return (
        <div className="project-detail-page">
            <h2>{project.title || 'No title available'}</h2>
            <p>{project.description || 'No description available'}</p>
            {project.imageUrl && <img src={project.imageUrl} alt={project.title || 'No title available'} />}
            <div>Author: {project.author || 'No author information'}</div>
            <div>Type: {project.type || 'No type information'}</div>
            <div>Difficulty: {project.difficulty || 'No difficulty information'}</div>
            {/* Add additional project details here */}
        </div>
    );
}

export default ProjectDetailPage;
