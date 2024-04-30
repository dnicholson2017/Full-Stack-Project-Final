import React, { useState } from "react";
import { supabase } from '../client';
import { useParams, useNavigate } from 'react-router-dom';

const CreatePost = () => {

    const { username } = useParams();
    const navigate = useNavigate(); // Add this line to get the navigate function

    // first create state variables that will have the state of the required data to be sent to supabase
    const [post, setPost] = useState({poster:username, title: "", content:"", likes:0, dislikes:0 });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
    
        try {
            const { data, error } = await supabase
                .from('Posts')
                .insert({ poster: post.poster, title: post.title, content: post.content, likes: post.likes, dislikes: post.dislikes })
                .select();
    
            if (error) {
                throw error;
            }
    
            console.log('Post created successfully:', data);
        } catch (error) {
            console.error('Error creating post:', error.message);
        }
        // If there are 401 errors in a supabase project ensure that you investigate RLS (Row Level Security) status.
        // It is likely the reason you can't make changes to the table

        // Returns us to home page after submitting
        // window.location = `/${username}`;
        // Navigate to the user's page after successful post creation
        navigate(`/${username}`);
        console.log('Submit clicked');
        console.log(post);
        console.log(supabase);
    }

    return (
        <div>
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br />
                <label for="content">Content</label> <br />
                <textarea rows="5" cols="50" id="content" name="content"  onChange={handleChange}>
                </textarea>                
                <br/>

                <label for="author">Poster/User</label><br />
                <label for="author">{ post.poster }</label><br />
                {/* <input type="text" id="author" name="author" onChange={handleChange} /><br /> */}
                {/* For this section it should just show the username of the poster */}
                <br/>

                <input type="submit" value="Submit" onClick={createPost} />
                
            </form>
        </div>
    )
}

export default CreatePost;