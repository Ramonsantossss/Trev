import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.scss";
import Home from "./pages/Home/Home";
import Footer from "./companents/Footer/Footer";
import Navbar from './companents/Navbar/Navbarra'
import Loding from "./companents/Loding/Loding";
import Manga from './pages/Manga/manga.jsx';
import Ler from './pages/Ler/ler.jsx'


function App() {


  return (
    <React.Fragment>
      <div className="App">
        <Navbar />
       <BrowserRouter>
       <Switch>
       <Route exact path="/" component={Home} />
       <Route exact path="/home" component={Home} />
      <Route exact path="/manga/:nome/:id" component={Manga} />
     <Route exact path="/ler" component={Ler} />
       </Switch>
       </BrowserRouter>
        <Footer/>
      </div>
      <Loding></Loding>
    </React.Fragment>
  );
}

export default App;
