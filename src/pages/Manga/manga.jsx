import React, { useState, useEffect } from 'react';
import './manga.scss';
import DisqusEmbed from './DisqusEmbed';
import { Link } from "react-router-dom";

function Manga(props) {
  const { match, location } = props;
  const { id } = match.params;
  const foto = new URLSearchParams(location.search).get("foto");

  const [mangaData, setMangaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    // Carregar favoritos do localStorage quando o componente é montado
    const favoritosFromLocalStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosFromLocalStorage);
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(`https://appp--trevodev.repl.co/chapters/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }
      const data = await response.json();
      setMangaData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  const adicionarAosFavoritos = () => {
    // Verifique se o manga já está nos favoritos
    if (!favoritos.find((manga) => manga.id === id)) {
      // Se não estiver, adicione-o aos favoritos com o último capítulo lido vazio
      const novoFavorito = {
        id,
        foto,
        nome: mangaData.name,
        nick: mangaData.url_name,
        ultimoCapituloLido: "",
      };
      const novosFavoritos = [...favoritos, novoFavorito];
      setFavoritos(novosFavoritos);

      // Salve os favoritos atualizados no localStorage
      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
    }
  };

  const removerDosFavoritos = () => {
    // Remova o manga dos favoritos
    const novosFavoritos = favoritos.filter((manga) => manga.id !== id);
    setFavoritos(novosFavoritos);

    // Salve os favoritos atualizados no localStorage
    localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
  };

  const lerCapitulo = (capitulo) => {
    // Atualize o último capítulo lido do manga favorito
    const mangaIndex = favoritos.findIndex((manga) => manga.id === id);
    if (mangaIndex !== -1) {
      const novoFavorito = { ...favoritos[mangaIndex], ultimoCapituloLido: capitulo };
      const novosFavoritos = [...favoritos];
      novosFavoritos[mangaIndex] = novoFavorito;
      setFavoritos(novosFavoritos);

      // Salve os favoritos atualizados no localStorage
      localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="manga">
      {isLoading && <p>Carregando...</p>}
      {error && <p>Ocorreu um erro: {error.message}</p>}
      {mangaData && (
        <div className="geral">
          <div className="titu">
            <img src={foto} alt="Capa do manga" className="capa"/>
            <div className="bloco">
              <h3>{mangaData.name}</h3>
              <p>• {mangaData.url_name}</p>
              {/* Botão para Adicionar/Remover dos Favoritos */}
              <div className="b">
                {favoritos.find((manga) => manga.id === id) ? (
                  <button className="botao-redondo" onClick={removerDosFavoritos}>
                    <i className="fa fa-heart"></i>
                  </button>
                ) : (
                  <button className="botao-redondo" onClick={adicionarAosFavoritos}>
                    <i className="fa fa-plus"></i>
                  </button>
                )}
              </div>
              {/* Último Capítulo Lido */}
              {favoritos.find((manga) => manga.id === id) ? (
                <p>Visto Recentemente {favoritos.find((manga) => manga.id === id)?.ultimoCapituloLido}</p>
                ) : (
                <></>
                )}   
           </div>
          </div>
          <br/>
          <ul className="caps">
            {mangaData.chapters.map((chapter, index) => (
<Link to={`/ler?idRelease=${chapter.id_release}&idSerie=${id}`} key={index} onClick={() => lerCapitulo(chapter.number)}>
                <li className="tex">
                  Capítulo {chapter.number} - Data: {chapter.date}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
      <hr/><br/><br/>
      <div className="comentar">
        <DisqusEmbed />
      </div>
    </div>
  );
}

export default Manga;