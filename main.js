let allImages = [];
const mrivGetImages = async () => {
  // const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY`);
  const response = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=DEMO_KEY`
  );
  const json = await response.json();
  console.log(json);
  // Get our div element to place our data
  let div = document.getElementById("mriv-viewer");
  // div.innerHTML = "<p class='inner'>";
  // console.log(json.length);
  for (key in json["photo_manifest"]) {
    // We want to ignore the photo's for now
    if (key != "photos") {
      // Capitalize the first letter
      let keyCapitalized = key.charAt(0).toUpperCase() + key.slice(1);
      // Remove underscores
      keyCapitalized = keyCapitalized.replace("_", " ");
      div.innerHTML =
        div.innerHTML +
        keyCapitalized +
        " : " +
        json["photo_manifest"][key] + "<br>";
        console.log(key);
    }
}
// div.innerHTML = div.innerHTML + "<br>";
  // for(let i = 0;i <= json.length; i++)
  // {
  //    console.log(json[i]);
  // }
};

mrivGetImages();
