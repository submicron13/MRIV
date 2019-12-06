let allImages = [];
let API_KEY = 'DEMO_KEY';
let rover = '';
let maxSol = 0;

function mrivRandomRover() {
    // A function to pick a random rover to get information from
    let roverArray = ['curiosity', 'opportunity', 'spirit'];
    let rand = Math.floor(Math.random() * 3);
    if (rand > 2) {
        rand = 2;
    }
    rover = roverArray[rand];
}

const mrivGetManifest = async () => {
  // const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY`);
  const response = await fetch(
    'https://api.nasa.gov/mars-photos/api/v1/manifests/' + rover + '/?api_key=' + API_KEY
  );
  const json = await response.json();
  // Get our div element to place our data
  let div = document.getElementById("mriv-viewer");
  for (key in json["photo_manifest"]) {
    // We want to ignore the photo's for now
    if (key != "photos") {
      // Capitalize the first letter of each key to use on the page.
      let keyCapitalized = mrivFormatManiText(key);
      div.innerHTML =
        div.innerHTML +
        keyCapitalized +
        ": " +
        json["photo_manifest"][key] + "<br>";
        if(key === 'max_sol'){
            maxSol = json["photo_manifest"][key];
            console.log(maxSol);
        }
    }
}
};

function mrivFormatManiText(keyName){
    let keyCapitalized = keyName.charAt(0).toUpperCase() + keyName.slice(1);
    // Remove underscores
    keyCapitalized = keyCapitalized.replace("_", " ");
    return keyCapitalized
}
// Start functions
mrivRandomRover();
mrivGetManifest();
