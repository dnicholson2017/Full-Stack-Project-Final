import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';



const ReadPost = (props) => {

    const [posts, setPosts] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const {data} = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: true })
          
            // set state of posts
            setPosts(data);
        }
        fetchPost()
        setPosts(props.data);
    }, [props]);
    
    return (
        <div className="ReadPosts">
            <Link to={`/${username}/post`}><button className="postBtn"> Post </button></Link>
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card key={index} id={post.id} poster={post.poster} content={post.content} likes={post.likes} dislikes={post.dislikes}/>
                ) : <h2>{'No Posts Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPost;