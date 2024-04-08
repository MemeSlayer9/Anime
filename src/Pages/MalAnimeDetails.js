  import React, { useEffect, useState } from "react";
  import { Link, useParams } from "react-router-dom";
  import { Helmet } from "react-helmet";
  import axios from "axios";
  import styled from "styled-components";
  import useWindowDimensions from "../hooks/useWindowDimensions";
import { idToData, idToImageUrl, idToImageUrl2 } from '../providers/imageMappings'; // Update the import path as needed

  export default function Details({props, provider, }) {

    
  const { id } = useParams();
  const {episodeId} = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [item, setDetail] = useState([]);
  const [detail, setDetail2] = useState([]);
  const { width } = useWindowDimensions();
 const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [animeData, setAnimeData] = useState({});

const [error, setError] = useState(null);
const [rangeIndex, setRangeIndex] = useState(0);
const rangeSize = 100;
  
  const handleRangeChange = (e) => {
    setRangeIndex(parseInt(e.target.value));
  };

  const startIndex = rangeIndex * rangeSize;
  const endIndex = startIndex + rangeSize;
const selectedEpisodes = detail.results && detail.results.episodes && detail.results.episodes.slice(startIndex, endIndex);

     useEffect(() => {
    const getDetail = async () => {
              setLoading(true);

    try {
      const res = await axios.get(`https://api.anime-dex.workers.dev/anime/${id}`);
           
  

                setAnimeData(idToData[id] || res.data);
      setDetail(res.data);
      setDetail2(res.data);
            setError(null);



 
 

             console.log(`https://api.anime-dex.workers.dev/anime/${id}`); 
                     setImageUrl(idToImageUrl[id] || res.data.results.image);
                                 setImageUrl2(idToImageUrl2[id] || res.data.results.image);

    } catch (error) {
      console.log("Error getting data: ", error);
            setError("Oops! This Anime Is Not Available.");

     }
 
  };
   
      getDetail();
      
    }, [id, provider]);



    if (error) {
  return         <NotAvailable>
          <img src="../assets/404.png" alt="Logo Here" />
<p>{error}</p>
        </NotAvailable>
;
}



    return (
      <>
        <Helmet>
          <meta
            name="description"
            content={`Best site to watch ${item.title} English Sub/Dub online Free and download ${item.title} English Sub/Dub anime.`}
            charSet="utf-8"
          />
          <meta
            name="keywords"
            content={`${item.title} English Sub/Dub, free ${item.title} online, watch ${item.title} online, watch ${item.title} free, download ${item.title} anime, download ${item.title} free`}
            charSet="utf-8"
          />
     {item && item.results && (
  <title>{`${item.results.name || ''}`}</title>
)}
          <link rel="canonical" href={`/info/${item.title}`} />
        </Helmet>
                <Content>

           {Object.keys(item).length !== 0 ? (
            
            <div className="row all__details">
            
                <Hello> 
                  <Banner
              src={imageUrl}
                alt=""
              />
              </Hello>
              
                <ContentWrapper>

                    <Poster>
 
                    <img
                      src={imageUrl2}
                      className="detail__img col"
                      style={{ maxWidth: "250px" }}
                      alt={item.title}
                    />
                    </Poster>
                    <div> 
                 <h1> 
                  {item.results.name}
                </h1>
                
                  <h3>{"English - " + item.title}</h3>
                     <p>
                    <span>Type: </span>
                    {item.results.type}
                  </p>
                  <p> 
                <span className="green fw-bold capSize noMargin" align="center">
                  Released: {item.results.plot_summary}
                </span>
                </p>
                  <p> 
                <span className="green fw-bold capSize noMargin" align="center">
                  Genre: {item.results.genre}
                </span>
                   </p>
                   <p>
                <span className="green fw-bold capSize noMargin" align="center">
                  Released: {item.results.released}
                </span>
                </p>
        
                
                <p className="green capSize noMargin" align="center">
                 <span> Status: </span>({item.results.status})
                </p>
                <p className="green capSize noMargin" align="center">
                 <span> Episodes: </span> {item.totalEpisodes}
                </p>
                <p className="green capSize noMargin" align="center">
                  {item.releasedDate}
                </p>
                
                <div>
                   
                </div>
                
                </div>
                    </ContentWrapper>
                    </div>
                   
             ) : (
            
             <NotAvailable> 
                <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="Loading..." />
               </NotAvailable>
          )}
    <div>
      
  </div>
 {/* All Episodes */}
         
                              <Episode>
                  <div style={{ marginBottom: '20px' }}>
        <label htmlFor="range-select">Select range:</label>
      <Dropdown id="range-select" value={rangeIndex} onChange={handleRangeChange}>
  {detail && detail.results && detail.results.episodes && [...Array(Math.ceil(detail.results.episodes.length / rangeSize)).keys()].map((i) => (
    <option key={i} value={i}>
      Episodes {i * rangeSize + 1} - {Math.min((i + 1) * rangeSize, detail.results.episodes.length)}
    </option>
  ))}
</Dropdown>

       </div>
              <ul className="ep__list">
                 {selectedEpisodes &&
          selectedEpisodes.map((ep) => (
                        <EpisodeLink
to={`/anime/gogoanime/watch/${ep[1]}`}
                        state={{ id: `${id}` }}
                        key={ep.number}
                      >
                        {ep.id === id ? (
                          <li
                            className="btn__ep even active"
                            style={{ color: "white" }}
                          >
                            <div className="green Anime-ep-num">
                            {ep[0]}
                            </div>
                            <div className="Anime-ep">{ep.id}</div>
                          </li>
                        ) : ep.number % 2 === 0 ? (
                          <li className="btn__ep even" style={{ color: "white" }}>
                            <div className="green Anime-ep-num">
                              Episode {ep[0]}
                            </div>
                           
                          </li>
                        ) : (
                          <li className="btn__ep odd" style={{ color: "white" }}>
                            <div className="green Anime-ep-num">
                             Episode {ep[0]}
                            </div>
                           </li>
                        )}
                      </EpisodeLink>
                    ))}
              </ul>
              </Episode>
         
              <Recommendation>

       <ul>
        {animeData.recommendations &&
          animeData.recommendations.map((recommendation) => (
            <li key={recommendation.id}>{recommendation.title.romaji}
            <a
            href={`/xd/${recommendation.id}`}
           >
            <img
              className="card-img"
              src={recommendation.image}
              alt={recommendation.title.userPreferred}
            />
            <h2>{recommendation.title.english || recommendation.title.native}</h2>
            <p>Status: {recommendation.status}</p>
            <p>Episodes: {recommendation.episodes || 'N/A'}</p>
          </a>
            
            </li>
            
          ))}
      </ul>
      </Recommendation>
                          
         </Content>
      </>
    );
  }

