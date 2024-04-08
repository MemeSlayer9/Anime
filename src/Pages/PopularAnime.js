import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import SearchResultsSkeleton from "../components/skeletons/SearchResultsSkeleton";
 
function TrendingAnime() {
 
const [animeList, setAnimeList] = useState([]);
const [topAnime, setTopAnime] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(true);
const [images, setImages] = useState([]);
const [recent, setRecent] = useState([]);
const [anime, setAnime] = useState({});
const [anime2, setAnime2] = useState({});

  
  
  
 
   const getAnime = async (id = 1) => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `https://24anime.vercel.app/meta/anilist/popular?page=${page}&perPage=100`
    );
    setAnime(data);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setLoading(false);
 
   }
};


 

            console.log(`https://api.consumet.org/meta/anilist/popular?page=${page}&perPage=100`);

 
const handlePrevPage = () => {
  if (page > 1) {
    setPage(page - 1);
    getAnime(page - 1);
  }
};

const handleNextPage = () => {
  setPage(page + 1);
};

  
  
  
  

  
    useEffect(() => {
     getAnime(page);
 
   }, [page]);

  return (
    <div>
    
      {loading && <SearchResultsSkeleton name="Trending Anime" />}
      {!loading && (
        <Parent>
          <Heading>
            <span>Popular Anime</span> Results
          </Heading>
          <CardWrapper>
            {anime.results && anime.results.map(item => (
  <Wrapper key={item.id}>
         <Links to={`/xd/${item.id}`}>

    <img className="card-img"  src={item.image} alt={item.title.romaji}/>
     <p>{item.title.english}</p>
                         </Links>

                       

  </Wrapper>
))}
     
        
        
          </CardWrapper>
          
           <NavButtons>
        <NavButton onClick={handlePrevPage}>Previous</NavButton>
        <NavButton onClick={handleNextPage}>Next</NavButton>
      </NavButtons>
         
 
        </Parent>
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



const NavButtons = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const NavButton = styled(Link)`
  padding: 0.8rem 2rem;
  text-decoration: none;
  color: white;
  background-color: none;
  border: 2px solid #53507a;
  border-radius: 0.5rem;
`;

const Parent = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 1rem;
  grid-row-gap: 1.5rem;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, 120px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, 110px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 380px) {
    grid-template-columns: repeat(auto-fill, 100px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
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

const Heading = styled.p`
  font-size: 1.8rem;
  color: white;
  font-weight: 200;
  margin-bottom: 2rem;
  span {
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

export default TrendingAnime;
