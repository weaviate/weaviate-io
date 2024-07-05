import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import styles from './styles.module.scss';
import peopleData from '/data/map.json'; // adjust the path as necessary

const containerStyle = {
  width: '100%',
  height: '711px',
};

const center = {
  lat: 42.3601,
  lng: -71.0589,
};

export default function Map() {
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState(null);
  const [customIcon, setCustomIcon] = useState(null);

  useEffect(() => {
    setPeople(peopleData);
  }, []);

  const handleLoad = () => {
    setCustomIcon({
      url: '/img/site/weaviate-logo-icon.svg', // Path to your custom icon
      scaledSize: new window.google.maps.Size(50, 50), // Scale size (width, height)
    });
  };

  return (
    <div className={styles.mapsContainer}>
      <div className={styles.box}>
        <div className={styles.mapLogos}>
          <LoadScript
            googleMapsApiKey="AIzaSyCITMKf5AjdwRBY_U7LXkaljJN0olnbsck"
            onLoad={handleLoad}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={2}
            >
              {people.map((person, index) => (
                <Marker
                  key={index}
                  position={person.location}
                  icon={customIcon}
                  onClick={() => setSelected(person)}
                />
              ))}
              {selected && (
                <InfoWindow
                  position={selected.location}
                  onCloseClick={() => setSelected(null)}
                >
                  <div className={styles.infoCard}>
                    {selected.photo && (
                      <img
                        src={'/img/people/team/' + selected.photo}
                        alt={selected.name}
                        style={{
                          borderRadius: '50%',
                          width: '100px',
                          height: '100px',
                        }}
                      />
                    )}
                    <h3>{selected.name}</h3>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
        <div className={styles.mapBox}>
          <h2>Weaviate around the world</h2>
          <p>
            As a remote company with distributed teams, we embrace the
            flexibility that comes from allowing our employees to live wherever
            they choose around the globe. Have a look where our people are
            living.
          </p>
        </div>
      </div>
    </div>
  );
}
