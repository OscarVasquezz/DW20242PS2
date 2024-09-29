import { useState, useEffect } from 'react';
import axios from 'axios';

// Definir la interfaz para el tipo de dato del blog
interface Blog {
  id: number;
  title: string;
  author: string;
  category: string;
}

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Función para obtener los datos del API
  const fetchBlogs = async () => {
    try {
      const response = await axios.get<Blog[]>('https://api.vercel.app/blog');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error al obtener los datos', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Lista de Blogs</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table border={1} style={{ margin: '0 auto', width: '80%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>{blog.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        onClick={fetchBlogs}
      >
        Consultar
      </button>
    </div>
  );
}

export default App;
