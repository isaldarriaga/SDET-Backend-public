const cli = require('./01-cli')
const mars = require('./02-mars')
const earth = require('./03-earth')
const mission = require('./04-mission')
const validate = require('./05-validate')

async function validatePhotos(_logger) {

 // measure time start
 hrStart = process.hrtime();

 const args = cli.args(_logger);

 var validations = { rover: args.roverName };

 if (args.async) {

  // earth's date is needed to be able to get mars and earth photos concurrently
  const earthDate = earth.calculateEarthDate(args.roverName, args.martianSol, _logger);

  _logger.debug({
   filename: __filename,
   function: arguments.callee.name,
   msg: 'earth date (CALCULATED):',
   earthDate: earthDate
  });

  let [manifest, marsPhotos, earthPhotos] = await Promise.all([
   await mission.getManifest(args, _logger),
   await mars.retrievePhotos(args, _logger),
   await earth.retrievePhotos(args, earthDate, _logger)
  ]);

  console.log('manifest', manifest);

  // process.exit(0);

  _logger.trace({
   filename: __filename,
   function: arguments.callee.name,
   msg: "GOT marsPhotos, earthPhotos, manifest",
   manifest: JSON.stringify(manifest)
   // marsPhotos: marsPhotos,
   // earthPhotos: earthPhotos,
  });


  // get sol and camera validations concurrently
  // because they don't depend on each other
  [validations.sol, validations.cameras] = await Promise.all([
   validate.compareSolPhotos(marsPhotos, earthPhotos, _logger),
   await validate.compareCameraPhotos(manifest.total_photos, mars, args, _logger)
  ]);

 } else {
  // get mars photos, earth photos and manifest sequentially
  const marsPhotos = await mars.retrievePhotos(args, _logger);

  // get earth date from API
  const earthDate = marsPhotos[0].earth_date;

  _logger.debug({
   filename: __filename,
   function: arguments.callee.name,
   msg: 'earth date (FROM API):',
   earthDate: earthDate
  });

  const earthPhotos = await earth.retrievePhotos(args, earthDate, _logger);
  const manifest = await mission.getManifest(args, _logger);

  // get sol and camera validations sequentially as a baseline for performance comparison
  validations.sol = validate.compareSolPhotos(marsPhotos, earthPhotos, _logger);
  validations.cameras = await validate.compareCameraPhotos(manifest.total_photos, mars, args, _logger);
 }

 // measure time end
 hrEnd = process.hrtime(hrStart);

 validations.asynchronous = args.async;
 validations.timelapse = hrEnd[0].toFixed(1) + 's ' + (hrEnd[1] / 1000000).toFixed(1) + 'ms';

 return validations;

}

module.exports = {
 validatePhotos: validatePhotos
}