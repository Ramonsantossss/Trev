// Pesquisa.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Pesquisa() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const apiUrl = 'https://appp--trevodev.repl.co/search?q=';

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    fetch(apiUrl + searchTerm)
      .then((response) => response.json())
      .then((data) => setSearchResults(data.mangas))
      .catch((error) => console.error(error));
  }, [searchTerm]);

  return (
    <div className="container">
      <input
        className="input"
        type="text"
        placeholder="Pesquisar manga..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="uil">
        {searchResults.map((item, index) => (
          <li className="conteuudo" key={index}>
            <Link to={`/manga/${item.name}/${item.id_serie}?foto=${item.image}`}>
              <div className="li">
                <div className="footo">
                  <img className="img" src={item.image} alt={item.name} />
    <div className="texxto">
      <div className="name">
        <spam className="nota">{item.score}</spam>
      </div>
    </div>
                  <div className="texto">
                    <div className="name">
                      <span>{item.name}</span>
                    </div>
                    <div className="ultimo-lido">{/* Aqui você pode adicionar informações se necessário */}</div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pesquisa;
