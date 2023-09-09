import React, { useState, useEffect } from "react";
import "./Centrohome.scss";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    // Carregar favoritos do localStorage quando o componente é montado
    const favoritosFromLocalStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosFromLocalStorage.reverse()); // Reverta a ordem dos favoritos aqui
  }, []);

  return (
    <div className="container">
      <br/><br/><br/>
      <h2>Favoritos</h2>
      <ul className="ul">
        {favoritos.map((item, index) => (
          <div className="conteudo" key={item.id}>
            <a href={`/manga/${item.nick}/${item.id}?foto=${item.foto}`}>
              <li className="li">
                <div className="foto">
                  <img className="img" src={item.foto} alt={item.nome} />
                  <div className="texto">
                    <div className="name">
                      <span>{item.nome}</span>
                    </div>
                    <div className="ultimo-lido">
                      <span>Último Capítulo Lido: {item.ultimoCapituloLido}</span>
                    </div><br/>
                  </div>
                </div><br/>
              </li>
            </a>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Favoritos;
