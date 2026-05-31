let allLocations = [];
// this will store every location from the json file

let filteredLocations = [];
// this will store only the locations that match filters and search

let map;
// stores the leaflet map

let markers = [];
// stores all marker objects


// fetch the json file and turn it into usable javascript
fetch('./accessibility.json')
  .then(res => res.json())
  .then(data => {

    // save all locations from the json into this variable
    allLocations = data.locations;

    // merge custom places from localStorage
    const custom = JSON.parse(localStorage.getItem("accesspath_custom_places") || "[]");

    allLocations = [...allLocations, ...custom];

    // at the start nothing is filtered so we show everything
    filteredLocations = allLocations;

    // build checkbox filters based on accessibility features
    setupFilters();

    // build dropdown filter based on location types
    setupDropdown();

    // listen for typing in the search bar
    document.getElementById("searchInput").addEventListener("input", applyFilters);

    // listen for dropdown changes
    document.getElementById("categoryDropdown").addEventListener("change", applyFilters);

    // listen for slider changes
    document.getElementById("minScore").addEventListener("input", applyFilters);

    // update score text beside slider
    document.getElementById("minScore").addEventListener("input", () => {
      document.getElementById("scoreValue").textContent =
        document.getElementById("minScore").value;
    });

    // show the full list on first load
    displayList(filteredLocations);

    // create map
    initMap();
  });


// create checkbox filters based on accessibility needs
function setupFilters() {

  const typeContainer = document.getElementById("typeFilters");
  // this is where all checkboxes go

  const filters = [
    "wheelchair accessible entrance",
    "accessible parking",
    "accessible restrooms",
    "ramp or level entry",
    "elevator",
    "wheelchair paths",
    "quiet spaces",
    "low noise level",
    "natural lighting",
    "bright lighting",
    "staff assistance",
    "written signage",
    "digital resources",
    "asl available",
    "braille available"
  ];
  // expanded accessibility filters

  filters.forEach(type => {

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = type;

    checkbox.addEventListener("change", applyFilters);
    // re-run filtering whenever clicked

    label.appendChild(checkbox);
    label.append(" " + type);

    typeContainer.appendChild(label);
    typeContainer.appendChild(document.createElement("br"));
  });
}


// create dropdown options
function setupDropdown() {

  const dropdown = document.getElementById("categoryDropdown");

  const categories = [...new Set(allLocations.map(loc => loc.type))];
  // get all unique location types

  categories.forEach(category => {

    const option = document.createElement("option");

    option.value = category;
    option.textContent = category;

    dropdown.appendChild(option);
  });
}


// main filtering function
function applyFilters() {

  const searchText =
    document.getElementById("searchInput").value.toLowerCase();

  const selectedCategory =
    document.getElementById("categoryDropdown").value;

  const minScore =
    parseInt(document.getElementById("minScore").value);

  const selectedFilters =
    [...document.querySelectorAll('#typeFilters input:checked')]
      .map(cb => cb.value);

  filteredLocations = allLocations.filter(location => {

    const matchesSearch =
      location.name.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      location.type === selectedCategory;

    const score =
      getOverallScore(location);

    const matchesScore =
      score >= minScore;

    const mobility =
      location.accessibility.mobility || {};

    const sensory =
      location.accessibility.sensory || {};

    const communication =
      location.accessibility.communication || {};

    const matchesAccessibility =
      selectedFilters.length === 0 ||
      selectedFilters.every(filter => {

        if (filter === "wheelchair accessible entrance")
          return mobility.wheelchair_accessible_entrance === true;

        if (filter === "accessible parking")
          return mobility.accessible_parking === true;

        if (filter === "accessible restrooms")
          return mobility.accessible_restrooms === true;

        if (filter === "ramp or level entry")
          return mobility.ramp_or_level_entry === true;

        if (filter === "elevator")
          return mobility.elevator === true;

        if (filter === "wheelchair paths")
          return mobility.wheelchair_paths === true;

        if (filter === "quiet spaces")
          return sensory.quiet_spaces === true;

        if (filter === "low noise level")
          return sensory.noise_level === "low";

        if (filter === "natural lighting")
          return sensory.lighting === "natural";

        if (filter === "bright lighting")
          return sensory.lighting === "bright";

        if (filter === "staff assistance")
          return communication.staff_assistance === true;

        if (filter === "written signage")
          return communication.written_signage === true;

        if (filter === "digital resources")
          return communication.digital_resources === true;

        if (filter === "asl available")
          return communication.asl_available === "yes" ||
                 communication.asl_available === "on_request";

        if (filter === "braille available")
          return communication.braille_available === "partial";

        return true;
      });

    return (
      matchesSearch &&
      matchesCategory &&
      matchesScore &&
      matchesAccessibility
    );
  });

  // update list
  displayList(filteredLocations);

  // update map markers
  updateMap();
}


