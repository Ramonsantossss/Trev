import React, { useState, useEffect } from "react";
import "./Centrohome.scss";
import { Link } from "react-router-dom";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [infoAnime, setAnimeInfo] = useState([]);

  async function AniInfo() {
    try {
      const response = await fetch(`https://appp--trevodev.repl.co/anime/${favoritos.id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }
      const resultado = await response.json();
      setAnimeInfo(resultado);
    } catch (error) {
      console.error(error);
      setError(error); // Defina o estado de erro aqui
      setIsLoading(false); // Defina o estado de carregamento para false em caso de erro
    }
  }

  useEffect(() => {
    // Carregar favoritos do localStorage quando o componente é montado
    const favoritosFromLocalStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosFromLocalStorage.reverse()); // Reverta a ordem dos favoritos aqui
  }, []);
/*
 return (
    <div className="container">
      <br /><br /><br />
      <h2>Favoritos</h2>
      <ul className="ul">
        {favoritos.map((item, index) => (
          <div className="conteudo" key={item.id}>
            <Link to={`/manga/${item.nick}/${item.id}`}>
              <li className="li">
                <div className="foto">
                  <img className="img" src={item.foto} alt={item.nome} />
                  <div className="texxto">
                    <div className="name">
                      <spam className="nota">
                        <i className="fa fa-heart"></i>
                      </spam>
                    </div>
                  </div>
                  <div className="texto">
                    <div className="name">
                      <span>{item.nome}</span>
                    </div>
                    <div className="ultimo-lido">
                      <span>Último Capítulo Lido: {item.ultimoCapituloLido}</span>
                    </div><br />
                  </div>
                </div><br />
              </li>
            </Link>
          </div>
        ))}
      </ul><br /><br /><br /><br />
    </div>
  );
*/
return (
  <div className="container">
    <br/>
    <div className="titulo">
    <div className="barrinha"></div>
    <h2>Favoritos</h2>
    </div>
    <ul className="ul">
    {favoritos.map((item, index) => (
      <div className="conteudo" key={item}>
     <Link to={`/manga/${item.id}`}>
       <li className="li">
     <div className="foto">
       <img className="img" src={`https://cdn.appanimeplus.tk/img/${item.category_icon}`}/>
  <div className="texto">
    <div className="name">
      <span className="span">
        {item.category_name}
      </span>
    </div><br/>
  </div>
  <div className="texxto">
    <div className="name">
      <spam className="nota">BOM</spam>
    </div>
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

export default Favoritos;
