import React, { useState, useEffect } from 'react';
import '../styles/Proiecte.css';

function UploadProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({ id: '', name: '' });

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetch('http://localhost:3000/api/user/me', {
          method: 'GET',
          credentials: 'include', // Ensure cookies are included
        });

        if (response.ok) {
          const userDetails = await response.json();
          setUser(userDetails);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    fetchUserDetails();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('userId', user.id); // Include userId
    formData.append('userName', user.name); // Include userName

    try {
      const response = await fetch('http://localhost:3000/api/files/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Ensure cookies are included
      });

      if (response.ok) {
        alert('Proiectul a fost încărcat cu succes!');
        setTitle('');
        setDescription('');
        setFile(null);
      } else {
        const errorData = await response.json();
        console.error('Upload error:', errorData);
        alert(`Eroare la încărcarea proiectului: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Eroare la încărcarea proiectului:', error);
    }
  };

  return (
    <div className="upload-project-container">
      <h2>Încărcați un proiect</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="title">Titlu:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descriere:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="file">Fișier:</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="submit-button">Încărcați</button>
      </form>
    </div>
  );
}

export default UploadProject;
