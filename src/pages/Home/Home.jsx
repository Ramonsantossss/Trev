import React from "react";
import "./Home.scss";
import Header from "../../companents/Header/Header";
import Recente from './Recents.jsx';
import Centrohome from "./Centrohome.jsx";
import Favoritos from "./favoritos.jsx"
import Hero from "../../companents/Hero/Hero"
import Pesquisa from './pesquisa.jsx';

function Home() {
  return (
    <div className="Home">
        <Header />
        <Centrohome />
        <Recente />
        <Favoritos />
        <Hero />
    </div>
  );
}

export default Home;
