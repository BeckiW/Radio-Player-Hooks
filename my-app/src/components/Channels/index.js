import React, { useState, useEffect } from "react";

import StationDesign from "../station-design";

const URL = "http://api.sr.se/api/v2/channels?format=json&size=100";

const Station = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(URL)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setChannels(json.channels);
      });
  }, [input]);

  return (
    <div>
      {channels.map(item => (
        <StationDesign
          image={item.image}
          color={item.color}
          name={item.name}
          url={item.liveaudio.url}
        />
      ))}
    </div>
  );
};

export default Station;