const Hello = styled.div`
position: relative;
   width: 100%;
  height: 58%;
  bottom: 0;
  left: 0;
   margin-bottom: -0.2rem;
  background: linear-gradient(to bottom, rgba(22, 22, 22, -0.7) 80%, rgba(22, 22, 22, 1.3) 100%, #161616 100%);  
 
  @media screen and (max-width: 600px) {
    height: 30%;
     background: linear-gradient(to bottom, rgba(22, 22, 22, -0.7) 60%, rgba(22, 22, 22, 1.3) 100%, #161616 100%);  
     
  }

  /* Additional background to top gradient */
   &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
       background: linear-gradient(to right, rgba(22, 22, 22, -0.7) 90%, rgba(22, 22, 22, 1.3) 100%, #161616 100%),
                       linear-gradient(to top, rgba(22, 22, 22, -0.7) 90%, rgba(22, 22, 22, 1.3) 100%, #161616 100%),

                linear-gradient(to bottom, rgba(22, 22, 22, -0.7) 60%, rgba(22, 22, 22, 1.3) 100%, #161616 100%),
                linear-gradient(to left, rgba(22, 22, 22, -0.7) 90%, rgba(22, 22, 22, 1.3) 100%, #161616 100%);

              
    /* Add left, right, and top gradients */
      
}

`;
const Recommendation = styled.div`
  text-align: center;

margin-top: 10rem;
  ul {
    display: grid;
  grid-template-columns: repeat(auto-fill, 216px);
  grid-gap: 1rem;
  grid-row-gap: 1.5rem;
  justify-content: space-between;
   }
  a{
      text-decoration: none;

  }
  li {
   display: inline-block;
  }


  img {
     width: 100%;
    height: 235px;
    border-radius: 0.5rem;
    margin-bottom: 0.3rem;
    object-fit: cover;
  }
 p, h2 {
    color: white;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
  }
  @media (min-width: 768px) {
    ul {
      grid-template-columns: repeat(3, 1fr); /* Two items in a row on screens wider than 768px */
    }
  }
  
  

  @media (min-width: 1200px) {
    ul {
      grid-template-columns: repeat(4, 1fr); /* Four items in a row on screens wider than 1200px */
    }
  }
     @media (max-width: 600px) {
    ul {
   grid-template-columns: repeat(2, 1fr); 
    }
  }
  
`;

 
const NotAvailable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  img {
    width: 30rem;
  }

  h1 {
    margin-top: -2rem;
    font-weight: normal;
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    img {
      width: 18rem;
    }

    h1 {
      font-size: 1.3rem;
    }
  }
