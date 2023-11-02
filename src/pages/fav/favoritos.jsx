import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Fav() {
    const [favoritos, setFavoritos] = useState([]);
    const [infoAnime, setAnimeInfo] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function AniInfo(id) {
        try {
            const response = await fetch(`https://appp--trevodev.repl.co/anime/${id}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados da API');
            }
            const resultado = await response.json();
            setAnimeInfo(resultado);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    useEffect(() => {
        // Carregar favoritos do localStorage quando o componente é montado
        const favoritosFromLocalStorage = JSON.parse(localStorage.getItem("favoritos")) || [];
        console.log(favoritosFromLocalStorage)
        setFavoritos(favoritosFromLocalStorage.reverse()); // Reverta a ordem dos favoritos aqui
    }, []);

    useEffect(() => {
        // Quando a lista de favoritos é carregada ou atualizada, buscar informações de anime para cada favorito
        favoritos.forEach((favorito) => {
            AniInfo(favorito.id);
        });
    }, [favoritos]);

    return (
        <div className="container">
            <ul className="uil">
                {favoritos.map((item, index) => (
                    <li className="conteuudo" key={index}>
                        <Link to={`/manga/${item.id}`}>
                            <div className="li">
                                <div className="footo">
                                    <img className="img" src={`https://cdn.appanimeplus.tk/img/${item.category_icon}`} />
                                    <div className="texto">
                                        <div className="name">
                                            <span className="span">
                                                {item.category_name}
                                            </span>
                                        </div>
                                        <div className="ultimo-lido">
                                            {/* Aqui você pode adicionar informações do anime */}
                                            {isLoading ? 'Carregando...' : (error ? 'Erro ao buscar informações' : infoAnime.category_desc)}
                                        </div>
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

export default Fav;
