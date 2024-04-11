import React, { useState, useEffect } from "react";
import { supabase } from '../client';

const Comment = (props) => {

    const [comment, setComment] = useState({post_id: props.post_id, content: "", commenter: props.commenter});
    const [readComment, setReadComment] = useState([])

    const handleChange = (event) => {
        const {name, value} = event.target;
        setComment( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createComment = async (event) => {
        event.preventDefault();
    
        try {
            const { data, error } = await supabase
                .from('Comments')
                .insert({ post_id: comment.post_id, content: comment.content, commenter: comment.commenter })
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
        // window.location = `/${props.username}`;
        console.log('Submit clicked');
        console.log(comment);
        console.log(supabase);
    }

    useEffect(() => {
        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('Comments')
                .select()
                .eq('post_id', props.post_id)
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Error fetching posts:', error.message);
                return;
            }

            setReadComment(data);
            console.log(data)
        }

        fetchComments();
    }, [readComment]);

    return (
        <div>
            {/* <input type="text" name="comment" id="comment"/> */}

            <textarea  rows="5" cols="20" id="content" name="content" onChange={handleChange}>
            </textarea>

            <input type="submit" value="Submit" onClick={createComment} />
            <div>
                {
                    readComment && readComment.map((item, index) => (
                        <div>
                            <h3 key={index}>{item.content}</h3>
                            <h4>{item.commenter}</h4>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Comment;