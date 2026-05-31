// get the location id from the url
const params =
  new URLSearchParams(window.location.search);

const locationId =
  params.get("id");


// load json data
fetch("./accessibility.json")
  .then(res => res.json())
  .then(data => {

    // get custom places from localstorage
    const customPlaces =
      JSON.parse(
        localStorage.getItem("accesspath_custom_places") || "[]"
      );

    // combine json locations and custom locations
    const allLocations = [
      ...data.locations,
      ...customPlaces
    ];

    // find the selected location
    const location =
      allLocations.find(
        loc => loc.id === locationId
      );

    // if location does not exist show an error
    if (!location) {

      document.getElementById("details").innerHTML = `
        <div class="card">
          <h1>location not found</h1>
          <p>this location may have been deleted or does not exist.</p>
        </div>
      `;

      return;
    }

    // display details
    showDetails(location);
  });


// display full details
function showDetails(location) {

  const m =
    location.accessibility.mobility || {};

  const s =
    location.accessibility.sensory || {};

  const c =
    location.accessibility.communication || {};

  const container =
    document.getElementById("details");

  container.innerHTML = `

    <div class="card">

      <h1>${location.name}</h1>

      <p>
        <strong>category:</strong>
        ${formatText(location.type)}
      </p>

      <p>
        <strong>address:</strong>
        ${location.address || "n/a"}
      </p>

      <p>
        <a href="${location.website}" target="_blank">
          visit website
        </a>
      </p>

      <h2>mobility</h2>

      <p>
        wheelchair entrance:
        ${formatBool(
          m.wheelchair_accessible_entrance
        )}
      </p>

      <p>
        accessible parking:
        ${formatBool(
          m.accessible_parking
        )}
      </p>

      <p>
        accessible restrooms:
        ${formatBool(
          m.accessible_restrooms
        )}
      </p>

      <p>
        ramp or level entry:
        ${formatBool(
          m.ramp_or_level_entry
        )}
      </p>

      <p>
        elevator:
        ${formatBool(
          m.elevator
        )}
      </p>

      <p>
        wheelchair paths:
        ${formatBool(
          m.wheelchair_paths
        )}
      </p>

      <h2>sensory</h2>

      <p>
        noise level:
        ${formatText(
          s.noise_level
        )}
      </p>

      <p>
        lighting:
        ${formatText(
          s.lighting
        )}
      </p>

      <p>
        quiet spaces:
        ${formatBool(
          s.quiet_spaces
        )}
      </p>

      <h2>communication</h2>

      <p>
        staff assistance:
        ${formatBool(
          c.staff_assistance
        )}
      </p>

      <p>
        written signage:
        ${formatBool(
          c.written_signage
        )}
      </p>

      <p>
        digital resources:
        ${formatBool(
          c.digital_resources
        )}
      </p>

      <p>
        asl available:
        ${formatBool(
          c.asl_available
        )}
      </p>

      <p>
        braille available:
        ${formatBool(
          c.braille_available
        )}
      </p>

    </div>
  `;
}


// helper function
function formatBool(value) {

  if (value === true) return "yes";

  if (value === false) return "no";

  if (value === "partial") return "partial";

  if (value === "yes") return "yes";

  if (value === "no") return "no";

  if (value === "on_request") return "on request";

  if (value === "unknown") return "unknown";

  return value || "n/a";
}


// helper function
function formatText(text) {

  if (!text) return "n/a";

  return text
    .replace(/_/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}