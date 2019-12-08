let allImages = [];
let API_KEY = "DEMO_KEY";
function mrivControl(params) {
  //our control loop function
  let roverArray = ["curiosity", "opportunity", "spirit"];
  // Pick our rover
  let roverRandom = mrivRandom(3);
  if(roverRandom > 2) {
    roverRandom = 2;
  }
  let rover = roverArray[roverRandom];

  // now that we picked a rover lets call the api for it's manifest data
  let max_sol = 0;
  mrivRetrieveDataFromApi(rover, "manifests", "/?api_key=")
    .then(jsonReady => {
      // get the manifest data about that rover, and feedback our max_sol
      max_sol = mrivGetManifest(jsonReady);
    })
    .then( () => {
      // now pick a random image number using max sol as a seed
      let imageToPlace = mrivRandom(max_sol);
      let postPendConcat = "/photos?sol=" + imageToPlace + "&api_key=";
      // call the photo api now.
      mrivRetrieveDataFromApi(rover, "rovers", postPendConcat).then(
        pictureReady => {
          //We now have our picture array.
          // let randomImageFromSol = mrivRandom(pictureReady.photos.length);
          //<h2><span>A Movie in the Park:<span class='spacer'></span><br /><span class='spacer'></span>Kung Fu Panda</span></h2>
          // console.log('PHOTO:', pictureReady.photos[randomImageFromSol]);
          let div = document.getElementById("mriv-viewer");
          pictureReady.photos.forEach(image => {
            //div.innerHTML = div.innerHTML + '<div class="image-div">';
            // div.innerHTML = '<h2><span class="spacer">this</span></h2>';
            let img = document.createElement('img'); 
            img.src = image.img_src;
            div.appendChild(img);
            // div.innerHTML = div.innerHTML + '</div>';
          });
        }
      );
    });
}

async function mrivRetrieveDataFromApi(rover, dataToGet, postPend) {
  //const mrivRetrieveDataFromApi = async (rover, dataToGet) => {
  // const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY`);
  const response = await fetch(
    //        'https://api.nasa.gov/mars-photos/api/v1/' + dataToGet + '/' + rover + '/?api_key=' + API_KEY
    "https://api.nasa.gov/mars-photos/api/v1/" +
      dataToGet +
      "/" +
      rover +
      postPend +
      API_KEY
  );
  return await response.json();
}
//const mrivGetManifest = async (json) => {
function mrivGetManifest(json) {
  console.log(json.photo_manifest);
  // const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY`);
  //   const response = await fetch(
  //     'https://api.nasa.gov/mars-photos/api/v1/manifests/' + rover + '/?api_key=' + API_KEY
  //   );
  //   const json = await response.json();
  // Get our div element to place our data
  let div = document.getElementById("mriv-manifest");
  let maxSol = 0;
  for (key in json.photo_manifest) {
    // We want to ignore the photo's for now
    if (key != "photos") {
      // Capitalize the first letter of each key to use on the page.
      let keyCapitalized = mrivFormatManiText(key);
      div.innerHTML =
        div.innerHTML +
        keyCapitalized +
        ": " +
        json.photo_manifest[key] +
        "<br>";
      if (key === "max_sol") {
        maxSol = json.photo_manifest[key];
        console.log(maxSol);
      }
    }
  }
  return maxSol;
}
// Utility function to get a random number
function mrivRandom(upperBound) {
  // A function to pick a random rover to get information from
  return Math.floor(Math.random() * upperBound);
}
// Utility function to clean up the text that the manifest returns for display.
function mrivFormatManiText(keyName) {
  let keyCapitalized = keyName.charAt(0).toUpperCase() + keyName.slice(1);
  // Remove underscores
  keyCapitalized = keyCapitalized.replace("_", " ");
  return keyCapitalized;
}
//Start up our JS app.
mrivControl();
