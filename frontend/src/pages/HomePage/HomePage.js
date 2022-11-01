import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
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

    async function fetchSearchResults(query="Halo") {
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
    


  );
}


export default HomePage;