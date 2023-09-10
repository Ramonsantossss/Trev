import React, { useState, useEffect } from "react";
import "./Centrohome.scss";
import { Link } from "react-router-dom";


function Centrohome() {
  const [mangasPopular, setMangasPopular] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch('https://appp--trevodev.repl.co/recents/1');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }
      const resultado = await response.json();
      setMangasPopular(resultado.mangas);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <br/>
      <h2>Novos Capítulos</h2>
      <ul className="ul">
      {mangasPopular.map((item, index) => (
        <div className="conteudo" key={item}>
       <Link to={`${item.link}?foto=${item.image}`}>
         <li className="li">
       <div className="foto">
         <img className="img" src={item.image} alt={item.name} />
    <div className="texto">
      <div className="name">
        <span>{item.name}</span>
      </div><br/>
    </div>
          </div><br/>
        </li>
        <br/>
       </Link>
      
      </div>
      
      ))}
      
      <br/><br/><br/>
      </ul>
    </div>
  );
}

export default Centrohome;
