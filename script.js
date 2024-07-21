document.addEventListener('DOMContentLoaded', () => {
    function initMap() {
        const map = new MapLibrary.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });

        const customPlaces = [
            { lat: -34.397, lng: 150.644, name: 'Place 1' },
            { lat: -34.400, lng: 150.650, name: 'Place 2' }
        ];

        customPlaces.forEach(place => {
            new MapLibrary.Marker({
                position: { lat: place.lat, lng: place.lng },
                map: map,
                title: place.name
            });
        });

        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(userLocation);

            const nearbyPlaces = customPlaces.filter(place => {
                const distance = Math.sqrt(
                    Math.pow(userLocation.lat - place.lat, 2) +
                    Math.pow(userLocation.lng - place.lng, 2)
                );
                return distance < 0.05;
            });

            nearbyPlaces.forEach(place => {
                new MapLibrary.Marker({
                    position: { lat: place.lat, lng: place.lng },
                    map: map,
                    title: place.name
                });
            });
        });
    }
    
    if (typeof MapLibrary !== 'undefined') {
        initMap();
    }
});