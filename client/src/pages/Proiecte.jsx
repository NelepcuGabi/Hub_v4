import React, { useState } from 'react';
import '../styles/Proiecte.css';

function UploadProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:3000/api/files/upload', { // Asigură-te că URL-ul corespunde backend-ului
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            alert('Proiectul a fost încărcat cu succes!');
            setTitle('');
            setDescription('');
            setFile(null);
        } else {
            alert('Eroare la încărcarea proiectului.');
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
