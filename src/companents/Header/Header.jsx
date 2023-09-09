import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [mangasPopular, setMangasPopular] = useState([]);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 3 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 18000)}s`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://appp--trevodev.repl.co/popular/1');
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados da API');
        }
        const resultado = await response.json();
        setMangasPopular(resultado);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData(); // Chama a função de busca assim que o componente for montado
  }, []);

  return (
    <div>
      
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,

          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {mangasPopular.slice(0, 5).map((item) => {
          return (
            <SwiperSlide>
              <img src={item.image} alt="" />
              <div className="inner__newanime">
                <div className="texts">
                  <b className="animenews__name">{item.name}</b>
                  <p className="animenews__about">{item.description}</p>
                </div>
                <div className="link_animenews">
                  <Link to={item.link}>Watch now</Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}

export default Header;
