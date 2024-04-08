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
   function Stream({   }) {
const { episodeId } = useParams();
const location = useLocation();
 
  const { id, dub: dubParam, sub: subParam } = useLocation().state || {};
  
  const [dub, setDub] = useState(dubParam === 'true'); // Convert string to boolean
  const [sub, setSub] = useState(subParam === 'true'); // Convert string to boolean
const [data, setData] = useState(null);
const [playing, setPlaying] = useState(false)
const [detail, setDetail2] = useState([]);
const [item, setDetail] = useState([]);
 const [sources, setSources] = useState(null);
  const [sources2, setSources2] = useState(null);
    const [sources3, setSources3] = useState(null);
    const [sources4, setSources4] = useState(null);
   const [isFetchingEpisodes, setIsFetchingEpisodes] = useState(false);
const [currentVersion, setCurrentVersion] = useState('sub');

  const [isIframe, setIsIframe] = useState(true);
  const [episodes, setEpisodes] = useState([]);
const [error, setError] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState('netPlayer');
  const [mode, setMode] = useState("sub"); // "sub" by default
   
const isButtonDisabled = isFetchingEpisodes || (dubParam === 'true' && subParam === 'true');
const isButtonDisabled2 = isFetchingEpisodes || (dubParam === 'false' && subParam === 'false');

const videoRef = useRef(null);
const [loading, setLoading] = useState(false);
const [rangeIndex, setRangeIndex] = useState(0);
const rangeSize = 100;
const currentEpisodeIndex = episodes
  ? episodes.findIndex(({ id }) => id === episodeId)
  : -1;
 const nextEpisodeId = episodes
  ? (currentEpisodeIndex + 1 < episodes.length ? episodes[currentEpisodeIndex + 1].id : null)
  : null;
  const previousEpisodeId = currentEpisodeIndex - 1 >= 0 ? episodes[currentEpisodeIndex - 1].id : null;
    
  
   const handleDub = async () => {
    if (isFetchingEpisodes) {
      return; // Disable the button during the fetching process
    }

    setIsFetchingEpisodes(true);

    try {
      // Ensure episodeId is available before proceeding
      if (!episodeId) {
        console.error("Error: Episode ID not available");
        return;
      }

      const newVersion = currentVersion === 'sub' ? 'dub' : 'sub';

      // Assume the structure is "kimetsu-no-yaiba-episode-{episodeNumber}"
      const parts = episodeId.split('-');

      // Find the index of 'episode'
      const episodeIndex = parts.findIndex(part => part === 'episode');

      if (episodeIndex !== -1) {
        // Insert the new version before 'episode'
        parts.splice(episodeIndex, 0, newVersion);
      }

      // Recreate the new episode ID
      const newEpisodeId = parts.join('-');

      // Log the current version and episode ID
  
      console.log("New episode ID:", newEpisodeId);

      // Simulate the asynchronous process
      // Replace this with your actual asynchronous call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update the dub and sub states
      setDub(true);
      setSub(false);
      const originalApiUrl = `https://api-amvstrm.nyt92.eu.org/api/v2/stream/${episodeId}`;
      const updatedApiUrl = `https://api-amvstrm.nyt92.eu.org/api/v2/stream/${newEpisodeId}`;
    console.log("Original API URL:", originalApiUrl);
    console.log("Updated API URL:", updatedApiUrl);

   
      
      // Build the new URL using the current location and replace the path
      const newPath = `/meta/anilist/watch/${newEpisodeId}`;
      const newUrl = `${location.pathname.split('/meta/anilist/watch')[0]}${newPath}`;
      window.history.replaceState(null, '', newUrl);

      // Call getVideo with the modified episode ID
          await getVideo(newEpisodeId);

// Call getVideo with the modified episode ID
 
     } finally {
      setIsFetchingEpisodes(false);
    }
  };
 

  const handdleSub = async () => {
    setDub(false);
    setSub(true);
    setIsFetchingEpisodes(true);
    try {
      const newVersion = currentVersion === 'sub' ? 'dub' : 'sub';

    // Replace the version part directly
    const newEpisodeId = episodeId.replace(`-${newVersion}-`, '-');

    // Log the current version and episode ID
    console.log("Current version:", currentVersion);
    console.log("New version:", newVersion);
    console.log("New episode ID:", newEpisodeId);
      await getEpisode(id, false, true, setEpisodes, setLoading, setError);
    } finally {
      setIsFetchingEpisodes(false);
    }
  }

const handleToggle = async () => {
  setIsFetchingEpisodes(true);

  try {
    const newDubState = !dub;

    // Determine the new version
    const newVersion = currentVersion === 'sub' ? 'dub' : 'sub';

    // Assume the structure is "kimetsu-no-yaiba-episode-{episodeNumber}"
    const parts = episodeId.split('-');

    // Find the index of 'episode'
    const episodeIndex = parts.findIndex(part => part === 'episode');

    if (episodeIndex !== -1) {
      // Insert the new version before 'episode'
      parts.splice(episodeIndex, 0, newVersion);
    }

    // Recreate the new episode ID
    const newEpisodeId = parts.join('-');

    // Log the current version and episode ID
    console.log("Current version:", currentVersion);
    console.log("New version:", newVersion);
    console.log("New episode ID:", newEpisodeId);

    // Update the dub and sub states
    setDub(newDubState);
    setSub(!newDubState);

    // Call getVideo with the modified episode ID
    await getVideo(newEpisodeId);
  } finally {
    setIsFetchingEpisodes(false);
  }
};




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
  const selectedEpisodes =  episodes && episodes.slice(startIndex, endIndex);
  
  
  
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



     
    
const DEFAULT_API_ENDPOINT = "https://hello-one-lilac.vercel.app/meta/anilist/episodes";

const getEpisode = async (id, dub = true, sub = false, setEpisodes, setLoading, setError) => {
  setLoading(true);

  try {
    const res = await axios.get(`${DEFAULT_API_ENDPOINT}/${id}?dub=${dub}&sub=${sub}`);
    setEpisodes(res.data);
    setError(null);
    setLoading(false);
          setMode(dub ? "dub" : "sub"); // Update the mode

    console.log(`${DEFAULT_API_ENDPOINT}/${id}?dub=${dub}&sub=${sub}`);
  } catch (error) {
    console.error("Error getting data: ", error);
  }
};

useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    try {
      if (isMounted) {
        await getEpisode(id, dub, sub, setEpisodes, setLoading, setError, setMode);
        getVideo();
      }
    } catch (error) {
      console.error("Error during fetchData: ", error);
    }
  };
  console.log('dubParam:', dubParam);
