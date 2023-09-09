import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="Footer">
      <div className="footer_top">
        <div className="fotter_top_blog1">
          <div className="footer_first">
            <div className="f_first_top">
              <div className="logo_f">
                <Link to={"/"}>
                  
                  <span>Mangás Online.</span>
                </Link>
                <p className="logo_bottm_text"></p>
              </div>

            </div>
            <div className="f_secend_bottom">
              <p>Mangas online todos os direitos reservados</p>
              <p>Atenção: Este site não hospeda nada em seu servidor.<br />
                Todo conteudo é provido por terceiros e não afiliados.</p>
            </div>
          </div>
          <div className="footer_secend">
            <ul className="ul_f ul_f_fist">
              <span>
              <li>
                <Link to={"/"}>Home</Link>
                <i></i>
              </li>
              <li>
                <Link to={"/"}>News</Link>
                <i></i>
              </li>
              <li>
                <Link to={"/"}>Categories</Link>
                <i></i>
              </li>
              </span>
            </ul>
            <ul className="ul_f ul_f_secend">
              <span>
                <li>
                  <Link to={"/"}>New Epsodes</Link>
                  <i></i>
                </li>
                <li>
                  <Link to={"/"}>Highlights</Link>
                  <i></i>
                </li>
              </span>

            </ul>
          </div>
        </div>
        
      </div>
      <div className="footer_bottom_f">
        <div className="fT_line"></div>
        <p>
          Copyright DMCA (English) Termos de Uso Politica de Privacidade todos os direitos reservados 2021
        </p>
      </div>
    </div>
  );
}

export default Footer;
