import { CRS } from 'leaflet';
import { FC } from 'react';
import { ImageOverlay, MapContainer, Marker } from 'react-leaflet';
import { floorBounds, floorCenter, floors, placeMarkers } from '../data';

export interface Props {
    url: string;
    onMarkerClick: (place: string) => void;
}

export const Map: FC<Props> = ({ url, onMarkerClick }) => {
    const markers = placeMarkers
        .filter(({ floor }) => floors[floor].value === url)
        .map(({ place, position }, key) => (
            <Marker
                key={key}
                position={position}
                eventHandlers={{
                    click: () => onMarkerClick(place),
                }}
            />
        ));

    return (
        <MapContainer
            crs={CRS.Simple}
            center={floorCenter}
            zoom={0}
            minZoom={-2}
            maxZoom={1}
            zoomControl={false}
            attributionControl={false}
            style={{
                height: '100vh',
                zIndex: 1,
            }}
            maxBounds={floorBounds}
        >
            <ImageOverlay url={url} bounds={floorBounds} />
            {markers}
        </MapContainer>
    );
};
