import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'


const Card = (props) =>  {

  const [count, setCount] = useState(0)
  const updateCount = () => {
    setCount((count) => count + 1);
  }

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="poster">{props.poster}</h2>
          <textarea name="content" id="content" cols="50" rows="5">
            {props.content}
          </textarea>
          {/* <h3 className="content">{props.content}</h3> */}
          <p className="likes">{props.likes}</p>
          <p className="dislikes">{props.dislikes}</p>
          <button className="betButton" onClick={updateCount} >👍 Bet Count: {count}</button>
      </div>
  );
};

export default Card;