// create leaflet map
const map = L.map('map').setView([37.6500, -77.6200], 11);


// load map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; openstreetmap contributors'
}).addTo(map);


// fetch location data
fetch('./accessibility.json')
  .then(res => res.json())
  .then(data => {

    data.locations.forEach(location => {

      // skip locations without coordinates
      if (!location.lat || !location.lng) return;


      // create marker
      const marker = L.marker([
        location.lat,
        location.lng
      ]).addTo(map);


      // popup content
      marker.bindPopup(`
        <h3>${location.name}</h3>

        <p>${location.type}</p>

        <a href="details.html?id=${location.id}">
          view details
        </a>
      `);
    });
  });