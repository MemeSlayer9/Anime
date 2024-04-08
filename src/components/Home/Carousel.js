 import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { BsFillPlayFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Carousel({ images, props }) {
  const { height, width } = useWindowDimensions();
const handleWatchNowClick = (itemId) => {
  // Your custom logic for handling the navigation
  console.log(`Navigating to /xd/${itemId}`);
};

  return (
    <Kill>
      <Swiper
         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}

         spaceBetween={50}
        slidesPerView={1}
        navigation={width <= 600 ? false : true}
        pagination={{ dynamicBullets: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
{images.results && images.results.length > 0 && images.results.map((item) => (

            item.bannerImage !== null && (
              <SwiperSlide key={item.id}>
                <Container>
                  {width <= 600 && (
                    <img
                      src={item.cover}
                      alt=""
                      style={bannerImageStyleMobile}
                      
                    />
                  )}
                  {width > 600 && (
                    <img src={item.cover} alt="" style={bannerImgStyle} />
                  )}
                  <Wrapper>
                  <Hello> 
                            <Shit>{item.title.english}</Shit>
                                                                     <Status>
  <p style={{ marginRight: '10px' }}>{item.type}</p>
  <p style={{ marginRight: '10px' }}>{item.releaseDate}</p>
    <p style={{ marginRight: '10px' }}>{item.status}</p>
 
  <p>{item.totalEpisodes}Episodes</p>
 
</Status>

                                            <Yawa>{item.description}</Yawa>
                                           <Button to={`/xd/${item.id}`}>
                           
                            Watch Now
                          </Button>
                    </Hello>
                    <Content>
                       
  
                
                      
                    </Content>
                  </Wrapper>
                </Container>
              </SwiperSlide>
            )
))}


      </Swiper>
    </Kill>
  );
}
 
const Kill = styled.div`
 `;

const Hello = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 72px;
  padding-top: 170px;
  background: linear-gradient(to left, rgba(22, 22, 22, -0.7) 0%, rgba(22, 22, 22, 1.3) 100%, #161616 100%);
  height: 105%;
  margin-left: -20px;
  margin-right: 602px;
  margin-top: -20px;
  @media screen and (max-width: 600px) {
  padding-top: 126px;

  }
  
`;
const Shit = styled.p`
  font-size: 3rem;
  line-height: 1.3em;
   font-weight: 700;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  WebkitLineClamp: 2;
  WebkitBoxOrient: vertical;
  overflow: hidden;
  @media screen and (max-width: 600px) {
       font-size: 1.2rem;

  }
`;

 const Yawa = styled.p`
  font-size: 0.96em;
  line-height: 1.6;
  font-weight: 300;
  margin-bottom: 2rem;
  margin-top: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const bannerImgStyle = {
  width: "100%",
  height: "600px",
  objectFit: "cover",
   
   
  
};
const Status = styled.div`{
  display: flex;
 font-size: .8em;
 font-weight: 900;
    @media screen and (max-width: 600px) {
   margin-bottom: 20px;
  }
}`

const bannerImageStyleMobile = {
  width: "100%",
  height: "300px",
  objectFit: "cover",
 };

const Container = styled.div`
  position: relative;
  
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  top: 0;
  margin-bottom: -0.2rem;
  background: linear-gradient(to top, rgba(22, 22, 22, -0.7) 80%, rgba(22, 22, 22, 1.3) 100%, #161616 100%);  
  background-blend-mode: multiply;
 
  @media screen and (max-width: 600px) {
     background: linear-gradient(to bottom, rgba(22, 22, 22, -0.7) 80%, rgba(22, 22, 22, 1.3) 100%, #161616 100%);  
     
  }

  /* Additional background to top gradient */
   &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(22, 22, 22, -0.7) 88%, rgba(22, 22, 22, 1.3) 100%, #161616 100%);
   }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin: 6rem 2.3rem 0 2.3rem;

  p {
    font-weight: 600;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 600px) {
    align-items: flex-start;
    margin: 3rem 1.3rem 0 1.3rem;
    p {
      margin-top: 0.5rem;
      font-size: 1.4rem;
    }
  }
`;

const Button = styled(Link)`
  color: white;
  font-weight: 500;
  text-decoration: none;
  background-color: #DB202C;
  outline: none;
  border: none;
  padding: 0.75rem 1.3rem 0.75rem 1.3rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.9rem;

  @media screen and (max-width: 600px) {
     margin-top: 2.8rem;
  }
`;

export default Carousel;
