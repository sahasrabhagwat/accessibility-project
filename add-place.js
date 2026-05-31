/*
  allows users to add their own accessibility locations
  and save them in local storage so they appear on the website
*/


// gets data from localstorage
// if nothing exists yet, return the fallback value instead
function readLocal(key, fallback) {

  const raw = localStorage.getItem(key);

  return raw
    ? JSON.parse(raw)
    : fallback;
}


// saves javascript data into localstorage
// converts it into json first
function writeLocal(key, value) {

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}


// returns all custom locations the user has added
function getCustomPlaces() {

  return readLocal(
    "accesspath_custom_places",
    []
  );
}


// event listener
// runs when the add place form is submitted
document.getElementById("addPlaceForm")
  .addEventListener("submit", function (event) {

    // stop page refresh
    event.preventDefault();

    // get all currently saved custom places
    const customPlaces = getCustomPlaces();

    // get the place name the user entered
    const placeName =
      document.getElementById("name")
      .value
      .trim();

    // check for duplicate names
    // compares every existing custom place against the new one
    const duplicate = customPlaces.find(place =>
      place.name.toLowerCase() === placeName.toLowerCase()
    );

    // if duplicate exists, stop saving
    if (duplicate) {

      document.getElementById("saveStatus").textContent =
        "This place already exists and cannot be added twice.";

      return;
    }

    // create a new location object
    // structure matches the accessibility json file
    const newPlace = {

      // generate a unique id using the current timestamp
      id: `custom-${Date.now()}`,

      name: placeName,

      type:
        document.getElementById("type")
        .value
        .trim(),

      address:
        document.getElementById("address")
        .value
        .trim(),

      website:
        document.getElementById("website")
        .value
        .trim(),

      // convert latitude and longitude into numbers
      // if blank, store null
      lat:
        Number(document.getElementById("lat").value) || null,

      lng:
        Number(document.getElementById("lng").value) || null,

      accessibility: {

        mobility: {

          wheelchair_accessible_entrance:
            document.getElementById("wheelchairEntrance").checked,

          accessible_parking:
            document.getElementById("accessibleParking").checked,

          accessible_restrooms:
            document.getElementById("accessibleRestroom").checked,

          elevator:
            document.getElementById("elevatorAvailable").checked,

          wheelchair_paths:
            document.getElementById("wheelchairPaths").checked
        },

        sensory: {

          quiet_spaces:
            document.getElementById("quietSpaces").checked,

          noise_level:
            document.getElementById("noiseLevel").value,

          lighting:
            document.getElementById("lighting").value
        },

        communication: {

          staff_assistance:
            document.getElementById("staffAssistance").checked,

          written_signage:
            document.getElementById("writtenSignage").checked,

          digital_resources:
            document.getElementById("digitalResources").checked,

          asl_available:
            document.getElementById("aslAvailable").value,

          braille_available:
            document.getElementById("brailleAvailable").value
        }
      },

      // optional notes entered by the user
      // splits comma separated notes into an array
      notes:
        document.getElementById("notes")
          .value
          .split(",")
          .map(note => note.trim())
          .filter(Boolean)
    };

    // add the new place to the custom places array
    customPlaces.push(newPlace);

    // save updated list back to localstorage
    writeLocal(
      "accesspath_custom_places",
      customPlaces
    );

    // show confirmation message
    document.getElementById("saveStatus").textContent =
      "Place saved successfully. Go back to home to see it.";

    // clear all form fields
    event.target.reset();
  });