`;
  
const Dropdown = styled.select`
   outline: none;
  background: #404040;
  border: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  color: #ffffff;
  background-color: #242235;
  padding: 0.8rem 2rem;
  font-family: 'Gilroy-Medium', sans-serif;
  font-size: 0.9rem;
  border-radius: 0.4rem;
  transition: 0.2s;
  display: flex;
  gap: 0.4rem;
  align-items: center;
   
`;
const ContentWrapper = styled.div`
  padding: 0 3rem 0 3rem;
  display: flex;

  div > * {
    margin-bottom: 0.6rem;
  }

  div {
    margin: 1rem;
    font-size: 1rem;
    color: #b5c3de;
    span {
      font-weight: 700;
      color: white;
    }
    p {
      font-weight: 300;
      text-align: justify;
    }
    h1 {
      font-weight: 700;
      color: white;
    }
    h3 {
      font-weight: 500;
    }
    button {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;
    padding: 0;
    div {
      margin: 1rem;
      margin-bottom: 0.2rem;
      h1 {
        font-size: 1.6rem;
      }
      p {
        font-size: 1rem;
      }
      button {
        display: inline;
        border: none;
        outline: none;
        background-color: transparent;
        text-decoration: underline;
        font-weight: 700;
        font-size: 1rem;
        color: white;
      }
    }
  }
`;
const Episode = styled.div`
  margin: 0 4rem 0 4rem;
  padding: 2rem;
  outline: 2px solid #272639;
  border-radius: 0.5rem;
  color: white;
  

  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  ul{
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(160px,1fr));
    grid-gap: 1rem;
      list-style-type: none;
    grid-row-gap: 1rem;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  li {
    listStyle: 'none';
  }
  box-shadow: 0px 4.41109px 20.291px rgba(16, 16, 24, 0.81);

  @media screen and (max-width: 600px) {
    padding: 1rem;
    margin: 1rem;
  }
`;

 
  const EpisodeLink = styled(Link)`
  text-align: center;
  color: white;
  text-decoration: none;
  background-color: #242235;
  padding: 0.9rem 2rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: 1px solid #393653;
  transition: 0.2s;

  :hover {
    background-color: #DB202C;
  }
   @media screen and (max-width: 600px) {
    padding: 1rem;
    border-radius: 0.3rem;
    font-weight: 500;
  }
`;



  const Banner = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 0.7rem;

  @media screen and (max-width: 600px) {
    height: 13rem;
    border-radius: 0.5rem;
  }
`;

const Content = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  position: relative;

  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const Poster = styled.div`
  display: flex;
  flex-direction: column;
  img {
    width: 220px;
    height: 300px;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    position: relative;
    
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  }
  @media screen and (max-width: 600px) {
    img {
      display: none;
    }
  }
`;