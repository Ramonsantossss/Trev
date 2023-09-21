import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.scss";
import Home from "./pages/Home/Home";
import Pesquisa from './pages/Home/pesquisa.jsx'
import Footer from "./companents/Footer/Footer";
import Navbar from './companents/Navbar/Navbarra'
import Loding from "./companents/Loding/Loding";
import Manga from './pages/Manga/manga.jsx';
import Ler from './pages/Ler/ler.jsx'
import Episodios from './pages/Manga/listaDeEp.jsx';


function App() {


  return (
    <React.Fragment>
      <div className="App">
       <BrowserRouter>
         <Navbar />
       <Switch>
       <Route exact path="/" component={Home} />
       <Route exact path="/home" component={Home} />
      <Route exact path="/manga/:id" component={Manga} />
      <Route exact path="/ep/:id" component={Episodios} />
      <Route exact path="/ler" component={Ler} />
      <Route exact path="/procurar" component={Pesquisa} />
       </Switch>
        <Loding></Loding>
         <Footer/>
       </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;
