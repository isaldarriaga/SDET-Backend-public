const axios = require('axios').default;
const marsDateUtils = require('mars-date-utils');

async function retrievePhotos(args, earthDate, _logger) {

  const url = args.roverApiUrl
    .replace("%ROVER%", args.roverName)
    .replace("%API_KEY%", args.apiKey)
    .replace("%PAGE%", 1) +
    "&earth_date=" + earthDate;

  _logger.debug({
    filename: __filename,
    function: arguments.callee.name,
    msg: 'earth URL',
    url: url.replace("?api_key=" + args.apiKey + "&", "?")
  });

  const response = await axios.get(url);

  _logger.trace({
    filename: __filename,
    function: arguments.callee.name,
    msg: 'earth photos',
    photos: response.data.photos
  });

  return response.data.photos.slice(0, args.numPhotos);

}

function calculateEarthDate(roverName, sol, _logger) {

  const roverLandings = process.env.ROVER_LANDINGS.split(',');
  const landingKeyPair = roverLandings.filter(function (r) {
    return r.startsWith(roverName)
  })[0];

  const earthLandingISODate = landingKeyPair.split('|')[1];
  const earthLandingDate = new Date(earthLandingISODate);

  const marsLandingDate = new marsDateUtils
    .MarsDate(earthLandingDate);

  const secsElapsedSinceLanding = marsLandingDate.getAgeInSeconds();
  const solsElapsedSinceLanding = marsLandingDate.getAgeInSols();

  // how much seconds there's in a sol?
  const secsInSol = secsElapsedSinceLanding / solsElapsedSinceLanding;

  // how much seconds we need to add to the landing date
  const totalSecsInSol = secsInSol * sol;

  // the date to return
  const earthDate = new Date(earthLandingDate.getTime() + totalSecsInSol * 1000);

  _logger.debug({
    filename: __filename,
    function: arguments.callee.name,
    msg: "Got some Mars to Earth calculations",
    roverName: roverName,
    sol: sol,
    landingKeyPair: landingKeyPair,
    earthLandingDate: earthLandingDate.toISOString(),
    secsElapsedSinceLanding: secsElapsedSinceLanding,
    solsElapsedSinceLanding: solsElapsedSinceLanding,
    secsInSol: secsInSol,
    totalSecsInSol: totalSecsInSol,
    earthDate: earthDate.toISOString()
  });

  return earthDate.toISOString().split('T')[0];
}

module.exports = {
  retrievePhotos: retrievePhotos,
  calculateEarthDate: calculateEarthDate
}