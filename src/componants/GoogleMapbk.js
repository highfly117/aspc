import React, { useEffect, useRef, useState } from 'react';

const GOOGLE_MAPS_API_KEY = "AIzaSyAJiDxL5x2vUHgH77_f6WOyAIVRacWUWFI"; // Replace with your actual API key
const MAP_SCRIPT_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;

const GoogleMapProperties = ({ locations }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Dynamically load the Google Maps script
  const loadGoogleMapsScript = () => {
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = MAP_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => initializeMap();
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!window.google || !window.google.maps || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 57.14589702347154, lng: -2.113011357843587 },
      zoom: 4,
    });
    setMap(map);
  };

  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (!map || !locations) return;

    // Clear existing markers from the map
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]); // Reset markers state

    const newMarkers = [];
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach(location => {
      // Check if 'postition' exists and has valid 'Latitude' and 'Longitude'
      if (location.postition && typeof location.postition.Latitude === 'number' && typeof location.postition.Longitude === 'number') {
        const position = { lat: location.postition.Latitude, lng: location.postition.Longitude };

        // Create a marker for each valid location
        const marker = new window.google.maps.Marker({
          position,
          map, // Assuming 'map' is your Google Map instance
        });

        newMarkers.push(marker);
        if(locations === 0) bounds.extend(position);
      }
    });

    if (bounds && !bounds.isEmpty()) {
      map.fitBounds(bounds);
    } else {
      // Optionally, set a default position and zoom for the map
      map.setCenter({lat: 57.14589702347154, lng: -2.113011357843587});
      map.setZoom(7);
    }

    // Update markers state with new markers
    setMarkers(newMarkers);
  }, [map, locations]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default GoogleMapProperties;