// display list of locations
function displayList(locations) {

  const list =
    document.getElementById("locationList");

  list.innerHTML = "";

  const counter =
    document.getElementById("resultsCount");

  // favorites count
  const favoriteCount =
    JSON.parse(localStorage.getItem("favoritePlaces") || "[]").length;

  // compare count
  const compareCount =
    JSON.parse(localStorage.getItem("comparePlaces") || "[]").length;

  if (counter) {
    counter.textContent =
      `${locations.length} places shown • ${favoriteCount} favorites saved • ${compareCount} compare places`;
  }

  locations.forEach(location => {

    const li =
      document.createElement("li");

    const overall =
      getOverallScore(location);

    const color =
      getScoreColor(overall);

    // favorites
    let favorites =
      JSON.parse(localStorage.getItem("favoritePlaces") || "[]");

    const isFavorite =
      favorites.includes(location.id);

    // compare
    let compare =
      JSON.parse(localStorage.getItem("comparePlaces") || "[]");

    const isCompare =
      compare.includes(location.id);

    li.className = "location-card";

    li.innerHTML = `
      <div class="location-title">${location.name}</div>

      <div class="location-type">
        ${formatText(location.type)}
      </div>

      <div style="color:${color}; font-weight:bold;">
        Overall: ${overall}
      </div>

      <div class="button-row">

        <button class="favorite-btn">
          ${isFavorite ? "★ Remove Favorite" : "☆ Add Favorite"}
        </button>

        <button class="compare-btn">
          ${isCompare ? "✓ Added To Compare" : "+ Add To Compare"}
        </button>

      </div>
    `;

    // details page
    li.onclick = () => {
      window.location.href =
        `details.html?id=${location.id}`;
    };

    // favorite button
    li.querySelector(".favorite-btn").onclick = (event) => {

      event.stopPropagation();

      let favorites =
        JSON.parse(localStorage.getItem("favoritePlaces") || "[]");

      if (favorites.includes(location.id)) {

        favorites =
          favorites.filter(id => id !== location.id);

      } else {

        favorites.push(location.id);
      }

      localStorage.setItem(
        "favoritePlaces",
        JSON.stringify(favorites)
      );

      displayList(filteredLocations);
    };

    // compare button
    li.querySelector(".compare-btn").onclick = (event) => {

      event.stopPropagation();

      let compare =
        JSON.parse(localStorage.getItem("comparePlaces") || "[]");

      if (compare.includes(location.id)) {

        compare =
          compare.filter(id => id !== location.id);

      } else {

        if (compare.length >= 3) {
          alert("You can only compare up to 3 places.");
          return;
        }

        compare.push(location.id);
      }

      localStorage.setItem(
        "comparePlaces",
        JSON.stringify(compare)
      );

      displayList(filteredLocations);
    };

    list.appendChild(li);
  });
}


// show details page logic
function showDetails(id) {
  const location =
    allLocations.find(l => l.id === id);
}


// go back function
function goBack() {
  document.getElementById("listView").style.display = "block";
  document.getElementById("detailsView").style.display = "none";
}


// scoring functions
function scoreValue(value) {
  if (value === true) return 100;
  if (value === false) return 0;
  if (value === "partial") return 50;
  if (value === "unknown" || value === "No") return 0;
  return 0;
}

function formatText(text) {
  if (!text) return "No";

  return text
    .replace(/_/g, " ") // turn underscores into spaces
    .replace(/\b\w/g, char => char.toUpperCase()); // capitalize each word
}

function average(arr) {
  const valid = arr.filter(n => !isNaN(n));
  return valid.length
    ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length)
    : 0;
}

function getMobilityScore(location) {
  const m = location.accessibility.mobility || {};
  return average([
    m.wheelchair_accessible_entrance,
    m.accessible_parking,
    m.accessible_restrooms,
    m.ramp_or_level_entry,
    m.elevator,
    m.wheelchair_paths
  ].map(scoreValue));
}

function getSensoryScore(location) {

  const s = location.accessibility.sensory || {};

  let noiseScore = 50;

  if (s.noise_level === "low") {
    noiseScore = 100;
  }
  else if (s.noise_level === "medium") {
    noiseScore = 70;
  }
  else if (s.noise_level === "varies") {
    noiseScore = 40;
  }
  else if (s.noise_level === "high") {
    noiseScore = 10;
  }

  let lightingScore = 50;

  if (s.lighting === "natural") {
    lightingScore = 100;
  }
  else if (s.lighting === "bright") {
    lightingScore = 70;
  }
  else if (s.lighting === "dim") {
    lightingScore = 40;
  }

  return average([
    scoreValue(s.quiet_spaces),
    noiseScore,
    lightingScore
  ]);
}


function getCommunicationScore(location) {
  const c = location.accessibility.communication || {};
  return average([
    c.staff_assistance,
    c.written_signage,
    c.digital_resources,
    c.asl_available === "yes",
    c.braille_available === "partial"
  ].map(scoreValue));
}

function getOverallScore(location) {
  return Math.round((
    getMobilityScore(location) +
    getSensoryScore(location) +
    getCommunicationScore(location)
  ) / 3);
}

function getScoreColor(score) {
  if (score >= 70) return "green";
  if (score >= 40) return "orange";
  return "red";
}


// map functions
function initMap() {
  if (!document.getElementById("map")) return;

  map = L.map("map").setView([37.638, -77.620], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'openstreetmap'
  }).addTo(map);

  updateMap();
}

function updateMap() {
  if (!map) return;

  markers.forEach(m => map.removeLayer(m));
  markers = [];

  filteredLocations.forEach(location => {

    if (!location.lat || !location.lng) return;

    const marker =
      L.marker([location.lat, location.lng]).addTo(map);

    marker.bindPopup(`
      <b>${location.name}</b><br>
      ${location.type}
    `);

    markers.push(marker);
  });
}

function formatBool(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  if (value === "partial") return "Partial";
  if (value === "unknown") return "Unknown";
  return value || "No";
}