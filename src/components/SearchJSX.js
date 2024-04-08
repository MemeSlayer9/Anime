import React from "react";
import Card from "./Card";

export default function SearchJSX(props) {
  const handelClick = () => {
    props.handelClick();
  };
  return (
    <>
      {Object.keys(props.searchResult).length === 0 ? (
        <div align="center">
          <h4
            className="mt-3 fw-bold"
            style={{ fontFamily: "Poppins", color: "red" }}
          >
            NO SEARCH RESULT
          </h4>
          <hr
            style={{
              color: "white",
              height: "2px",
              width: "80%",
              margin: "20px auto",
              
            }}
             handelClick={handelClick} 
          />
        </div>
      ) : (
        <div align="center">
          <h4 className="green mt-3 fw-bold" style={{ fontFamily: "Poppins" }}>
            SEARCH RESULT
          </h4>
          <hr
            style={{
              color: "white",
              height: "2px",
              width: "80%",
              margin: "20px auto",
            }}
          />
          <div className="container__main row" >
            {props.searchResult?.map((rec) => (
            <img
            src={rec.animeImg}
            className="card__Img card-img-top rounded"
            alt={rec.animeId}
          />
            ))}
          </div>
          <hr
            style={{
              color: "white",
              height: "2px",
              width: "80%",
              margin: "20px auto",
            }}
          />
        </div>
      )}
    </>
  );
}
