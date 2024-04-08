import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import ReactPlayer from 'react-player'
import { Helmet } from "react-helmet";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { LionPlayer } from 'lion-player';
import 'lion-player/dist/lion-skin.min.css';
  import NetPlayer from 'netplayer';

import {
  HiArrowSmLeft,
  HiArrowSmRight,
  HiOutlineSwitchHorizontal,
} from "react-icons/hi";
   function Stream({ }) {
const { episodeId } = useParams();
const location = useLocation();
  const { id } = useLocation().state || {};

const [data, setData] = useState(null);
const [playing, setPlaying] = useState(false)
const [detail, setDetail2] = useState([]);
const [item, setDetail] = useState([]);
 const [sources, setSources] = useState(null);
  const [sources2, setSources2] = useState(null);
    const [sources3, setSources3] = useState(null);
    const [sources4, setSources4] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isIframe, setIsIframe] = useState(true);
  const [episodes, setEpisodes] = useState([]);
const [error, setError] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState('netPlayer');

const videoRef = useRef(null);
const [loading, setLoading] = useState(false);
const [rangeIndex, setRangeIndex] = useState(0);
const rangeSize = 100;
const currentEpisodeIndex = episodes.episodes
  ? episodes.episodes.findIndex(({ id }) => id === episodeId)
  : -1;
 const nextEpisodeId = episodes.episodes
  ? (currentEpisodeIndex + 1 < episodes.episodes.length ? episodes.episodes[currentEpisodeIndex + 1].id : null)
  : null;
  const previousEpisodeId = currentEpisodeIndex - 1 >= 0 ? episodes.episodes[currentEpisodeIndex - 1].id : null;
 

  const togglePlayer = () => {
    setIsIframe(!isIframe);
  };


    const handlePlay = () => {
    setPlaying(true)
  }

  const handlePause = () => {
    setPlaying(false)
  }

  
  const handleRangeChange = (e) => {
    setRangeIndex(parseInt(e.target.value));
  };

    const handlePlayerChange = (event) => {
    setSelectedPlayer(event.target.value);
  };

  const startIndex = rangeIndex * rangeSize;
  const endIndex = startIndex + rangeSize;
  const selectedEpisodes = episodes.episodes && episodes.episodes.slice(startIndex, endIndex);

   const handleRecommendationClick = (recommendationId) => {
    setIsLoading(true); // Set loading state to true when the link is clicked

    // Simulate a delay, replace this with your actual data fetching logic
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after data is fetched
    }, 2000); // Adjust the delay as needed
  };
  
  useEffect(() => {
     const getVideo = async () => {
        setLoading(true);

      try {
        const { data } = await axios.get(`https://api-amvstrm.nyt92.eu.org/api/v2/stream/${episodeId}`);
        setData(data);
      setSources(data.plyr.backup);
setSources2(data.stream.multi.main.url);
         setSources3(data.iframe.default);
         setSources4(data.nspl.main);

      } catch (err) {
        
        console.log("Error fetching data: ", err);
      }
      console.log(`https://api-amvstrm.nyt92.eu.org/api/v2/stream/${episodeId}`);
        setLoading(false);

    };


  const getDetail = async () => {
              setLoading(false);

    try {
      const res = await axios.get(`https://hello-one-lilac.vercel.app/meta/anilist/info/${id}`);
     
      setDetail(res.data);
      setDetail2(res.data);
            setError(null);



 

              console.log(`https://api-amvstrm.nyt92.eu.org/api/v2/info/${id}`);

    } catch (error) {
      console.log("Error getting data: ", error);
            setError("Oops! This Anime Is Not Available.");

     }
 
  };
     
    
  const getEpisode = async () => {
  setLoading(true); // Set loading to true initially

  try {
    // Attempt to make a request to the first API endpoint
    const res = await axios.get(`https://api-amvstrm.nyt92.eu.org/api/v2
/episode/${id}`);
 
              setEpisodes(res.data);

    setError(null);
    setLoading(false); // Set loading to false on success

    console.log(`https://api-aniwatch.onrender.com/anime/episodes/${id}`);
  } catch (error) {
    console.error("Error getting data: ", error);

     
  }
};
  
        getVideo();
        getDetail();
    getEpisode();
    }, [id, episodeId, sources, sources2]);

   if (!data) {
    return       <Loading>
          <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="Logo Here" />
         </Loading>
;
  }

 return (
  
     <Container> 
       
       <Container2> 
    <VideoPlayerWrapper>
  <div>
    <Dropdown id="player-select" value={selectedPlayer} onChange={handlePlayerChange}>
      <option value="plyr">plyr Player</option>
      <option value="netPlayer">NetPlayer</option>
      <option value="iframe">iframe Player</option>
            <option value="nspl">nspl Player</option>

    </Dropdown>
    
    {!loading && (
      <>
        {selectedPlayer === 'plyr' ? (
          <iframe
            src={sources}
            scrolling="no"
            frameBorder="0"
            allowFullScreen="allowfullscreen"
            webkitallowfullscreen="true"
            controls
          />
        ) : selectedPlayer === 'netPlayer' ? (
          <NetPlayer sources={[{ file: sources2 }]} autoPlay />
        ) : selectedPlayer === 'iframe' ? (
         <iframe
            src={sources3}
            scrolling="no"
            frameBorder="0"
            allowFullScreen="allowfullscreen"
            webkitallowfullscreen="true"
            controls
          />
           ) : selectedPlayer === 'nspl' ? (
         <iframe
            src={sources4}
            scrolling="no"
            frameBorder="0"
            allowFullScreen="allowfullscreen"
            webkitallowfullscreen="true"
            controls
          />
        ) : null}
      </>
    )}

    {loading && (
      <Loading>
        <img
          src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
          alt="Loading..."
        />
        {/* Include LionPlayer in the loading section */}
        {selectedPlayer === 'lionplayer' && (
          <LionPlayer key={sources2} sources={sources2} />
        )}
      </Loading>
    )}
  </div>
</VideoPlayerWrapper>
                  
       
        {/* ... <LionPlayer key={sources2} sources={sources} /> */}

            <div className="all__ep ">
            
              {episodes.episodes && (
<>
<h2>
Episode {episodes.episodes.find(({ id }) => id === episodeId).number}:{" "}
{episodes.episodes.find(({ id }) => id === episodeId).title}
</h2>
</>
)}
</div>
 <EpisodeList> 
      
      {previousEpisodeId && (
        <EpisodeLink to={`/meta/anilist/watch/${previousEpisodeId}`} state={{ id: `${id}` }}>
                

        Previous Episode
         </EpisodeLink>
      )}
       {nextEpisodeId && (
        <EpisodeLink to={`/meta/anilist/watch/${nextEpisodeId}`} state={{ id: `${id}` }} 
        >
        Next Episode
                           

        </EpisodeLink>
      )}
</EpisodeList>
     
                  <Episode>
          <div style={{ marginBottom: '20px' }}>
        <label htmlFor="range-select">Select range:</label>
          <Dropdown id="range-select" value={rangeIndex} onChange={handleRangeChange}>
          {[...Array(Math.ceil((episodes.episodes || []).length / rangeSize)).keys()].map((i) => (
            <option key={i} value={i}>
              Episodes {i * rangeSize + 1} - {Math.min((i + 1) * rangeSize, (episodes.episodes || []).length)}
            </option>
          ))}
        </Dropdown>
       </div>
               <ul className="ep__list">
               {selectedEpisodes &&
          selectedEpisodes.map((ep) => (
                        <EpisodeLink
                         to={`/meta/anilist/watch/${ep.id}`}
                        state={{ id: `${id}` }}
                        key={ep.number}
                      >
                        {ep.id === id ? (
                          <li
                            className="btn__ep even active"
                            style={{ color: "white" }}
                          >
                            <div className="green Anime-ep-num">
                              {ep.number}
                            </div>
                            <div className="Anime-ep">{ep.id}</div>
                          </li>
                        ) : ep.number % 2 === 0 ? (
                          <li className="btn__ep even" style={{ color: "white" }}>
                            <div className="green Anime-ep-num">
                              Episode {ep.number}
                            </div>
                           
                          </li>
                        ) : (
                          <li className="btn__ep odd" style={{ color: "white" }}>
                            <div className="green Anime-ep-num">
                             Episode {ep.number}
                            </div>
                           </li>
                        )}
                      </EpisodeLink>
                    ))}
              </ul>
              </Episode>
               </Container2>
               <div> 
          <Relations>
         

  <h2>Relations</h2>
  <ul>
    {item.relations?.map((relation, index) => (
                     <li key={index}>

               <a 
                 href={`/xd/${relation.id}`}
              onClick={() => handleRecommendationClick(relation.id)}
              style={{ pointerEvents: isLoading ? 'none' : 'auto' }} 
               >

          <Poster2> 
            <img
              src={relation.image}
              alt={relation.title.userPreferred}
            />
       
           <TextContainer>

          <p>Type: {relation.relationType}</p>
                    <p>Type: {relation.title.userPreferred}</p>

          <p>Status: {relation.status}</p>
           </TextContainer>
    </Poster2>
           </a>
        </li>
     
    ))}
  </ul>
  
  
</Relations>
 <Recommendation>
           <h2>Recommendation</h2>

<ul>
        {item.recommendations?.map((recommendation, index) => (
              <li key={index}>
            <a
              href={`/xd/${recommendation.id}`}
              onClick={() => handleRecommendationClick(recommendation.id)}
              style={{ pointerEvents: isLoading ? 'none' : 'auto' }} // Disable the link when loading
              
            >
          
            {/* Render recommendation data */}
          
              <Poster2> 
            <img className="card-img" 
              src={recommendation.image}
              alt={recommendation.title.userPreferred}
            />
       
            <TextContainer> 
             <p>{recommendation.title.english || recommendation.title.native}</p>
            <p>Status: {recommendation.status}</p>
            <p>Episodes: {recommendation.episodes || 'N/A'}</p>
            </TextContainer>
             </Poster2>
            </a>
          </li>
        ))}
      </ul>
  
</Recommendation>
</div>

     </Container>
  );

  
}

