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
  const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
      const [recent, setRecent] = useState([]);


 


  


  
  const getImages = async (id = 1) => {
    try {
      setLoading(true);
      const Data = await axios.get(
        `https://gogoanime.consumet.stream/recent-release?page=${id}`
        
      );
      setRecent((recent) => [...recent, ...Data.data]);
      setImages(Data.data);

      setLoading(false);
     } catch (err) {
      console.log("err");
      setLoading(false);
            console.log(`https://gogoanime.consumet.stream/recent-release?page=${id}`);


    }
  };

    useEffect(() => {
    getImages();
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
          {images.map(item => (
            <SwiperSlide key={item.animeId}>
              <Wrapper>
                <Links to={`/id/${item.animeId}`}>
                  <img   className="card-img" src={item.animeImg} alt="" />
                  <p className="sidebar-title">{item.animeTitle}</p>
                                    <p className="sidebar-title">Episode {item.episodeNum}</p>

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