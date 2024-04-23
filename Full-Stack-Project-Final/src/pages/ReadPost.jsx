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
        // Check the sorting criteria
        if (sortBy === 'likes') {
            // If sorting by likes, create a new array (to avoid mutating the original)
            // and sort it in descending order based on the number of likes
            return [...postsToSort].sort((a, b) => b.likes - a.likes);
        } else if (sortBy === 'dislikes') {
            // If sorting by dislikes, create a new array (to avoid mutating the original)
            // and sort it in descending order based on the number of dislikes
            return [...postsToSort].sort((a, b) => b.dislikes - a.dislikes);
        } else {
            // If sorting criteria is neither 'likes' nor 'dislikes',
            // simply return the original array without sorting
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
            {/* If search input bar is empty and filtered results has a length of zero meaning our filter didn't capture anything */}
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