const TextContainer = styled.div`
   flex-grow: 1; /* Allow TextContainer to grow and take up remaining space */
  text-align: left;
  padding-left: 1rem; /* Adjust padding as needed */
`;

const Container = styled.div`
display: flex;
margin: 2rem 5rem;
 
 @media screen and (max-width: 900px) {
      margin: 0rem;
        flex-direction: column;


   }

`;
const Recommendation = styled.div`
  margin-top: 10rem;
  text-align: center;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: 0.2s;
  font-size: 15px;
   
 
  h3 {
    text-align: center !important;
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: 0.2s;
    font-size: 15px;
  }

 
  p {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: 0.2s;
    text-align: center !important;
    font-size: 15px;
  }

  ul {
    overflow-y: auto;
    max-height: 500px;
    outline: 2px solid #272639;
  }
   li:hover {
    background-color: #DB202C;
  }
  ul::-webkit-scrollbar {
    width: 12px;
  }



  ul::-webkit-scrollbar-thumb {
    background-color: #272639;
    border-radius: 6px;
  }
    @media screen and (max-width: 900px) {
    width: 50%; /* Make the component 50% of the width */
    font-size: 12px; /* Adjust font size for smaller screens */
    
    }
    
    @media screen and (max-width: 600px) {
    width: 95%; /* Make the component 50% of the width */
    font-size: 12px; /* Adjust font size for smaller screens */
    margin-left: 0 !important;
    }
`;
const Relations = styled.div`
  justify-content: space-between;

  text-align: center;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: 0.2s;
  font-size: 15px;
   
 
  h3 {
    text-align: center !important;
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: 0.2s;
    font-size: 15px;
  }

 
  p {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: 0.2s;
    text-align: center !important;
    font-size: 15px;
  }

  ul {
    
    overflow-y: auto;
    max-height: 500px;
    outline: 2px solid #272639;
  }
    li {
    display: flex;
    align-items: center;
    margin: 1rem;
  }

   li:hover {
    background-color: #DB202C;
  }
  ul::-webkit-scrollbar {
    width: 12px;
  }



  ul::-webkit-scrollbar-thumb {
    background-color: #272639;
    border-radius: 6px;
  }
    @media screen and (max-width: 900px) {
    width: 50%; /* Make the component 50% of the width */
    font-size: 12px; /* Adjust font size for smaller screens */
    
    }
    
    @media screen and (max-width: 600px) {
    width: 95%; /* Make the component 50% of the width */
    font-size: 12px; /* Adjust font size for smaller screens */
    margin-left: 0 !important;
    }
`;
const Poster2 = styled.div`
 
  
display: flex;
  text-align: left; /* Align text to the left */
 img {
 width: 107px;
    height: 100%;
border-radius: 0.5rem;
margin-bottom: 2rem;
position: relative;
 filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
}
@media screen and (max-width: 600px) {
img {
  margin-left: 3rem;
 }
}
`;
const Container2 = styled.div`

margin: 1rem 4rem;

h2{
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
}
@media screen and (max-width: 900px) {
      margin: 0rem;

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

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  img {
    width: 10rem;
  }

  h1 {
    margin-top: -2rem;
    font-weight: normal;
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    img {
      width: 10rem;
    }

    h1 {
      font-size: 1.3rem;
    }
  }
`;
  // .video-js .vjs-big-play-button .vjs-icon-placeholder:before, .video-js .vjs-modal-dialog, .vjs-button>.vjs-icon-placeholder:before, .vjs-modal-dialog .vjs-modal-dialog-content {
   // position: inherit!important;
   // font-size: 2.5em;
  //  color: #DB202C;
  //  .video-js .vjs-play-progress, .video-js .vjs-slider-bar, .video-js .vjs-volume-level {
 //   background: #DB202C;
//}
//} 
 const VideoPlayerWrapper = styled.div`
  display: grid;
  grid-template-columns: 100% calc(30% - 1rem);
  gap: 1rem;
  align-items: flex-start;
 .yawa{
 
  background-color: #242235;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem 0.5rem 0 0;
  border: 1px solid #393653;
  margin-top: 1rem;
  border-bottom: none;
  font-weight: 400;
  text-decoration: none;
  }
 iframe {
  width: 100%;
  height: 690px;
}

/* Media query for smaller screens */
@media (max-width: 768px) {
  iframe {
    height: 500px;
  }
}

/* Media query for even smaller screens */
@media (max-width: 480px) {
  iframe {
    height: 260px;
  }
}
   
  @media screen and (max-width: 900px) {
      grid-template-columns: 100% calc(100% - 1rem);

   }
`;
 const EpisodeList = styled.div`
  justify-content: space-between;
    display: flex;
  @media screen and (max-width: 900px) {
      grid-template-columns: 100% calc(100% - 1rem);

   }
`;
 

const Episode = styled.div`
  margin-top: 10px;
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

 
export default Stream;