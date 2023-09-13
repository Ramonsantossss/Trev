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
        const response = await fetch('https://appp--trevodev.repl.co/tops');
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
  <>
    <img src="https://telegra.ph/file/cda35e989094309d810e0.jpg" className="foto_header" />
  </>
);


  
/*
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
        {mangasPopular.slice(0, 6).map((item) => {
          return (
            <SwiperSlide>
              <img src={`https://cdn.appanimeplus.tk/img/${item.category_icon}`} alt="foto" />
              <div className="inner__newanime">
                <div className="texts">
                  <b className="animenews__name">{item.category_name}</b>
                  <p className="animenews__about"></p>
                </div>
                <div className="link_animenews">
                
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
  */
}

export default Header;
