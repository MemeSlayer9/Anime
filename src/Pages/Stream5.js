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

  const [isIframe, setIsIframe] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState('netPlayer');

const videoRef = useRef(null);
const [loading, setLoading] = useState(false);
const [rangeIndex, setRangeIndex] = useState(0);
const rangeSize = 100;
const episodes = detail.results && detail.results.episodes ? detail.results.episodes : [];
const episodeNumberFromId = parseInt(episodeId.match(/\d+/)[0], 10);

const currentEpisodeIndex = detail.results && detail.results.episodes
  ? detail.results.episodes.findIndex(([number]) => parseInt(number, 10) === episodeNumberFromId)
  : -1;

const nextEpisodeId = currentEpisodeIndex !== -1 && currentEpisodeIndex + 1 < episodes.length
  ? episodes[currentEpisodeIndex + 1][1]
  : null;

const previousEpisodeId = currentEpisodeIndex - 1 >= 0
  ? episodes[currentEpisodeIndex - 1][1]
  : null;

console.log('episodeId:', episodeId);
console.log('currentEpisodeIndex:', currentEpisodeIndex);
console.log('nextEpisodeId:', nextEpisodeId);
console.log('previousEpisodeId:', previousEpisodeId);


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
const selectedEpisodes = 
  detail.results && 
  detail.results.episodes && 
  Array.isArray(detail.results.episodes) ? 
    detail.results.episodes.slice(startIndex, endIndex) :
    [];

  
  
  useEffect(() => {
     const getVideo = async () => {
        setLoading(true);

      try {
        const { data } = await axios.get(`https://api.anime-dex.workers.dev/episode/${episodeId}`);
        setData(data);
        setSources(data.results.stream.Referer);   
        setSources3( data.results.servers.streamwish);

    setSources2(data.results.stream.sources[0].file);  // Access the first element of the sources array
      } catch (err) {
        
        console.log("Error fetching data: ", err);
      }
      
      console.log(`https://api.anime-dex.workers.dev/episode/${episodeId}`); 

        setLoading(false);

    };


 
    
     
   const getDetail = async () => {
              setLoading(true);

    try {
      const res = await axios.get(`https://api.anime-dex.workers.dev/anime/${id}`);
           
  

       setDetail(res.data);
      setDetail2(res.data);
 


 
 

             console.log(`https://api.anime-dex.workers.dev/anime/${id}`); 
                    

    } catch (error) {
      console.log("Error getting data: ", error);
 
     }
 
  };
  
        getVideo();
    getDetail();
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
            src={sources}
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
<div className="all__ep">
  {detail.results.episodes && (
    <>
      {detail.results.episodes.find(([number, id]) => id === episodeId) && (
        <>
          {detail.results.episodes.find(([number, id]) => id === episodeId).map((episode, index) => (
            <h2 key={index}>
              Episode {episode}
            </h2>
          ))}
        </>
      )}
    </>
  )}
</div>


 <EpisodeList> 
      
      {previousEpisodeId && (
        <EpisodeLink to={`/anime/gogoanime/watch/${previousEpisodeId}`} state={{ id: `${id}` }}>
 
        Previous Episode
         </EpisodeLink>
      )}
       {nextEpisodeId && (
        <EpisodeLink to={`/anime/gogoanime/watch/${nextEpisodeId}`} state={{ id: `${id}` }} 
        >
        Next Episode 

        </EpisodeLink>
      )}
</EpisodeList>
     </Container2>
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
                        key={ep[0]}
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
         
     </Container>
  );

  
}
const Container = styled.div`
margin: 2rem 5rem;
@media screen and (max-width: 900px) {
      margin: 0rem;

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

 
export default Stream;