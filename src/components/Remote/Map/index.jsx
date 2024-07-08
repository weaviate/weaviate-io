import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import styles from './styles.module.scss';
import peopleData from '/data/map.json';

const containerStyle = {
  width: '100%',
  height: '711px',
};

const center = {
  lat: 42.3601,
  lng: -71.0589,
};

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [
      { saturation: '32' },
      { lightness: '-3' },
      { visibility: 'on' },
      { weight: '1.18' },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'landscape',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'all',
    stylers: [{ saturation: '-70' }, { lightness: '14' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{ saturation: '100' }, { lightness: '-14' }],
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }, { lightness: '12' }],
  },
];

export default function Map() {
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState(null);
  const [customIcon, setCustomIcon] = useState(null);

  useEffect(() => {
    setPeople(peopleData);
  }, []);

  const handleLoad = () => {
    setCustomIcon({
      url: '/img/site/weaviate-pin-white-border.svg',
      scaledSize: new window.google.maps.Size(50, 50),
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
              options={{ styles: mapStyles }}
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
