  import React, { useEffect, useState } from "react";
  import { Link, useParams, useNavigate  } from "react-router-dom";
  import { Helmet } from "react-helmet";
  import axios from "axios";
  import styled from "styled-components";
  import useWindowDimensions from "../hooks/useWindowDimensions";

  export default function Details({props, provider, }) {

    
  const { id } = useParams();
  const {episodeId} = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [item, setDetail] = useState([]);
  const [detail, setDetail2] = useState([]);
  const { width } = useWindowDimensions();
 const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
   const [mode, setMode] = useState("sub"); // "sub" by default
 const [dub, setDub] = useState(false);
  const [sub, setSub] = useState(false);
const [error, setError] = useState(null);
  const [isFetchingEpisodes, setIsFetchingEpisodes] = useState(false);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

const [rangeIndex, setRangeIndex] = useState(0);
const rangeSize = 100;
  
  const handleRangeChange = (e) => {
    setRangeIndex(parseInt(e.target.value));
  };
  

  const handleRecommendationClick = (recommendationId) => {
    setIsLoading(true); // Set loading state to true when the link is clicked

    // Simulate a delay, replace this with your actual data fetching logic
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after data is fetched
    }, 2000); // Adjust the delay as needed
  };
  
 
  const startIndex = rangeIndex * rangeSize;
  const endIndex = startIndex + rangeSize;
  const selectedEpisodes =  episodes && episodes.slice(startIndex, endIndex);

const handleDub = async () => {
    setDub(true);
    setSub(false);
    setIsFetchingEpisodes(true);
          setActiveButton('dub');

    try {
      await getEpisode(id, true, false, setEpisodes, setLoading, setError);
    } finally {
      setIsFetchingEpisodes(false);
    }
     
  };

  const handleSub = async () => {
    setDub(false);
    setSub(true);
    setIsFetchingEpisodes(true);
        setActiveButton('sub');

    try {
      await getEpisode(id, false, true, setEpisodes, setLoading, setError);
    } finally {
      setIsFetchingEpisodes(false);
    }
  };
   
   
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
     const getDetail = async () => {
              setLoading(false);

    try {
      const res = await axios.get(`https://api-amvstrm.nyt92.eu.org/api/v2
/info/${id}`);
     
      setDetail(res.data);
      setDetail2(res.data);
            setError(null);



 

              console.log(`https://api-amvstrm.nyt92.eu.org/api/v2/info/${id}`);

    } catch (error) {
      console.log("Error getting data: ", error);
            setError("Oops! This Anime Is Not Available.");

     }
 
  };
   useEffect(() => {


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
                <Content>

           {Object.keys(item).length !== 0 ? (
            
            <div className="row all__details">
            
          <Hello> 
         <Banner
              src={item.bannerImage}
                alt=""
              />
              </Hello>
              
                <ContentWrapper>

                    <Poster>
 
                    <img
                      src={item.coverImage.large}
                      className="detail__img col"
                      style={{ maxWidth: "250px" }}
                      alt={item.title}
                    />
                                   {item.dub && (
  <>
     <Button onClick={handleDub} active={activeButton === 'dub'}>
        Watch Dub
      </Button>
      <Button onClick={handleSub} active={activeButton === 'sub'}>
        Watch Sub
      </Button>
  </>
)}

                    </Poster>
     
                    <div> 
                  <h1> 
                  {item.title.romaji}
                </h1>
                
                  <h3>{"English - " + item.title.english}</h3>
                     <p>
                    <span>Type: </span>
                    {item.format}
                  </p>
                  {item.dub && (
  <p>
    <span>Dubbed: </span> Yes
  </p>
)}
                                <p>Currently Displaying: {mode === "sub" ? "Sub" : "Dub"}</p>

                  <p> 
                <span className="green fw-bold capSize noMargin" align="center">
                  Released: {item.description}
                </span>
                </p>
                  <p> 
                   <span className="green capSize noMargin" align="center">
  Released: {`${item.startIn.year}-${item.startIn.month}-${item.startIn.day}`}
</span> 
                </p>
        
                <p className="green capSize noMargin" align="center">
                <span> Genres: </span>{item.genres.join(", ")}
                </p>
                <p className="green capSize noMargin" align="center">
                 <span> Status: </span>({item.status})
                </p>
                <p className="green capSize noMargin" align="center">
                 <span> Episodes: </span> {item.episodes}
                </p>

            
                <div>
                   
                </div>
                
                </div>
                  {item.relations && item.relations.length > 0 && (
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
          </Poster2>
          <p>Type: {relation.relationType}</p>
          <p>Status: {relation.status}</p>
           </a>
        </li>
     
    ))}
  </ul>
  
</Relations>
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
         
 
<Recommendation> 
       <ul>
        {item.recommendations?.map((recommendation, index) => (
              <li key={index}>
            <a
              href={`/xd/${recommendation.id}`}
              onClick={() => handleRecommendationClick(recommendation.id)}
              style={{ pointerEvents: isLoading ? 'none' : 'auto' }} // Disable the link when loading
              
            >
          
            {/* Render recommendation data */}
          
            
            <img className="card-img" 
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

const Button = styled(Link)`
  font-size: 1.2rem;
  padding: 1rem 3.4rem;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: ${({ active }) => (active ? '#DB202C' : '#242235')};
  font-weight: 700;
  border-radius: 0.4rem;
  position: relative;
  white-space: nowrap;

  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
  }
`;


const RR = styled.div`
 display: flex;
 margin-top: 100px;
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
    flex-direction: column;
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

   .loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* Optionally, set a height if you want it to take the full height */
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
@media screen and (max-width: 1000px) {
img {
display: none;
}
}
`;