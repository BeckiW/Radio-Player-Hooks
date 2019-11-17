import React, { useState, useEffect } from "react";

import StationDesign from "../Station-Design";
import loadingImage from "../../images/sverige.jpg";
import "./style.css";

const URL = "http://api.sr.se/api/v2/channels?format=json&size=100";

const Station = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(URL)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setChannels(json.channels);
      });
  }, []);

  const onFilterTextChange = evt => {
    setFilterText(evt.target.value);
  };

  let stationsToShow = [];

  if (filterText.length > 0) {
    stationsToShow = channels.filter(radio => {
      if (radio.name.toUpperCase().includes(filterText.toUpperCase())) {
        return setChannels(stationsToShow);
      } else {
        return false;
      }
    });
  }

  const radios = channels.map(item => (
    <StationDesign
      image={item.image}
      color={item.color}
      name={item.name}
      url={item.liveaudio.url}
    />
  ));

  if (channels.length > 0) {
    console.log(radios);
    return (
      <div className="station-list">
        <div className="filter-bar">
          <span>Filter Results: </span>
          <input
            type="text"
            id="station-filter"
            placeholder="Search..."
            onChange={onFilterTextChange}
          />
        </div>

        <section id="station-items">{radios}</section>
      </div>
    );
  } else {
    return (
      <div>
        <img className="loadingImage" alt="Loading..." src={loadingImage} />
      </div>
    );
  }
};

export default Station;
