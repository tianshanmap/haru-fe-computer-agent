import { useState, useEffect } from 'react';
import styles from "./video_list.module.css";
import {
  getVideoList,
  getViewEndPoint,
  deleteFile,
} from "../api/api_service_8080";
import { 
        bytesToMB,
      } from "../api/utils";

const VideoList = ({onExit}) => {
  // let selected_audio = [];
  const [data, setData] = useState({files:[]});
  const [filename, setFilename] = useState("");
  const [isPlayer,setIsPlayer] = useState(false);
  const [isList,setIsList] = useState(true);

  useEffect(() => {
    // 1. Declare the async function inside the effect
    const fetchData = async () => {
      try {
        const result = await getVideoList();
        setData(result); // 2. Update state to trigger re-render
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    // 3. Call the function immediately
    console.log("VideoList::useEffect is called");
    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handlePlay = (event) => {
    setFilename(event.target.getAttribute("src"));
    setIsPlayer(true);
    setIsList(false)
  }
  const handleExit = (event) => {
    setIsPlayer(false);
    setIsList(true)
  }
  const handleDelete = async (event) => {
    const filename = event.target.getAttribute("src");
    console.log("handleDelete filename=" + filename);
    const response = await deleteFile(filename);
    console.log("handleDelete response=" + JSON.stringify(response.files));
    setData(response);
    setIsPlayer(false);
    setIsList(true)
  }
  return (
        <div className={styles.audio_profile_container}>
          {isPlayer && 
            <div className={styles.video_player}>
                <video width="1000" controls>
                    <source src={getViewEndPoint(filename)} type="video/mp4"></source>
                </video>
                <button className={styles.audio_button} onClick={handleExit}>Exit</button> 
            </div>
           }
           {isList &&
              <table className={styles.audio_table}>
              <thead>
                  <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  </tr>
              </thead>
              <tbody>
                  {/* 2. Use .map() to loop through the array and return table rows */}
                  {data.files.map((item) => (
                  <tr>
                      <td>{item.name}</td>
                      <td>
                        {bytesToMB(item.size)}
                      </td>
                      <td>
                        <button className={styles.audio_button} onClick={handlePlay} src={item.path}>Play</button>&nbsp;&nbsp;
                        <button className={styles.audio_button} onClick={handleDelete} src={item.path}>Delete</button>
                      </td>
                  </tr>
                  ))}
              </tbody>
              </table>
           }
        </div>
    );
};
export default VideoList; 