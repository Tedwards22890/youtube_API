import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";
import {KEY} from "../../utils/LocalKey";
import {Link} from 'react-router-dom';

import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState();

  useEffect(() => {
    let mounted=true;
    if (mounted) {
      fetchSearchResults();
      }
    }, [token]);

    async function fetchSearchResults(query="halo+reach") {
      try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${query}&key=${KEY}&type=video&maxResults=5&part=snippet`);
        setVideos(response.data.items);
        console.log(response.data.items)
      } catch (error){
          console.log(error.message);
      }
    };

    const handleClick = (video) => {
      navigate(`Videos/${video.videoId}`, {
        state: {
          title: video.title,
          description: video.description
        }
      })
    };
    function handleSubmit(event) {
      event.preventDefault();
      fetchSearchResults(query)
    }
  

  return (
      <div className="form-group">
        <form onSubmit={handleSubmit} className="form-grid">
            <input type="text" placeholder="Search..." value={query} onChange={(event) => setQuery(event.target.value)}/>
            <button type="submit">Search</button>
        </form>

      <Link to="videos">Videos</Link>
      {videos.map((vid, i) => {
        return (
          <div key={i}>
            <center>
              <div className="grid-container">
                <Link to={`videos/${vid.id.videoId}`}><div className='grid-item'><img src={vid.snippet.thumbnails.high.url} alt="videos"></img></div></Link>
              </div>
            </center>
          </div>
        
      );
  })}
</div>
  )
}  




export default HomePage;