console.log('subParam:', subParam);
 
  fetchData();

  return () => {
    isMounted = false;
  };
}, [id, dub, sub, episodeId, sources, sources2, ]);

 

 
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
 <button onClick={handleDub} disabled={isButtonDisabled}>    Watch Dub
  </button>


     <button onClick={handdleSub} >

  Watch Sub
</button>
       
        {/* ... <LionPlayer key={sources2} sources={sources} /> */}

    <div className="all__ep ">
            
              {episodes && (
<>
<h2>
Episode {episodes.find(({ id }) => id === episodeId)?.number}:{" "}
{episodes.find(({ id }) => id === episodeId)?.title}
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
     </Container2>
                  <Episode>
          <div style={{ marginBottom: '20px' }}>
        <label htmlFor="range-select">Select range:</label>
          <Dropdown id="range-select" value={rangeIndex} onChange={handleRangeChange}>
          {[...Array(Math.ceil((episodes || []).length / rangeSize)).keys()].map((i) => (
            <option key={i} value={i}>
              Episodes {i * rangeSize + 1} - {Math.min((i + 1) * rangeSize, (episodes || []).length)}
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

  const DubContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-top: 37px !important;
  margin-left: -10px !important;

  .switch {
    position: relative;
      margin-top: 2px !important;
      margin-left: -6px !important;


    label {
      display: flex;
      align-items: center;
      font-family: "Lexend", sans-serif;
      font-weight: 400;
      cursor: pointer;
      margin-bottom: 0.3rem;
    }

    .label {
      margin-bottom: 0.7rem;
      font-weight: 500;
    }

    .indicator {
      position: relative;
      width: 60px;
      height: 30px;
      background: #242235;
      border: 2px solid #393653;
      display: block;
      border-radius: 30px;
      margin-right: 10px;
      margin-bottom: 10px;

      &:before {
        width: 22px;
        height: 22px;
        content: "";
        display: block;
        background: #DB202C;
        border-radius: 26px;
        transform: translate(2px, 2px);
        position: relative;
        z-index: 2;
        transition: all 0.5s;
      }
    }
    input {
      visibility: hidden;
      position: absolute;

      &:checked {
        & + .indicator {
          &:before {
            transform: translate(32px, 2px);
          }
          &:after {
            width: 54px;
          }
        }
      }
    }
  }
`;
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