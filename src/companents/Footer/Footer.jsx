import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="Foer">
        <footer>
        <div class="footer-buttons">
            <button class="round-button"><i class="fas fa-star"></i></button>
            <button class="round-button"><i class="fas fa-heart"></i></button>
            <Link to="/" class="home-button round-button"><i class="fas fa-home"></i></Link>
            <button class="round-button"><i class="fas fa-envelope"></i></button>
            <button class="round-button"><i class="fas fa-cog"></i></button>
        </div>
    </footer>
      
    </div>
  );
}

export default Footer;
