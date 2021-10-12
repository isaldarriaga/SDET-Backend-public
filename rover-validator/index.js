const cli = require('./01-cli')
const mars = require('./02-mars')
const earth = require('./03-earth')
const mission = require('./04-mission')
// testing is included here
const validate = require('./05-validate')

async function validateImages(_logger) {

 const args = cli.args(_logger);

 const marsPhotos = await mars.retrievePhotos(args, _logger);

 const earthDate = marsPhotos[0].earth_date;

 const earthPhotos = await earth.retrievePhotos(args, earthDate, _logger);

 // manifest says how many photos the rover has in a date
 // we use it to iterate all photos
 // another approach is to check every page to be empty
 const manifest = await mission.getManifest(args, _logger);

 var testResults = {};

 testResults.sol = validate.compareSolPhotos(marsPhotos, earthPhotos, _logger);
 testResults.cameras = await validate.compareCameraPhotos(manifest.total_photos, mars, args, _logger);

 return testResults;

}

module.exports = {
 validateImages: validateImages
}