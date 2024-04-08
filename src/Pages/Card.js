import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  function makeBold(input, wordsToBold) {
    var re = new RegExp(wordsToBold, "g");
   }
  return (
    <>
      <div
        className="card__main card m-2"
        style={{ display: "inline-block" }}
        onClick={() => props.handelClick()}
      >
        <Link  to={`/xd/${props.item.id}`}>
          <img
            src={props.item.image}
            className="card__Img card-img-top rounded"
            alt={props.item.id}
          />
          <div className="card-body row">
            <h5
              className="card-title hiddentext"
              align="center"
              dangerouslySetInnerHTML={{
                __html: makeBold(props.item.title, "Dub"),
              }}
            />
            {props.ep !== "false" ? (
              <p className="card-text mt-auto" align="center">
                Ep No: {props.item.num}
              </p>
            ) : null}
          </div>
        </Link>
      </div>
    </>
  );
}
