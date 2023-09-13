import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import { Link, useHistory, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showVideo, setShowVideo] = useState(false); // Inicialmente, o vídeo não está visível

  // Obtém o histórico de navegação
  const history = useHistory();
  // Obtém a localização atual
  const location = useLocation();

  // Função para pesquisar mangás na API
  const pesquisarManga = async () => {
    try {
      // Atualize o URL com o termo de pesquisa
      history.push(`/pesquisa?search=${searchTerm}`);

      const response = await fetch(`https://appp--trevodev.repl.co/search?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }
      const data = await response.json();
      setSearchResults(data.mangas);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Verifique se há um termo de pesquisa no URL ao carregar a página
    const searchParam = new URLSearchParams(location.search).get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
      pesquisarManga();
    } else {
      setSearchResults([]);
    }
  }, [location.search]);

  return (
    <div className="navbar">
      {/* Botão para exibir o vídeo */}
      <div className="barra">
      <Link onClick={() => setShowVideo(!showVideo)}>
        <i className="fas fa-bars"></i>
      </Link>
      </div>
      <span>Anikit - Animes</span>
      <Link to={`/procurar`}>
        <i className="fa fa-search"></i>
      </Link>
      

      {showVideo && (
        <div>
        <br/>
        <hr/>
        <br/>
        </div>
      )}
    </div>
  );
}

export default Navbar;
