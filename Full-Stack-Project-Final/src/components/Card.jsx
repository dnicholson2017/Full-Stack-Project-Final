import React, { useState, useEffect } from 'react';
import './Card.css';
import more from '../assets/more.png';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import Comment from './Comment';

const Card = (props) => {
  const { username } = useParams();

  const [likesCount, setLikeCount] = useState(props.likes);
  const [dislikeCount, setDislikeCount] = useState(props.dislikes);
  const [formattedCreatedAt, setFormattedCreatedAt] = useState('');
  const [showComments, setShowComments] = useState(false); // State to track whether comments are visible

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

    // Format the created_at date
    const formattedDate = new Date(props.created_at).toLocaleString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
    setFormattedCreatedAt(formattedDate);
  }, [likesCount, dislikeCount, props.id, props.created_at]);

  const updateLikeCount = () => {
    setLikeCount((count) => count + 1);
  };

  const updateDislikeCount = () => {
    setDislikeCount((count) => count + 1);
  };

  const toggleComments = () => {
    setShowComments((prevState) => !prevState); // Toggle the showComments state
  };

  return (
    <div className="Card">
        {/* // Check if the currently logged-in user is the same as the poster */}
        {username === props.poster ? (
          <Link to={`/${username}/edit/${props.id}`}>
            <img className="moreButton" alt="edit button" src={more} />
          </Link>
        ) : (
          <img className="moreButton" alt="edit button" src={more} />
        )}

      <h2 className="poster">{props.poster}</h2>
      <h3 className="title">{props.title}</h3>
      <h5 className="content">{props.content}</h5>
      <h5 className="created_at">{formattedCreatedAt}</h5>
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
      <button onClick={toggleComments}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <Comment 
          key={props.id} // Use post ID as the key
          post_id={props.id}
          commenter={username}
        />
      )}
    </div>
  );
};

export default Card;
