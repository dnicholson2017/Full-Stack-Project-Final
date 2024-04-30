import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client'
// import './EditPost.css'

const EditPost = ({data}) => {

    const { id } = useParams();
    const { username } = useParams();
    const navigate = useNavigate(); // Add this line to get the navigate function
    const [post, setPost] = useState({id: null, title: "", content:"" });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    // UPDATE post
    const updatePost = async (event) => {
        event.preventDefault();
    
        await supabase
            .from('Posts')
            .update({ title: post.title, content: post.content })
            .eq('id', id);
    
        navigate(`/${username}`);
    }

    // Delete post
    const deletePost = async (event) => {
        event.preventDefault();
    
        await supabase
            .from('Posts')
            .delete()
            .eq('id', id); 
    
        navigate(`/${username}`);
    }

    return (
        <div>
            <form>
                <label for="content">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br />
                <label for="content">Content</label> <br />
                <textarea rows="5" cols="50" id="content" name="content"  onChange={handleChange}>
                </textarea>                
                <br/>

                {/* <label for="author">Poster/User</label><br />
                <label for="author">{ post.poster }</label><br /> */}
                {/* <input type="text" id="author" name="author" onChange={handleChange} /><br /> */}
                {/* For this section it should just show the username of the poster */}
                <br/>
                <button type="submit" value="Submit" onClick={updatePost}>Edit</button>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost