import React, { useState } from "react";
import "./Hero.scss";
import { Link } from "react-router-dom";
import { Heroanime } from "./../../assets/Data.js";

function Hero() {
  const [visible, setVisible] = useState(8);
  const [viewButton, setViewButton]= useState(true)

  const ShowMore = () => {
    if(Heroanime.length != visible ){
      setVisible((prevValue) => prevValue + 4);
    }
    else{
      setViewButton(false)
    }
  };
  console.log(Heroanime.length);
  return (
    <div className="Hero">
      <div className="hero_wrapper">
        {Heroanime.slice(0, visible).map((item) => {
          return (
            <Link Link to={"/"} className="anime_hero">
              <img src={item.img_url} alt="" />
              <div className="heroanime_texts">
                <div className="heroanime_text">
                  <span>{item.sifati}</span>
                  <span>{item.ep}</span>
                </div>
                <div className="heroanime_name">
                  <span>{item.name}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <button onClick={ShowMore} className={Heroanime.length != visible?"Viewmore":"displaynonebutton"}>
        View more
      </button>
    </div>
  );
}

export default Hero;
