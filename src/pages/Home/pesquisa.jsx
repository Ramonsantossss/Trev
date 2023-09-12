// Pesquisa.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Pesquisa() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const apiUrl = 'https://appp--trevodev.repl.co/pesquisar/';

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    fetch(apiUrl + searchTerm)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
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
            <Link to={`/manga/${item.category_id}`}>
              <div className="li">
                <div className="footo">
                  <img className="img" src={`https://cdn.appanimeplus.tk/img/${item.category_icon}`} alt={item.category_name}  />
                  <div className="texto">
                    <div className="name">
                      <span>{item.category_name}</span>
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
