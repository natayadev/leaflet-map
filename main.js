var map = L.map('map').
    setView([0, 0],
        16);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16
}).addTo(map);

L.control.scale().addTo(map);

var initialMarker = L.marker([0, 0], { draggable: true }).addTo(map).bindPopup("<b>Marcador</b>");

L.Control.geocoder({
    defaultMarkGeocode: false,
    placeholder: "Buscar...",
    geocoder: L.Control.Geocoder.nominatim(
        // {
        //     geocodingQueryParams: {
        //         bounded: 1,
        //         viewbox: '-58.5307,-34.7051,-58.3359,-34.5277',  // Coordenadas delimitadoras de CABA
        //         countrycodes: 'AR'

        //     }
        // }
        )
}).on('markgeocode', function (e) {
    var latlng = e.geocode.center;
    console.log("Ubicación encontrada: " + latlng.lat + ', ' + latlng.lng);
    map.setView(latlng, 16);
    initialMarker.setLatLng(latlng);
}).addTo(map);

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            var latlng = L.latLng(position.coords.latitude, position.coords.longitude);
            console.log("Ubicación inicial: " + latlng.lat + ', ' + latlng.lng);
            map.setView(latlng, 16);

            initialMarker.setLatLng(latlng);
        },
        function (error) {
            console.error('Error al obtener la ubicación: ' + error.message);
        }
    );
} else {
    console.error('Geolocalización no compatible');
}

initialMarker.on('dragend', function (event) {
    var markerLatLng = initialMarker.getLatLng();
    console.log("Ubicación nueva: " + markerLatLng.lat + ', ' + markerLatLng.lng);
});

