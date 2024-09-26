document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map-container');
    const mapElement = document.getElementById('map');
    const searchBox = document.getElementById('search-box');
    const searchButton = document.getElementById('search-button');
    const toggleButton = document.getElementById('toggle-map');

    // Inicializar el mapa
    const map = new google.maps.Map(mapElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    // Geolocalización del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
        }, () => {
            handleLocationError(true, map.getCenter());
        });
    } else {
        // El navegador no soporta geolocalización
        handleLocationError(false, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, pos) {
        console.log(browserHasGeolocation ? 
            "Error: El servicio de geolocalización falló." : 
            "Error: Tu navegador no soporta geolocalización.");
    }

    // Añadir funcionalidad de búsqueda
    const searchBoxInput = new google.maps.places.SearchBox(searchBox);

    map.addListener('bounds_changed', () => {
        searchBoxInput.setBounds(map.getBounds());
    });

    searchButton.addEventListener('click', () => {
        const places = searchBoxInput.getPlaces();

        if (places.length == 0) {
            return;
        }

        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });

    // Funcionalidad para ocultar/mostrar el mapa
    toggleButton.addEventListener('click', () => {
        if (mapContainer.style.display === 'none') {
            mapContainer.style.display = 'block';
            toggleButton.textContent = 'Ocultar Mapa';
        } else {
            mapContainer.style.display = 'none';
            toggleButton.textContent = 'Mostrar Mapa';
        }
    });
});
