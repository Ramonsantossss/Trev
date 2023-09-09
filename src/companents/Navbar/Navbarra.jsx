import React, { useState, useEffect } from 'react';
import './Navbar.scss';

function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Função para pesquisar mangas na API
  const pesquisarManga = async () => {
    try {
      const response = await fetch(`https://appp--trevodev.repl.co/search?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }
      const data = await response.json();
      setSearchResults(data.mangas);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      pesquisarManga();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="navbar">
      <span>Mangás Online</span>
      <a href="#">
      <i className="fa fa-search"></i>
      </a>
    </div>
  )
}

export default Navbar;