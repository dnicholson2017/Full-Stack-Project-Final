import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ReadPost = () => {
    const [posts, setPosts] = useState([]);
    const [filterResults, setFilterResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const { username } = useParams();


    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Error fetching posts:', error.message);
                return;
            }

            setPosts(data);
        }

        fetchPosts();
    }, []);
    
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);

        if (searchValue !== "") {
            const filteredData = posts.filter((item) => {
                const user = item.poster;
                return user.toLowerCase().includes(searchValue.toLowerCase());
            });
            setFilterResults(filteredData);
        } else {
            setFilterResults([]);
        }
    };

    const handleSortChange = (e) => {
        const selectedSortBy = e.target.value;
        setSortBy(selectedSortBy);
    };

    const sortPosts = (postsToSort) => {
        if (sortBy === 'likes') {
            return [...postsToSort].sort((a, b) => b.likes - a.likes);
        } else if (sortBy === 'dislikes') {
            return [...postsToSort].sort((a, b) => b.dislikes - a.dislikes);
        } else {
            return postsToSort;
        }
    };

    const sortedPosts = sortPosts(filterResults.length > 0 ? filterResults : posts);

    return (
        <div className="ReadPosts">
            <div className='sign-out'>
                <Link to={'/'}>
                    <button>Sign-Out</button>
                </Link>
            </div>
            <Link to={`/${username}/post`}><button className="postBtn"> Post </button></Link>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => searchItems(e.target.value)}
            />
            <select onChange={handleSortChange}>
                <option disabled selected>Sort By...</option>
                <option value="likes">Likes</option>
                <option value="dislikes">Dislikes</option>
            </select>
            {(searchInput !== "" && filterResults.length === 0) ? (
                <div>No results found</div>
            ) : (
                <>
                    {sortedPosts.map((post) => (
                        <Card
                            key={post.id} // Use post ID as the key
                            id={post.id}
                            created_at={post.created_at}
                            title={post.title}
                            poster={post.poster}
                            content={post.content}
                            likes={post.likes}
                            dislikes={post.dislikes}
                        />
                    ))}
                </>

            )}

        </div>
    )
}

export default ReadPost;
