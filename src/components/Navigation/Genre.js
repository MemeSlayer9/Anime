import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Genre() {
  const { genre = "" } = useParams();
  const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Supernatural", "Sports", "Romance"];
  const [selectedGenre, setSelectedGenre] = useState(genre);
  const navigate = useNavigate();

  useEffect(() => {
    if (genre !== selectedGenre) {
      // Automatically navigate to the "Advanced" page when a genre is selected
      setSelectedGenre(genre);
    }
  }, [genre]);

  return (
    <> 
 
       <Dropdown
        id="genre-select"
        value={selectedGenre}
        onChange={(e) => {
          const newGenre = e.target.value;
          setSelectedGenre(newGenre);
          navigate(`/advanced/${newGenre}`);
        }}
      >
  <option value="" disabled>Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </Dropdown>
     </>
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
export default Genre;
