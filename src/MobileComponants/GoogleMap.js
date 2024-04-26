import React, { useEffect, useRef, useState } from 'react';
import "../MobileCSS/Popups.css"

const loadGoogleMapsScript = (callback) => {
  const existingScript = document.getElementById('googleMapsScript');
  if (!existingScript) {
    const script = document.createElement('script');
    const Google_API_key = process.env.REACT_APP_API_URL_GOOGLE_MAPS_API_KEY
    script.src = `https://maps.googleapis.com/maps/api/js?key=${Google_API_key}&libraries=&v=weekly`;
    script.id = 'googleMapsScript';
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }

  if (existingScript && callback) callback();
};

function findGeographicCentroid(locations) {
  let totalLat = 0;
  let totalLng = 0;
  let count = 0;

  locations.forEach(location => {
    if (location.postition && location.postition.Latitude && location.postition.Longitude) {
      totalLat += location.postition.Latitude;
      totalLng += location.postition.Longitude;
      count++;
    }
  });

  if (count === 0) {
    return null; // Return null if no valid positions found
  }

  const centroid = [
    totalLat / count,
    totalLng / count
  ];

  return centroid;
}

const GoogleMapProperties = ({locations}) => {
  const mapRef = useRef(null); // This ref will point to the map DOM element
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    loadGoogleMapsScript(() => setMapLoaded(true));
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      const initMap = async () => {
        const { Map } = await window.google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
        const center = { lat: 57.14589702347154, lng: -2.253011357843587 };
        const map = new Map(mapRef.current, {
          zoom: 9,
          center,
          mapId: "4504f8b37365c3d0",
        });

        locations.forEach((location) => {
          const marker = new AdvancedMarkerElement({
            map,
            content: buildContent(location),
            position: { lat: location.postition?.Latitude || 0, lng: location.postition?.Longitude || 0},
            title: location.Address,
          });

          marker.addListener("click", () => {
            toggleHighlight(marker, location);
          });
        });
      };

      initMap();
    }
  }, [mapLoaded, locations]); // Re-run when mapLoaded changes

  const toggleHighlight = (markerView, property) => {
    if (markerView.content.classList.contains("highlight")) {
      markerView.content.classList.remove("highlight");
      markerView.zIndex = null;
    } else {
      markerView.content.classList.add("highlight");
      markerView.zIndex = 1;
    }
  };



  const buildContent = (property) => {
    const content = document.createElement("div");

    content.classList.add("property");

    let imgSrc;
    switch (property.Type) {
      case 'flat':
        imgSrc = require('../Assets/apartments.png'); // Update path accordingly
        break;
      case 'semi-detached':
        imgSrc = require('../Assets/townhouse.png'); // Update path accordingly
        break;
      case 'terrace':
        imgSrc = require('../Assets/terrace.png'); // Update path accordingly
        break;
      case 'house':
        imgSrc = require('../Assets/house1.png'); // Update path accordingly
        break;
      default:
        imgSrc = 'path/to/default-image.png'; // Fallback image path
    }

    content.innerHTML = `
      <div class="icon">
          <img src="${imgSrc}" alt="${property.Type}" title="${property.Type}" style="width: 32px; height: 32px;">
          
      </div>
      <div class="details">
          <div class="price">£${property.PriceValue?.toLocaleString(undefined, { maximumFractionDigits: 2 }) || property.Status.Type +"-"+property.Status.datetime}</div>
          <div class="address">${property.Address}</div>
          <div class="features">
          <div>
              <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
              <span class="fa-sr-only">bedroom</span>
              <span>${property.Bedrooms}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
              <span class="fa-sr-only">bathroom</span>
              <span>${property.Bathrooms}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
              <span class="fa-sr-only">size</span>
              <span>${property.Space} m<sup>2</sup></span>
          </div>
          <div>
              <a href=${property.URL}>View</a>
              
              
          </div>
          </div>
      </div>
      `;
    return content;
  };

  return (
    <>
      
      <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
    </>
  );
};

export default GoogleMapProperties