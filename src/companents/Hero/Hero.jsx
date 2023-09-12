import React, { useState } from "react";
import "./Hero.scss";
import { Link } from "react-router-dom";
import { Heroanime } from "./../../assets/Data.js";

function Hero() {
  const [visible, setVisible] = useState(8);
  const [viewButton, setViewButton]= useState(true)
  const [recentemente, setMangasPopular] = useState([])

  const ShowMore = () => {
    if(Heroanime.length != visible ){
      setVisible((prevValue) => prevValue + 4);
    }
    else{
      setViewButton(false)
    }
  };
  console.log(Heroanime.length);
  async function fetchData() {
    try {
      const response = await fetch('https://animeland.appanimeplus.tk/videoweb/api.php?action=latestvideos');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }
      const resultado = await response.json();
      setMangasPopular(resultado);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="Hero">
      <div className="hero_wrapper">
        {recentemente.map((item, index) => {
        <div key={index}>
          
        </div>
        })}
      </div>
      <button onClick={ShowMore} className={Heroanime.length != visible?"Viewmore":"displaynonebutton"}>
        View more
      </button>
    </div>
  );
}

export default Hero;
