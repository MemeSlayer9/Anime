import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate  } from "react-router-dom";
import styled from "styled-components";
import SearchResultsSkeleton from "../components/skeletons/SearchResultsSkeleton";
 
function TrendingAnime() {
   const navigate = useNavigate();  
let { genre } = useParams();

const [animeList, setAnimeList] = useState([]);
const [topAnime, setTopAnime] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(true);
const [images, setImages] = useState([]);
const [recent, setRecent] = useState([]);
const [anime, setAnime] = useState({});
const [anime2, setAnime2] = useState({});
  const genres = ["Action", "Adventure", "Drama", "Fantasy", "Supernatural", "Sports", "Romance", "Shoujo"]; // Define your list of genres
  const [selectedGenre, setSelectedGenre] = useState(genre);
  const [animeResults, setAnimeResults] = useState([]);
  const perPage = 100; // You can set the number of results per page here


  
   const fetchAnime = async () => {
      try {
        let apiUrl;

        if (selectedGenre === "All Genres") {
          apiUrl = `https://24anime.vercel.app/meta/anilist/advanced-search?page=${page}&perPage=${perPage}`;
        } else {
          apiUrl = `https://24anime.vercel.app/meta/anilist/advanced-search?genres=["${genre}"]&page=${page}&perPage=${perPage}`;
        }

        const response = await axios.get(apiUrl);
        setAnimeResults(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
 
   const getAnime = async (id = 1) => {
  try {
    setLoading(true);
    const { data } = await axios.get(
      `https://24anime.vercel.app/meta/anilist/advanced-search?genres=["${genre}"]&page=${page}&perPage=${perPage}`
    );
    setAnime(data);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setLoading(false);
 
   }
};

            console.log(`https://api.consumet.org/meta/anilist/advanced-search?genres=[%22Horror%22]&page=${page}&perPage=100`
            
);
 console.log(`https://api.consumet.org/meta/anilist/advanced-search?genres=["${genre}"]&page=${page}&perPage=${perPage}`);
 

 
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
    setSelectedGenre(genre);
  }, [genre]);
  
    useEffect(() => {
       if (selectedGenre !== "") {
              navigate(`/advanced/${selectedGenre}`);

      fetchAnime();
    }
     getAnime(page);
     
    
   }, [selectedGenre, page, perPage]);;

  return (
      <div>
      
 

      {loading && <SearchResultsSkeleton name="Trending Anime" />}
      {!loading && (
        <Parent>
          <Heading>
            <span>Popular Anime</span> Results
          </Heading>
<CardWrapper>
  {anime.results && anime.results
    .filter(item => !selectedGenre || item.genres.includes(selectedGenre))
    .map(item => (
      <Wrapper key={item.id}>
        <Links to={`/xd/${item.id}`}>
          <img className="card-img" src={item.image} alt={item.title.romaji} />
 <p>
          {item.title.english ? item.title.english : item.title.romaji}
        </p>        
         </Links>
      </Wrapper>
    ))}
</CardWrapper>

          
           <NavButtons>
        <NavButton onClick={handlePrevPage}>Previous</NavButton>
   <span>Page 
    <Dropdown
    value={page}
    onChange={(e) => setPage(parseInt(e.target.value))}
  >
    {Array.from({ length: 100 }, (_, index) => (
      <option key={index + 1} value={index + 1}>
        {index + 1}
      </option>
    ))}
  </Dropdown></span>
  
         <NavButton onClick={handleNextPage}>Next</NavButton>
      </NavButtons>
         
 
        </Parent>
      )}
    </div>
  );
}



const Dropdown = styled.select`
   outline: none;
  background: #404040;
  border: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  color: #ffffff;
  background-color: #242235;
  padding: 0.8rem;
  font-family: 'Gilroy-Medium', sans-serif;
  font-size: 0.9rem;
  border-radius: 0.4rem;
  transition: 0.2s;
   align-items: center;
   
`;
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
