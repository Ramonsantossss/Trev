import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

function Pesquisa(props) {
  const { match, location } = props;
  //const { id } = match.params;
  const searchTerm = new URLSearchParams(location.search).get("search");
  
  const [searchResults, setSearchResults] = useState([]);
  
  // Função para pesquisar mangas na API
  const pesquisarManga = async () => {
    try {
      const response = await fetch(`https://appp--trevodev.repl.co/search?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }
      const data = await response.json();
      setSearchResults(data);
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
    return (
   <div className="container">
   <input
          type="text"
          placeholder="Pesquisar manga..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
   />
      <ul classname="ul">
     {searchResults.map((item, index) => (
     <div key={index}>
      <div className="conteudo" key={item}>
      <div className="titu">
       <a href={`/manga/${item.name}/${item.id_serie}?foto=${item.image}`}>
         <li className="li">
  
    <div className="foto">
      <img className="img" src={item.image} alt={item.name} />
      <div className="texto">
      <div className="name">
        <span>{item.name}</span>
      </div><br/>
    </div>
   </div>        
      
           <br/>
        </li>
        <br/>
       </a>
       </div>
      
      
        </div>
       </div>
     ))}
     </ul>
     </div> 
  )
  )
}

export default Pesquisa,