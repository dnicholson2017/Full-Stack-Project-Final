import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from '../assets/more.png'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';


const Card = (props) =>  {

  const { username } = useParams();

  const [count, setCount] = useState(0)
  const updateCount = () => {
    setCount((count) => count + 1);
  }

  return (
      <div className="Card">
          <Link to={`/${username}/edit/${props.id}`}><img className="moreButton" alt="edit button" src={more}/></Link>
          <h2 className="poster">{props.poster}</h2>
          <h3 className="content">
            {props.content}
          </h3>
          {/* <h3 className="content">{props.content}</h3> */}
          <div className="interactions">
            <p className="likes">{props.likes}</p>
            <p className="dislikes">{props.dislikes}</p>
          </div>
          <button className="betButton" onClick={updateCount} >👍 Bet Count: {count}</button>
      </div>
  );
};

export default Card;