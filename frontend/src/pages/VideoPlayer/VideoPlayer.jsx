import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { KEY } from "../../utils/LocalKey";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./VideoPlayer.css";

const VideoPlayer = ( props ) => {
  const [videos, setVideos] = useState(null);
  const [user, token] = useAuth();
  const { vidId } = useParams();
  const location = useLocation();
  console.log(location)

  useEffect(() => {
    // let mounted=true;
    // if (mounted) {
    //   fetchSearchResults();
    //   }
  }, []);


  async function fetchSearchResults() {
    try {
      let response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${vidId}&type=video&key=${KEY}&maxResults=5&part=snippet`
      );
      setVideos(response.data.items);
      console.log(response.data.items);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <p>This is the video page</p>
      <p>Title: {props.currentVideo.snippet.title}</p>
      <p>This is the Video ID: {vidId}</p>

      <p>
        <iframe
          id="ytplayer"
          type="text/html"
          title="play"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${vidId}?autoplay=1`}
          frameborder="0"
        ></iframe>
      </p>
      
      <p> Description: {props.currentVideo.snippet.description}</p>
      <button onClick={()=>{fetchSearchResults()}}>Click for Related</button>
      {videos &&
        videos.map((vid, i) => {
          return (
            <div key={i}>
              <center>
                <div className="grid-container">
                  <Link to={`/video/${vid.id.videoId}`}>
                    <div className="grid-item">
                      <br></br>
                      {vid.snippet.title}
                      <br/>
                      <img
                        src={vid.snippet.thumbnails.medium.url}
                        alt="videos"
                      ></img>
                      <br></br>
                    </div>
                  </Link>
                </div>
              </center>
            </div>
          );
        })}
    </div>
  );
};
export default VideoPlayer;
