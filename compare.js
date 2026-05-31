// stores all locations from the json file
// starts as an empty array until the json loads
let allLocations = [];


// fetch the json file
// this reads accessibility.json from the project folder
fetch('./accessibility.json')

  // convert the response into usable json data
  .then(res => res.json())

  // once the json loads, run this function
  .then(data => {

    // save all locations from the json file
    // data.locations comes from the json structure
    allLocations = data.locations;

    // load custom places from localStorage
    // if nothing exists, use an empty array instead
    const custom =
      JSON.parse(localStorage.getItem("accesspath_custom_places") || "[]");

    // combine json locations and custom user-added locations
    // ... spreads both arrays into one large array
    allLocations = [...allLocations, ...custom];

    // call the compare rendering function
    // this builds the table on the page
    renderCompare();
  });


// function to build and display the compare table
function renderCompare() {

  // get saved compare place ids from localStorage
  // if none exist, use an empty array
  const compareIds =
    JSON.parse(localStorage.getItem("comparePlaces") || "[]");

  // find only the locations whose ids are in compareIds
  // filter loops through every location
  const selected =
    allLocations.filter(loc => compareIds.includes(loc.id));

  // get the html container where the table will appear
  const container =
    document.getElementById("compareTable");

  // if no places are selected for compare
  if (selected.length === 0) {

    // show a message instead of a table
    container.innerHTML =
      `<p>No places selected for comparison.</p>`;

    // stop the function early
    return;
  }

  // start building the table html
  // backticks allow multiline html strings
  let html = `
    <table class="compare-table">

      <tr>
        <th>Feature</th>
  `;

  // loop through each selected place
  // create a table header column for each one
  selected.forEach(place => {

    // add location name and remove button
    html += `
      <th>
        ${place.name}

        <br><br>

        <button class="remove-btn"
          onclick="removeCompare('${place.id}')">
          Remove
        </button>
      </th>
    `;
  });

  // close the first row
  html += `</tr>`;

  // begin table rows
  // each row compares one feature across all places

  html += `

    <!-- CATEGORY ROW -->
    <tr>

      <!-- first column label -->
      <td>Category</td>

      <!-- create a td for every selected place -->
      ${selected.map(p =>

        // format the type nicely
        `<td>${formatText(p.type)}</td>`

      ).join("")}
    </tr>


    <!-- OVERALL SCORE ROW -->
    <tr>
      <td>Overall Score</td>

      ${selected.map(p =>

        // calculate overall accessibility score
        `<td>${getOverallScore(p)}</td>`

      ).join("")}
    </tr>


    <!-- MOBILITY SCORE ROW -->
    <tr>
      <td>Mobility Score</td>

      ${selected.map(p =>

        // calculate mobility score
        `<td>${getMobilityScore(p)}</td>`

      ).join("")}
    </tr>


    <!-- SENSORY SCORE ROW -->
    <tr>
      <td>Sensory Score</td>

      ${selected.map(p =>

        // calculate sensory score
        `<td>${getSensoryScore(p)}</td>`

      ).join("")}
    </tr>


    <!-- COMMUNICATION SCORE ROW -->
    <tr>
      <td>Communication Score</td>

      ${selected.map(p =>

        // calculate communication score
        `<td>${getCommunicationScore(p)}</td>`

      ).join("")}
    </tr>


    <!-- WHEELCHAIR ENTRANCE ROW -->
    <tr>
      <td>Wheelchair Entrance</td>

      ${selected.map(p =>

        // show yes/no for wheelchair entrance
        `<td>${formatBool(
          p.accessibility.mobility.wheelchair_accessible_entrance
        )}</td>`

      ).join("")}
    </tr>


    <!-- ACCESSIBLE PARKING ROW -->
    <tr>
      <td>Accessible Parking</td>

      ${selected.map(p =>

        // show parking accessibility
        `<td>${formatBool(
          p.accessibility.mobility.accessible_parking
        )}</td>`

      ).join("")}
    </tr>


    <!-- ACCESSIBLE RESTROOMS ROW -->
    <tr>
      <td>Accessible Restrooms</td>

      ${selected.map(p =>

        // show restroom accessibility
        `<td>${formatBool(
          p.accessibility.mobility.accessible_restrooms
        )}</td>`

      ).join("")}
    </tr>


    <!-- RAMP OR LEVEL ENTRY ROW -->
    <tr>
      <td>Ramp Or Level Entry</td>

      ${selected.map(p =>

        // show ramp information
        `<td>${formatBool(
          p.accessibility.mobility.ramp_or_level_entry
        )}</td>`

      ).join("")}
    </tr>


    <!-- ELEVATOR ROW -->
    <tr>
      <td>Elevator</td>

      ${selected.map(p =>

        // show elevator information
        `<td>${formatBool(
          p.accessibility.mobility.elevator
        )}</td>`

      ).join("")}
    </tr>


    <!-- WHEELCHAIR PATHS ROW -->
    <tr>
      <td>Wheelchair Paths</td>

      ${selected.map(p =>

        // show wheelchair path information
        `<td>${formatBool(
          p.accessibility.mobility.wheelchair_paths
        )}</td>`

      ).join("")}
    </tr>


    <!-- QUIET SPACES ROW -->
    <tr>
      <td>Quiet Spaces</td>

      ${selected.map(p =>

        // show sensory quiet space information
        `<td>${formatBool(
          p.accessibility.sensory.quiet_spaces
        )}</td>`

      ).join("")}
    </tr>


    <!-- NOISE LEVEL ROW -->
    <tr>
      <td>Noise Level</td>

      ${selected.map(p =>

        // show noise level text
        `<td>${formatText(
          p.accessibility.sensory.noise_level
        )}</td>`

      ).join("")}
    </tr>


    <!-- LIGHTING ROW -->
    <tr>
      <td>Lighting</td>

      ${selected.map(p =>

        // show lighting type
        `<td>${formatText(
          p.accessibility.sensory.lighting
        )}</td>`

      ).join("")}
    </tr>


    <!-- WRITTEN SIGNAGE ROW -->
    <tr>
      <td>Written Signage</td>

      ${selected.map(p =>

        // show signage support
        `<td>${formatBool(
          p.accessibility.communication.written_signage
        )}</td>`

      ).join("")}
    </tr>


    <!-- DIGITAL RESOURCES ROW -->
    <tr>
      <td>Digital Resources</td>

      ${selected.map(p =>

        // show digital accessibility resources
        `<td>${formatBool(
          p.accessibility.communication.digital_resources
        )}</td>`

      ).join("")}
    </tr>


    <!-- ASL AVAILABLE ROW -->
    <tr>
      <td>ASL Available</td>

      ${selected.map(p =>

        // show ASL availability
        `<td>${formatBool(
          p.accessibility.communication.asl_available
        )}</td>`

      ).join("")}
    </tr>
  `;

  // close the table
  html += `</table>`;

  // place the completed html onto the webpage
  container.innerHTML = html;
}


