import React, { useState, useEffect } from "react";

import StationDesign from "../Station-Design";
import loadingImage from "../../images/sverige.jpg";
import "./style.css";

const URL = "http://api.sr.se/api/v2/channels?format=json&size=100";

const Station = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredText, setFilteredText] = useState("");
  const [stationsToShow, setStationsToShow] = useState([]);

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

  useEffect(
    stationsToShow => {
      let newStationsToShow = [];

      if (filteredText.length > 0) {
        newStationsToShow = channels.filter(radio => {
          return radio.name.toUpperCase().includes(filteredText.toUpperCase());
        });
      } else {
        newStationsToShow = channels;
      }

      if (stationsToShow !== newStationsToShow) {
        setStationsToShow(newStationsToShow);
      }
    },
    [channels, filteredText]
  );

  const onFilterTextChange = evt => {
    setFilteredText(evt.target.value);
  };

  if (stationsToShow.length > 0) {
    const radios = stationsToShow.map(item => (
      <StationDesign
        image={item.image}
        color={item.color}
        name={item.name}
        url={item.liveaudio.url}
      />
    ));

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
