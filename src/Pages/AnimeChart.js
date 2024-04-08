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
const [format, setFormat] = useState('TV');
const [year, setYear] = useState('2024');
const [season, setSeason] = useState('WINTER')
const [anime, setAnime] = useState([]);
const [anime2, setAnime2] = useState({});
  const perPage = 100; // You can set the number of results per page here
const startYear = 1999;
const currentYear = new Date().getFullYear(); // Get the current year
    const Format  = ["TV", "TV_SHORT", "OVA", "ONA", "MOVIE", "SPECIAL", ];
const Years = [];
for (let year = startYear; year <= currentYear; year++) {
  Years.push(year.toString());
}
    const Seasons =['WINTER', 'SPRING',  'SUMMER', 'FALL' ];
  
  
 
   const getAnime = async (id = 1) => {
  try {
    setLoading(true);
    
    const { data } = await axios.get(
      `https://24anime.vercel.app/meta/anilist/advanced-search?season=${season}&year=${year}&page=${page}&perPage=100&format=${format}`
    );
    setAnime(data);
    
    setLoading(false);
  } catch (err) {
    console.error(err);
    setLoading(false);
 
   }
};


 

            console.log(`https://api.consumet.org/meta/anilist/advanced-search?season=FALL&year=${year}&page=${page}&perPage=100&format=${format}`
);
 const fetchTBAData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://24anime.vercel.app/meta/anilist/advanced-search?status=NOT_YET_RELEASED&page=${page}&format=${format}`);
      setAnime(data);
      setLoading(false);
      
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
                console.log(`https://api.consumet.org/meta/anilist/advanced-search?status=NOT_YET_RELEASED`);
 
  };
  
 
const handlePrevPage = () => {
  if (page > 1) {
    setPage(page - 1);
    getAnime(page - 1);
   }
};

const handleNextPage = () => {
  setPage(page + 1);
  
};

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };
  
    const handleYearChange = (e) => {
    setYear(e.target.value);
  };
  
   const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };
  
  
   const handleTBAButtonClick = () => {
    fetchTBAData();
  };
  
  

  
    useEffect(() => {
 
     getAnime(page);
       }, [page, format, year, season]);

  return (
    <div>
      
      {loading && <SearchResultsSkeleton name="Trending Anime" />}
      {!loading && (
        <Parent>
          <Heading>
               <span>Anime Chart</span> Results
          <div>
 
                  <TBA onClick={handleTBAButtonClick}> TBA Data</TBA>

      <Dropdown
        id="format-select"
        value={season}
        onChange={handleSeasonChange}
      >
      {Seasons.map((season) => (
          <option key={season} value={season}>
            {season}
          </option>
        ))}
       
      </Dropdown>
      <Dropdown
        id="format-select"
        value={format}
        onChange={handleFormatChange}
      >
      {Format.map((format) => (
          <option key={format} value={format}>
            {format}
          </option>
        ))}
       
      </Dropdown>
       <Dropdown
        id="format-select"
        value={year}
        onChange={handleYearChange}
      >
      {Years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
       
      </Dropdown>
     </div>
        
          </Heading>
          <CardWrapper>
            {anime.results && anime.results.map(item => (
  <Wrapper key={item.id}>
         <Links to={`/xd/${item.id}`}>
     <h4>{item.title.userPreferred}</h4>
  <h5>Genres: {item.genres.join(", ")}</h5>
      {item.currentEpisode && <Current>Current Episode: {item.currentEpisode}</Current>}

    <img className="card-img"  src={item.image} alt={item.title.romaji}/>
     <div> 
    
           <p>Status: {item.status}</p>
           <p>Ratings: {item.rating}%</p>
              <p>Type: {item.type}</p>
     <p>Total Episodes:{item.totalEpisodes}</p>
     <Description>{item.description}</Description>
    </div>
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
   margin: 5px;
   
`;
const TBA = styled.button`
outline: none;
    background: #404040;
    border: none;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    color: #ffffff;
    background-color: #242235;
    padding: 0.8rem;
    font-family: 'Gilroy-Medium',sans-serif;
    font-size: 0.9rem;
    border-radius: 0.4rem;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    -webkit-align-items: center;
    -webkit-box-align: center
`;
const Current = styled.p`
margin: 0;
    position: absolute;
     background: rgb(0, 0, 0);
    background: rgba(0, 0, 0, .8);
    color: #fff;
    width: 14.5%;
    transition: .5s ease;
    opacity: 1;
    color: #fff;
    font-size: 14px;
    padding: 20px;
    text-align: center;
    height: 10px;
    border-radius: 0.5rem;
 @media screen and (max-width: 800px) {
     width: 47%;
    }
`;
const Wrapper = styled.div`
width: 32.5%;
   border-radius: 0.5rem;
  border: 1px solid #393653;
  transition: 0.2s;
  
  div {
    float: right; /* Float the text content to the right */
    
     
    
  }
   @media screen and (max-width: 1500px) {
     width: 50%;
 
    }
      @media screen and (max-width: 800px) {
     width: 100%;
    }
  img {
    float: left;
    width: 50% !important;
    height: 300px !important;
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
  h4, h5{
    text-align: center;
     color: white;
     border-top: 1px solid rgba(118,118,118,.1);
 
  }
  h4{
    font-size: 15px;
  }
  p {
    color: white;
    font-size: 1rem;
    font-weight: 400;
            text-align: center;
          border-top: 1px solid rgba(118,118,118,.1);
  

   }
`;
const Description = styled.p`

color: white;
font-size: 1rem;
font-weight: 400;
max-width: 195px;
text-align: left !important;
height: 200px;
overflow-y: auto;
border-top: 1px solid rgba(118,118,118,.1);
 
  &::-webkit-scrollbar {
  width: 5px;
  }

  &::-webkit-scrollbar-track {
     box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
     background: red; 
  border-radius: 10px;
  }
  
@media screen and (max-width: 1000px) {
max-width: 160px;
 
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
  display: flex; /* Use flexbox to arrange the image and text side by side */
  clear: both; /* Clear the floats to avoid overlapping issues */
  margin-bottom: 1.5rem; /* Add margin to separate the cards */
  flex-wrap: wrap;

  

 

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
