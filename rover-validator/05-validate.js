

function compareSolPhotos(marsPhotos, earthPhotos, _logger) {

 // if the nasa api always return data in the same order 
 // check json/mars.json compared to json/earth.json
 // an string validation is enough
 // otherwise we need to compare arrays value by value
 // we could also do a md5 comparison by downloading the image
 // to a folder, get it's md5 value using "md5" nodejs module
 // and compare the hashes. (i've done this previously)
 const m = JSON.stringify(marsPhotos);
 const e = JSON.stringify(earthPhotos);
 if (m === e) {
  return "same"
 } else {
  return "different";
 }

}
async function compareCameraPhotos(totalPhotos, marsObject, args, _logger) {

 // initialize counter in order to have cameras as properties
 var counter = {};

 var page = 1;
 const maxPages = Math.ceil(totalPhotos / 25);

 if (args.async) {

  // 1. Create an array with all possible page numbers
  const pages = Array(maxPages).fill().map((v, i) => (i + 1));

  _logger.trace({ msg: 'pages array', pages: pages });

  // 2. retrieve each page of photos and resolve all promises
  const pageResponses = await Promise.all(
   pages.map(async (page) => {
    return await marsObject.retrievePagedPhotos(args, args.martianSol, page, false, _logger);
   })
  );

  _logger.trace({ msg: 'page responses', pageResponses: pageResponses });

  // 3. transform each API response into an object that counts the 
  // number of photos each camera has taken in that day
  counter = pageResponses.map(function (marsPhotos) {
   // process each pàge
   var pageCounter = {};
   for (const photo of marsPhotos) {
    // initialize camera pageCounter
    if (!pageCounter[photo.camera.name]) {
     pageCounter[photo.camera.name] = 1;
    } else {
     pageCounter[photo.camera.name] = pageCounter[photo.camera.name] + 1;
    }
   }

   return pageCounter;

  }).reduce(function (prev, cur) {

   // accumulate all page counters
   var subtotal = {};
   for (const camera in prev) {
    // sum previous and current counters if there's a match on cameras
    subtotal[camera] = prev[camera] + (cur[camera] ? cur[camera] : 0);
   }

   // make sure non matched cameras have a subtotal too
   for (const camera in cur) {
    if (!subtotal[camera]) {
     subtotal[camera] = cur[camera];
    }
   }

   return subtotal;

  });

 } else {

  // SEQUENTIALLY
  // retrieve and iterate all photo pages in the martian sol 
  while (page <= maxPages) {

   var marsPhotos = await marsObject.retrievePagedPhotos(args, args.martianSol, page, false, _logger);

   // iterate values with "of"
   for (const photo of marsPhotos) {

    // initialize camera counter
    if (!counter[photo.camera.name]) {
     counter[photo.camera.name] = 1;
    } else {
     counter[photo.camera.name] = counter[photo.camera.name] + 1;;
    }

   }

   page++;
  }
 }

 // validate now

 var validations = {};

 // iterate object properties with "in"
 for (const camera in counter) {
  var otherCamerasCounter = 0;
  for (const otherCamera in counter) {
   if (camera !== otherCamera) {
    otherCamerasCounter = otherCamerasCounter + counter[otherCamera];
   }
  }

  if (counter[camera] > otherCamerasCounter * 10) {
   validations[camera] = "greater";
  } else {
   validations[camera] = "normal";
  }

 }

 return validations;

}

module.exports = {
 compareSolPhotos: compareSolPhotos,
 compareCameraPhotos: compareCameraPhotos
}