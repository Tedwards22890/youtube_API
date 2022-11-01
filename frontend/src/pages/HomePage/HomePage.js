import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([])
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted=true;
    if (mounted) {
      fetchSearchResults();
      }
    }, [token]);

    async function fetchSearchResults(query="Halo", KEY="AIzaSyAYsQ8hijKDgFdCpsasYOnOqRv-FoL7SGQ") {
      try {
        let response = await axios.get(`http://googleapis.com/youtube/v3/search?q=${query}&key=${KEY}&type=video&maxResults=5&part=snippet`);
        setVideos(response.data.items);
        console.log(response.data.items)
      } catch (error){
          console.log(error.message);
      }
    };

    const handleClick = (video) => {
      navigate(`ViewVideo/${video.videoId}`, {
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
    <div className="container">
      <div className="form-group">
        <form onSubmit={handleSubmit} className="form-grid">
            <input type="text" placeholder="Name" value={query} onChange={(event) => setQuery(event.target.value)}/>
            <button type="submit">Search</button>
        </form>
      </div>
      {fetchSearchResults}
    </div>
    


  );
};


export default HomePage;