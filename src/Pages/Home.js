import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Carousel from "../components/Home/Carousel";
import HomeSkeleton from "../components/skeletons/CarouselSkeleton";
import WatchingEpisodes from "../components/Home/WatchingEpisodes";
import axios from "axios";
import Popular from "../components/Home/Popular";
import RecentCard from '../components/Home/RecentCard';
import Recent from "../components/Home/Recent";
import Trending from "../components/Home/Trending";
import useWindowDimensions from "../hooks/useWindowDimensions";

function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recent, setRecent] = useState([]);
  const renderAfterCalled = useRef(false);
  const { height, width } = useWindowDimensions();

   useEffect(() => {
    getImages();
  }, []);

 const getImages = async (id = 1) => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `https://24anime.vercel.app/meta/anilist/trending?pages${id}`
    );
    setImages(data);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
};
  function checkSize() {
    let lsData = localStorage.getItem("Watching");
    lsData = JSON.parse(lsData);
    if (lsData.length === 0) {
      return false;
    }
    return true;
  }
    useEffect(() => {
    if (!renderAfterCalled.current) {
      getImages();
     }
    renderAfterCalled.current = true;
  }, []);
  return (
    <div> 
   <Helmet>
        <meta
            name="description"
            content={`Best site to watch  English Sub/Dub online Free and download  English Sub/Dub anime.`}
            charSet="utf-8"
          />
          <meta
            name="keywords"
            content={`English Sub/Dub, free online, watch    online, watch   free, download   anime, download   free`}
            charSet="utf-8"
          />
                    <title>{`24anime`}</title>

          </Helmet>
               

                 {loading && <HomeSkeleton />}
                {!loading && <Carousel images={images} />}
      <HomeDiv>
         <HomeHeading>
          <span>Recommended</span> to you
        </HomeHeading>
  
        {localStorage.getItem("Watching") && checkSize() && (
          <div>
            <HeadingWrapper>
              <Heading>
                <span>Continue</span> Watching
              </Heading>
            </HeadingWrapper>
            <WatchingEpisodes />
          </div>
        )}
        <div>
          <HeadingWrapper>
            <Heading>
              <span>Recent Episode</span> Now
            </Heading>
            <Links to="/recent/1">View All</Links>
          </HeadingWrapper>
                    <Recent count={width <= 600 ? 7 : 15} criteria="airing" />

           
        </div>  
           
             <div>
          <HeadingWrapper>
            <Heading>
              <span>Popular</span> Now
            </Heading>
            <Links to="/popular/1">View All</Links>
          </HeadingWrapper>
                     <Popular count={width <= 600 ? 7 : 15} criteria="airing" />

        </div>  
                     <div>
          <HeadingWrapper>
            <Heading>
              <span>Trending</span> Now
            </Heading>
            <Links to="/trending/1">View All</Links>
          </HeadingWrapper>
                    <Trending count={width <= 600 ? 7 : 15} criteria="airing" />

           
        </div>  
        </HomeDiv>
    </div>
  )
}


const Links = styled(Link)`
  color: white;
  font-size: 1.1rem;
  font-family: "Gilroy-Medium", sans-serif;
  @media screen and (max-width: 600px) {
    color: white;
    font-size: 1rem;
    font-family: "Gilroy-Medium", sans-serif;
  }
`;

const HomeDiv = styled.div`
  margin: 1.5rem 5rem 1rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem 1rem 0rem 1rem;
  }
`;

const HomeHeading = styled.p`
  font-size: 2.3rem;
  color: white;
  font-weight: 200;

  span {
    font-weight: 600;
  }
  margin-bottom: 1rem;

  @media screen and (max-width: 600px) {
    font-size: 1.7rem;
  }
`;

const Heading = styled.p`
  font-size: 1.8rem;
  color: white;
  font-weight: 200;
  margin-top: 1rem;
  span {
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  @media screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;

export default Home;

 