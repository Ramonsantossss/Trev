import React, { useState, useEffect } from 'react';
import './ler.scss';
import DisqusEmbed from './DisqusEmbed.jsx'; // Importe o componente DisqusEmbed
import { useHistory } from 'react-router-dom'; // Importe useHistory

function Ler(props) {
  const { location } = props;
  const idRelease = new URLSearchParams(location.search).get("idRelease");
  const idSerie = new URLSearchParams(location.search).get("idSerie");

  const [favoritos, setFavoritos] = useState([]);
  const [mangaData, setMangaData] = useState(null);
  const [chapterList, setChapterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0); // Adicione um estado para o índice do capítulo atual

  useEffect(() => {
    // Carregar favoritos do localStorage quando o componente é montado
    const favoritosFromLocalStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosFromLocalStorage);
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(`https://appp--trevodev.repl.co/pages/${idRelease}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }
      const data = await response.json();
      const bora = data.next_chapter.release_id
      setMangaData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  async function listaCap() {
    try {
      const response = await fetch(`https://appp--trevodev.repl.co/chapters/${idSerie}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }
      const data = await response.json();
      setChapterList(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  const history = useHistory(); // Inicialize useHistory

  const lerProximoCapitulo = () => {
    if (currentChapterIndex < chapterList.chapters.length - 1) {
      const nextChapterIndex = currentChapterIndex + 1;
      const nextChapter = mangaData.next_chapter.release_id;
      setCurrentChapterIndex(nextChapterIndex);
      const nextChapterURL = `/ler?idRelease=${nextChapter}&idSerie=${idSerie}`;
      history.push(nextChapterURL); // Atualize a URL usando useHistory
      window.scrollTo({ top: 0, behavior: 'smooth' });

    }
  };

  function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <p>Carregando...</p>
    </div>
  );
  }

  useEffect(() => {
    fetchData();
    listaCap();

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Limpar o timeout ao desmontar o componente
    return () => {
      clearTimeout(loadingTimeout);
    };
    
  }, [idRelease, idSerie]);

  
  
  return (
    <div className="manga">
      
      {isLoading && <LoadingScreen />}
      {error && <p>Ocorreu um erro: {error.message}</p>}
      {mangaData && (
        <div className="geral">
          <div className="tita">
            <div className="bloo">
              <h2>• Capítulo Número {mangaData.chapter_number}</h2>
              <button className="bot" onClick={lerProximoCapitulo}>
        Próximo Capítulo
             </button>
            </div>
          </div>
          <br />
          <ul className="caps">
            {mangaData.images.map((chapter, index) => (
              <div key={index}>
                <img className="pagina" src={chapter.legacy || chapter.avif} alt={`Página ${index}`} />
              </div>
            ))}
          </ul>
        </div>
      )}

      <button className="bot" onClick={lerProximoCapitulo}>
        Próximo Capítulo
      </button>
      <hr />
      <br />
      <br />
      <div className="comentar">
        <DisqusEmbed />
      </div>
    </div>
  );
}

export default Ler;