// remove a place from compare
function removeCompare(id) {

  // load current compare array from localStorage
  let compare =
    JSON.parse(localStorage.getItem("comparePlaces") || "[]");

  // remove the matching id
  compare =
    compare.filter(placeId => placeId !== id);

  // save updated compare array back to localStorage
  localStorage.setItem(
    "comparePlaces",
    JSON.stringify(compare)
  );

  // rebuild the table after removing
  renderCompare();
}


// format text nicely
function formatText(text) {

  // if text does not exist
  if (!text) return "No";

  // replace underscores with spaces
  // capitalize each word
  return text
    .replace(/_/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}


// format boolean values into readable words
function formatBool(value) {

  // true becomes Yes
  if (value === true) return "Yes";

  // false becomes No
  if (value === false) return "No";

  // partial becomes Partial
  if (value === "partial") return "Partial";

  // yes string becomes Yes
  if (value === "yes") return "Yes";

  // on_request becomes On Request
  if (value === "on_request") return "On Request";

  // otherwise show value or no
  return value || "No";
}


// helper function for scoring
function scoreValue(value) {

  // true gives full points
  if (value === true) return 100;

  // false gives zero points
  if (value === false) return 0;

  // partial gives half points
  if (value === "partial") return 50;

  // everything else defaults to 0
  return 0;
}


// calculate average score
function average(arr) {

  // remove invalid numbers
  const valid = arr.filter(n => !isNaN(n));

  // if array has values
  return valid.length

    // calculate average and round it
    ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length)

    // otherwise return 0
    : 0;
}


// calculate mobility score
function getMobilityScore(location) {

  // shortcut variable for mobility object
  const m = location.accessibility.mobility || {};

  // calculate average mobility score
  return average([

    // wheelchair entrance
    m.wheelchair_accessible_entrance,

    // accessible parking
    m.accessible_parking,

    // accessible restrooms
    m.accessible_restrooms,

    // ramp entry
    m.ramp_or_level_entry,

    // elevator
    m.elevator,

    // wheelchair paths
    m.wheelchair_paths

    // convert values into scores
  ].map(scoreValue));
}


// calculate sensory score
function getSensoryScore(location) {

  // shortcut variable
  const s = location.accessibility.sensory || {};

  // default noise score
  let noiseScore = 50;

  // lower noise = better score
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

  // default lighting score
  let lightingScore = 50;

  // natural lighting is best
  if (s.lighting === "natural") {
    lightingScore = 100;
  }

  else if (s.lighting === "bright") {
    lightingScore = 70;
  }

  else if (s.lighting === "dim") {
    lightingScore = 40;
  }

  // average all sensory values
  return average([

    // quiet spaces score
    scoreValue(s.quiet_spaces),

    // noise level score
    noiseScore,

    // lighting score
    lightingScore
  ]);
}


// calculate communication score
function getCommunicationScore(location) {

  // shortcut variable
  const c = location.accessibility.communication || {};

  // average communication features
  return average([

    // staff help
    c.staff_assistance,

    // signage
    c.written_signage,

    // digital resources
    c.digital_resources

    // convert true/false into numbers
  ].map(scoreValue));
}


// calculate overall accessibility score
function getOverallScore(location) {

  // average mobility + sensory + communication
  return Math.round((

    getMobilityScore(location) +
    getSensoryScore(location) +
    getCommunicationScore(location)

  ) / 3);
}