import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import AnimeCardsSkeleton from "../../components/skeletons/AnimeCardsSkeleton";
   
import "swiper/css";
import "swiper/css/scrollbar";

function AnimeCards() {
  const [animeList, setAnimeList] = useState([]);
    const [topAnime, setTopAnime] = useState([]);

  const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
      const [recent, setRecent] = useState([]);
  const [anime, setAnime] = useState({});

  
  



 
  
   const getAnime = async (id = 1) => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `https://24anime.vercel.app/meta/anilist/trending?pages${id}`
    );
    setAnime(data);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
  console.log(
      `https://api.consumet.org/meta/anilist/trending?pages${id}`
    );
};


  
  

  
    useEffect(() => {
         getAnime();

   }, []);

  return (
    <div>
      {loading && <AnimeCardsSkeleton />}
      {!loading && (
        <Swiper
          slidesPerView={7}
          spaceBetween={35}
          scrollbar={{
            hide: false,
          }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            "@0.75": {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 4,
              spaceBetween: 35,
            },
            "@1.30": {
              slidesPerView: 5,
              spaceBetween: 35,
            },
            "@1.50": {
              slidesPerView: 7,
              spaceBetween: 35,
            },
          }}
          modules={[Scrollbar]}
          className="mySwiper"
        >
        
{anime.results && anime.results.map(item => (
  <SwiperSlide key={item.id}>
    <Wrapper>
      <Links to={`/xd/${item.id}`}>
           <img className="card-img" src={item.image} alt={item.title.romaji}/>
         <p>{item.title.english}</p>
      </Links>
    </Wrapper>
  </SwiperSlide>
))}
        
        </Swiper>
      )}
      
        
    </div>
  );
}

const Wrapper = styled.div`
  img {
    width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    margin-bottom: 0.3rem;
    object-fit: cover;
    @media screen and (max-width: 600px) {
      width: 120px;
      height: 180px;
    }
    @media screen and (max-width: 400px) {
      width: 100px;
      height: 160px;
    }
  }

  p {
    color: white;
    font-size: 1rem;
    font-weight: 400;
  }
`;
const Links = styled(Link)`
  text-decoration: none;
  img {
    width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    object-fit: cover;
    @media screen and (max-width: 600px) {
      width: 120px;
      height: 180px;
      border-radius: 0.3rem;
    }
    @media screen and (max-width: 400px) {
      width: 110px;
      height: 170px;
    }
    @media screen and (max-width: 380px) {
      width: 100px;
      height: 160px;
    }
  }

  p {
    color: white;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
    max-width: 160px;
    @media screen and (max-width: 380px) {
      width: 100px;
      font-size: 0.9rem;
    }
  }
`;

export default AnimeCards;