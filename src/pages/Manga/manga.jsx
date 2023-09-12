import React, { useState, useEffect } from "react";
import './manga.scss'
import DisqusEmbed from './DisqusEmbed.jsx';
import { Link } from "react-router-dom";

function Manga(props) {
  const { match, location } = props;
  const { id } = match.params;
  const [listaDeEp, setMangasPopular] = useState([]);
  const [infoAnime, setAnimeInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [showVideo, setShowVideo] = useState({ url: "" });

  useEffect(() => {
    // Carregar favoritos do localStorage quando o componente é montado
    const favoritosFromLocalStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosFromLocalStorage);
  }, []);

  const adicionarAosFavoritos = () => {
    // Verifique se o manga já está nos favoritos
    if (!favoritos.find((manga) => manga.id === id)) {
      // Se não estiver, adicione-o aos favoritos com o último capítulo lido vazio
      const novoFavorito = {
        id,
        foto: infoAnime.category_icon,
        nome: infoAnime.category_name,
        nick: infoAnime.category_name,
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
  
  async function fetchData() {
    try {
      const response = await fetch(`https://appp--trevodev.repl.co/episodios/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }
      const resultado = await response.json();
      setMangasPopular(resultado);
    } catch (error) {
      console.error(error);
      setError(error); // Defina o estado de erro aqui
      setIsLoading(false); // Defina o estado de carregamento para false em caso de erro
    }
  }

  async function AniInfo() {
    try {
      const response = await fetch(`https://appp--trevodev.repl.co/anime/${id}`);
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
    fetchData();
    AniInfo();
  }, []);

  return (
    <div className="manga">
      {/*{isLoading && <p>Carregando...</p>}*/}
      {error && <p>Ocorreu um erro: {error.message}</p>}
      
      {infoAnime.map((item, index) => (
        <div key={index} className="geral">
          <div className="titu">
            <img src={`https://cdn.appanimeplus.tk/img/${item.category_icon}`} className="capa" />
            <div className="bloco">
              <h3>{item.category_name}</h3>
              <p>• {item.category_desc}</p>
            </div>
          </div>
          <div className="tags">
            {infoAnime[0]?.genres.split(', ').map((genre, index) => (
              <h4 key={index}>{genre}</h4>
            ))}
          </div>
        </div>
      ))}
   
      <ul className="caps">
        {listaDeEp.map((item, index) => (
          <Link
            key={index}
            onClick={() => {
              setShowVideo({ url: item?.sdlocation || item?.location });
            }}
          >
            <li className="tex">{item.title}</li>
          </Link>
        ))}
      </ul>
    {showVideo?.url && (
        <section className="videoSection">
          <button
            className="closeButton"
            onClick={() => setShowVideo({ url: "" })} // Corrigido para setShowVideo({ url: "" })
          >
            Voltar
          </button>
          <video className="video" src={showVideo?.url} controls />
          
        </section>
      )}
      <br/><br/>
      <DisqusEmbed />
      <br/><br/><br/>
    </div>
  );
}

export default Manga;
