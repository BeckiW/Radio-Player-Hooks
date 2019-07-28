import React, { useEffect, useState } from "react";
import StationDesign from "../station-design";
import "./style.css";

import loadingImage from "../../images/sverige.jpg";

const URL = "http://api.sr.se/api/v2/channels?format=json&size=100";

const StationList = () => {
  const [radios, setRadios] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(URL)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setRadios(json.channels);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    onFilterTextChange();
  }, [filterText]);

  onFilterTextChange = evt => {
    this.filterText = evt.target.value;
    this.forceUpdate();
  };

  let stationsToShow = [];

  if (this.filterText.length > 0) {
    stationsToShow = this.state.radios.filter(radio => {
      if (radio.name.toUpperCase().includes(this.filterText.toUpperCase())) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    stationsToShow = this.state.radios;
  }

  const radios = stationsToShow.map(radio => (
    <StationDesign
      name={radio.name}
      image={radio.image}
      color={radio.color}
      url={radio.liveaudio.url}
    />
  ));

  if (radios.length > 0) {
    return (
      <div className="station-list">
        <div className="filter-bar">
          <span>Filter Results: </span>
          <input
            type="text"
            id="station-filter"
            placeholder="Search..."
            onChange={this.onFilterTextChange}
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

export default StationList;
