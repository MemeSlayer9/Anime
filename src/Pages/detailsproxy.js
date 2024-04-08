  import React, { useEffect, useState } from "react";
  import { Link, useParams, useHistory } from "react-router-dom";
  import { Helmet } from "react-helmet";
  import axios from "axios";
  import styled from "styled-components";
  import useWindowDimensions from "../hooks/useWindowDimensions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import Switch from 'react-switch';

  export default function Details({props, provider, }) {

    
  const { id } = useParams();
  const {episodeId} = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [item, setDetail] = useState([]);
  const [detail, setDetail2] = useState([]);
  const { width } = useWindowDimensions();
 const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
   const [dub, setDub] = useState(false);
  const [sub, setSub] = useState(false);
const [error, setError] = useState(null);
const [rangeIndex, setRangeIndex] = useState(0);
const rangeSize = 100;
    const [activeTab, setActiveTab] = useState('desc');
  const [mode, setMode] = useState("sub"); // "sub" by default
  const [isFetchingEpisodes, setIsFetchingEpisodes] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleRangeChange = (e) => {
    setRangeIndex(parseInt(e.target.value));
  };
  const handleWatchDubClick = async () => {
    setIsFetchingEpisodes(true);
    setDub(true);
    setSub(false);
    try {
      await getEpisode(id, true, false, setEpisodes, setLoading, setError);
    } finally {
      setIsFetchingEpisodes(false);
    }
  };

  const handleWatchSubClick = async () => {
    setIsFetchingEpisodes(true);
    setDub(false);
    setSub(true);
    try {
      await getEpisode(id, false, true, setEpisodes, setLoading, setError);
    } finally {
      setIsFetchingEpisodes(false);
    }
  };

  const handleRecommendationClick = (recommendationId) => {
    setIsLoading(true); // Set loading state to true when the link is clicked

    // Simulate a delay, replace this with your actual data fetching logic
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after data is fetched
    }, 2000); // Adjust the delay as needed
  };
   const handleToggle = async () => {
    setIsFetchingEpisodes(true);

    try {
      await getEpisode(id, !dub, !dub, setEpisodes, setLoading, setError);
      setDub(!dub);
      setSub(!dub);
    } finally {
      setIsFetchingEpisodes(false);
    }
  };
 
  const startIndex = rangeIndex * rangeSize;
  const endIndex = startIndex + rangeSize;
  const selectedEpisodes =  episodes && episodes.slice(startIndex, endIndex);
const DEFAULT_API_ENDPOINT = "https://hello-one-lilac.vercel.app/meta/anilist/episodes";

const getInitialEpisode = async (id, setEpisodes, setLoading, setError) => {
  setLoading(true);

  try {
    const res = await axios.get(`${DEFAULT_API_ENDPOINT}/${id}`);
    setEpisodes(res.data);
    setError(null);
    setLoading(false);
    console.log(`Initial fetch: ${DEFAULT_API_ENDPOINT}/${id}`);
  } catch (error) {
    console.error("Error getting initial data: ", error);
  }
};

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
   
    
      getDetail(id);
