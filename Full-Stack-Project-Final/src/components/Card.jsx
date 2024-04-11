import React, { useState, useEffect } from 'react';
import './Card.css';
import more from '../assets/more.png';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const Card = (props) => {
  const { username } = useParams();

  const [likesCount, setLikeCount] = useState(props.likes);
  const [dislikeCount, setDislikeCount] = useState(props.dislikes);

  useEffect(() => {
    async function updateLikes() {
      try {
        await supabase.from('Posts').update({ likes: likesCount }).eq('id', props.id);
      } catch (error) {
        console.error('Error updating likes:', error.message);
      }
    }

    async function updateDislikes() {
      try {
        await supabase.from('Posts').update({ dislikes: dislikeCount }).eq('id', props.id);
      } catch (error) {
        console.error('Error updating dislikes:', error.message);
      }
    }

    updateLikes();
    updateDislikes();
  }, [likesCount, dislikeCount, props.id]);

  const updateLikeCount = () => {
    setLikeCount((count) => count + 1);
  };

  const updateDislikeCount = () => {
    setDislikeCount((count) => count + 1);
  };

  return (
    <div className="Card">
      <Link to={`/${username}/edit/${props.id}`}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
      <h2 className="poster">{props.poster}</h2>
      <h3 className="content">{props.content}</h3>
      <div className="interactions">
        <p className="likes">👍 {likesCount}</p>
        <p className="dislikes">👎 {dislikeCount}</p>
      </div>
      <button className="likeBtn" onClick={updateLikeCount}>
        Like
      </button>
      <button className="dislikeBtn" onClick={updateDislikeCount}>
        Dislike
      </button>
    </div>
  );
};

export default Card;
