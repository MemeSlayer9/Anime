import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";

import GlobalStyle from "./styles/globalStyles";
import Nav from "./components/Navigation/Nav";
import MalAnimeDetails from "./Pages/MalAnimeDetails";
import SearchResults from "./Pages/SearchResults";
import AnimeDetails from "./Pages/AnimeDetails";
import PopularAnime from "./Pages/PopularAnime";
import TrendingAnime from './Pages/TrendingAnime';
import AnimeChart from './Pages/AnimeChart';

import Stream from "./Pages/Stream";
import Stream2 from "./Pages/Stream2";
import Stream5 from "./Pages/Stream5";

import Details from "./Pages/Details";
import './App.css';
import RecentAnime from "./Pages/RecentAnime";
import Advanced from './Pages/Advanced';

function App() {
return (
<Router>
<GlobalStyle />
<Nav />

<Routes>

<Route path="/" element={<Home />} />
<Route path="/popular/:page" element={<PopularAnime />} />
<Route path="/trending/:page" element={<TrendingAnime />} />
<Route path="/recent/:page" element={<RecentAnime />} />
<Route path="/search/:name" element={<SearchResults />} />
<Route path="/category/:slug" element={<AnimeDetails />} />
<Route exact path="/xd/:id" element={<Details />} />
<Route path="/animechart/:page" element={<AnimeChart />} />
<Route path="/advanced/:genre" element={<Advanced />} />

<Route exact path="/id/:id" element={<MalAnimeDetails />} />

<Route  exact   path="/vidcdn/watch/:episodeId" element={<Stream />} />
<Route  exact  path="/meta/anilist/watch/:episodeId" element={<Stream2 />} />
<Route  exact  path="/anime/gogoanime/watch/:episodeId" element={<Stream5 />} />


</Routes>
<Toaster
toastOptions={{
style: {
borderRadius: "10px",
background: "#242235",
border: "1px solid #393653",
color: "#fff",
},
}}
/>
</Router>


);

}

export default App;