getInitialEpisode(id, setEpisodes, setLoading, setError);

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
        {
  item && item.title && (
    <title>{`${item.title.english || ''} 24anime`}</title>
  )
}
          <link rel="canonical" href={`/info/${item.title}`} />
        </Helmet>
        <Hello> 
         <Banner
              src={item.cover}
                alt=""
              />
              </Hello>
              
              
                <Content>
  
                    
           {Object.keys(item).length !== 0 ? (
            
            <div className="row all__details">
            
          <Poster>
      <img
        src={item.image}
        className="detail__img col"
        style={{ maxWidth: "250px" }}
        alt={item.title}
      />
      <div>
        <h1>{item.title.romaji}</h1>
        <h3>{"English - " + item.title.english}</h3>
              <p>Currently Displaying: {mode === "sub" ? "Sub" : "Dub"}</p>

       <h4> Status:  <span>({item.status})</span></h4>
        
        <div>
           {/* <button
  onClick={async () => {
    setDub(true);
    setSub(false);
    setIsFetchingEpisodes(true);
    try {
      await getEpisode(id, true, false, setEpisodes, setLoading, setError);
    } finally {
      setIsFetchingEpisodes(false);
    }
  }}
>
  Watch Dub
</button>

<button
  onClick={async () => {
    setDub(false);
    setSub(true);
    setIsFetchingEpisodes(true);
    try {
      await getEpisode(id, false, true, setEpisodes, setLoading, setError);
    } finally {
      setIsFetchingEpisodes(false);
    }
  }}
>
  Watch Sub
</button> */}
  <DubContainer>
                  <h2>Watch</h2>
                  
                    <div class="switch">
                      <label for="switch">
                       <input
            type="checkbox"
            id="switch"
            onChange={handleToggle}
            checked={dub}
          ></input>
                        <span class="indicator"></span>
                        <span class="label">{dub ? "Dub" : "Sub"}</span>
                      </label>
                    </div>
              
                </DubContainer>
 

          {/* Display episodes, loading spinner, or error message here */}
        </div>
      </div>
        
    </Poster>
    
                  <div style={{ marginLeft: '-10px' }}> 
                 <TabButton onClick={() => handleTabClick('desc')}>
          Desc
        </TabButton>
        {item.relations && item.relations.length > 0 && (
          <TabButton onClick={() => handleTabClick('relations')}>
            Relations
          </TabButton>
        )}
        <TabButton onClick={() => handleTabClick('recommendation')}>
          Recommendation
        </TabButton>
               </div>
      
      
      
           <ContentWrapper>
    
      
      {activeTab === 'desc' && (
        
        <Desc>
        
          <h1> 
                  {item.title.romaji}
                </h1>
                
                  <h3>{"English - " + item.title.english}</h3>
                     <p>
                    <span>Type: </span>
                    {item.type}
                  </p>
                  <p> 
                <span className="green fw-bold capSize noMargin" align="center">
                  Released: {item.description}
                </span>
                </p>
                  <p> 
                <span className="green fw-bold capSize noMargin" align="center">
                  Released: {item.releaseDate}
                </span>
                </p>
        
                <p className="green capSize noMargin" align="center">
                <span> Genres: </span>{item.genres.join(", ")}
                </p>
                <p className="green capSize noMargin" align="center">
                 <span> Status: </span>({item.status})
                </p>
                <p className="green capSize noMargin" align="center">
                 <span> Episodes: </span> {item.totalEpisodes}
                </p>
                <p className="green capSize noMargin" align="center">
                  {item.releasedDate}
                </p>
        </Desc>
      )}

      {activeTab === 'relations' && item.relations && item.relations.length > 0 && (
       <Relations>
         

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
        
{item.relations?.map((relation, index) => (
    <SwiperSlide key={index}>
    <Wrapper>
      <a href={`/xd/${relation.id}`}>
           <img className="card-img" src={relation.image} alt={relation.title.romaji}/>
         <p>{relation.title.english}</p>
      </a>
    </Wrapper>
  </SwiperSlide>
))}
        
        </Swiper>
  
</Relations>
      )}

      {activeTab === 'recommendation' && (
     <Recommendation> 
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
        
{item.recommendations?.map((recommendations, index) => (
    <SwiperSlide key={index}>
    <Wrapper>
      <a href={`/xd/${recommendations.id}`}  style={{ pointerEvents: isLoading ? 'none' : 'auto' }} >
           <img className="card-img" src={recommendations.image} alt={recommendations.title.romaji}/>
         <p>{recommendations.title.english}</p>
      </a>
    </Wrapper>
  </SwiperSlide>
))}
        
        </Swiper>
                       </Recommendation>   
      )}
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

        {isFetchingEpisodes ? (
         <div className="loading-container">
      <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="Loading..." />
    </div>
        ) : (
          <>
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
                        state={{ id: `${id}`, dub: dub.toString(), sub: sub.toString()  }}
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
          </>
        )}
      </Episode>
         
 
 
           
         </Content>
         
      </>
    );
  }

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

const TabButton = styled.button`
  margin-right: 10px;
  padding: 8px;
  cursor: pointer;
`;
const Desc = styled.div`
 
`;
const RR = styled.div`
 display: flex;
 margin-top: 100px;
`;

const Recommendation = styled.div`
  
  
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
  
  div > * {
    margin-bottom: 0.6rem;
  }

  div {
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
    flex-direction: column;
    padding: 0;
    div {
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
const Relations = styled.div`
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

const Poster2 = styled.div`
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
  margin-left: 3rem;
 }
}
`;
const Episode = styled.div`
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
  .loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* Optionally, set a height if you want it to take the full height */
}

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


const Hello = styled.div`
 position: absolute;
  width: 100%;
  height: 58%;
  bottom: 0;
  left: 0;
  top: 6rem;
  margin-bottom: -0.2rem;
  background: linear-gradient(to top, rgba(22, 22, 22, -0.7) 80%, rgba(22, 22, 22, 1.3) 100%, #161616 100%);  
 
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
    background: linear-gradient(to bottom, rgba(22, 22, 22, -0.7) 60%, rgba(22, 22, 22, 1.3) 100%, #161616 100%);
 
   }
`;
  const Banner = styled.img`
  
  width: 100%;
  height: 25rem;
  object-fit: cover;
  border-radius: 0.7rem;

  @media screen and (max-width: 600px) {
    height: 13rem;
    border-radius: 0.5rem;
  }
`;

const Content = styled.div`
  margin: 27rem 5rem 2rem 5rem;
  position: relative;

  @media screen and (max-width: 600px) {
    margin: 1rem;
    padding-top: 15rem;
  }
`;

const Poster = styled.div`
display: flex;
  
 img {
  width: 220px;
    height: 300px;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    position: relative;
       margin-top: -134px;

     filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
}
div{
     margin-left: 10px;
    margin-top: -27px;
}
h1{
      font-size: 1.7rem;
      font-weight: 800;
      margin-top: 10px;
        margin-bottom: 10px;

}
  h3 {
      font-weight: 500;
     margin-top: 10px;
       margin-bottom: 10px;
    }
span{
  color: #DB202C;
    margin-top: 10px;
    
}
h4{
    margin-top: 10px !important;
}
button {
  font-size: 1.2rem;
    padding: 1rem 3.4rem;
    text-align: center;
    text-decoration: none;
    color: white;
    background-color:#DB202C;
    font-weight: 700;
    border-radius: 0.4rem;
    position: relative;
    top: -25%;
    white-space: nowrap;
    margin-top: 50px;
       margin-right: 20px
}
@media screen and (max-width: 1000px) {
img {
display: none;
}
div{
     margin-left: 0;
    margin-top: 0;
}
}
`;