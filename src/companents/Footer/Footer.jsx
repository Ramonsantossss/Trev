import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="final">
        
      </div>
      <div className="Foer">
        <footer>
          <div class="footer-buttons">
            <button class="round-button"><i class="fas fa-star"></i></button>
            <Link to="/fav" class="home-button round-button"><i class="fas fa-heart"></i></Link>
            <Link to="/" class="home-button round-button"><i class="fas fa-home"></i></Link>
            <button class="round-button"><i class="fas fa-envelope"></i></button>
            <button class="round-button"><i class="fas fa-cog"></i></button>
          </div>
        </footer>

      </div>
    </>
  );
}

export default Footer;
