import React, { useState, useEffect } from "react";
import "./Centrohome.scss";
import { Link } from "react-router-dom";

function Moove() {
  const [mangasPopular, setMangasPopular] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch('https://appp--trevodev.repl.co/filmes');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }
      const resultado = await response.json();
      setMangasPopular(resultado);
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
      <div className="titulo">
      <div className="barrinha"></div>
      <h2>Filmes</h2>
      </div>
      <ul className="ul">
      {mangasPopular.map((item, index) => (
        <div className="conteudo" key={item}>
       <Link to={`/manga/${item.category_id}`}>
         <li className="li">
       <div className="foto">
         <img className="img" src={`https://cdn.appanimeplus.tk/img/${item.category_icon}`} alt={item.category_name} />
    <div className="texto">
      <div className="name">
        <span className="span">
          {item.category_name}
        </span>
      </div><br/>
    </div>
         {/*
    <div className="texxto">
      <div className="name">
        <spam className="nota">NEW</spam>
      </div>
    </div>
        */ }
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

export default Moove;