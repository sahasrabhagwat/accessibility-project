// stores all locations
let allLocations = [];


// load json and custom places
fetch('./accessibility.json')
  .then(res => res.json())
  .then(data => {

    allLocations = data.locations;

    const custom =
      JSON.parse(localStorage.getItem("accesspath_custom_places") || "[]");

    allLocations = [...allLocations, ...custom];

    showFavorites();
  });


// show favorite places
function showFavorites() {

  const favoriteIds =
    JSON.parse(localStorage.getItem("favoritePlaces") || "[]");

  const list =
    document.getElementById("favoritesList");

  list.innerHTML = "";

  const favorites =
    allLocations.filter(loc => favoriteIds.includes(loc.id));

  if (favorites.length === 0) {
    list.innerHTML = "<p>No favorite places yet.</p>";
    return;
  }

  favorites.forEach(location => {

    const li =
      document.createElement("li");

    li.className = "location-card";

    li.innerHTML = `
      <div class="location-title">${location.name}</div>
      <div class="location-type">${formatText(location.type)}</div>

      <button class="favorite-btn">
        Remove
      </button>
    `;

    // open details page
    li.onclick = () => {
      window.location.href = `details.html?id=${location.id}`;
    };

    // remove favorite
    li.querySelector(".favorite-btn").onclick = (event) => {
      event.stopPropagation();

      let favoriteIds =
        JSON.parse(localStorage.getItem("favoritePlaces") || "[]");

      favoriteIds =
        favoriteIds.filter(id => id !== location.id);

      localStorage.setItem(
        "favoritePlaces",
        JSON.stringify(favoriteIds)
      );

      showFavorites();
    };

    list.appendChild(li);
  });
}


// format text
function formatText(text) {
  if (!text) return "No";

  return text
    .replace(/_/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}