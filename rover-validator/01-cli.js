const { program } = require('commander');

function args(_logger) {
  program.version('0.0.1');

  // CLI options definition
  program
    .option('--no-async', 'do not query photos concurrently. Use it to take a baseline of performance')
    .option('-n, --num-photos <num>',
      'number of photos to retrieve',
      10)
    .option('-s, --martian-sol <num>',
      'martian sol to retrieve photos from',
      1000)
    .option('-r, --rover-name <name>',
      'rover to test photos from',
      'curiosity') // defaulted in the code challenge
    .option('-k, --rover-api-url <url>',
      "NASA's Rover API URL", "https://api.nasa.gov/mars-photos/api/v1/rovers/%ROVER%/photos?api_key=%API_KEY%&page=%PAGE%")
    .option('-k, --mission-api-url <url>',
      "NASA's Rover Mission API URL", "https://api.nasa.gov/mars-photos/api/v1/manifests/%ROVER%?api_key=%API_KEY%")
    .option('-k, --api-key <key>',
      "NASA's API key", "Wkoi3f3W1er0acflJVgOfrahOxfBAKlRnTqaq6Us");

  // parse the CLI options into arguments
  program.parse(process.argv);
  args = program.opts();

  // transform strings received as args into numbers
  if (typeof (args.numPhotos) === "string") {
    args.numPhotos = parseInt(args.numPhotos);
    _logger.debug({
      msg: "numPhotos has been received as argument, did cast to number",
      numPhotos: args.numPhotos
    });
  }

  if (typeof (args.martianSol) === "string") {
    args.martianSol = parseInt(args.martianSol);
    _logger.debug({
      msg: "martianSol has been received as argument, did cast to number",
      martianSol: args.martianSol
    });
  }

  // print the CLI arguments received
  _logger.debug({
    msg: 'arguments received via CLI (or defaulted ones)',
    args: args
  });

  if (args.numPhotos > 25) {
    _logger.error({
      msg: 'number of photos should not exceed 25 (1 page of data) on this version of the program',
      numPhotos: args.numPhotos
    });
    process.exit(1);
  }

  const rovers = process.env.ROVERS.split(',');

  if (!rovers.includes(args.roverName)) {
    const error = {
      filename: __filename,
      function: arguments.callee.name,
      msg: 'The program only works with certain rovers',
      rovers: rovers
    };
    _logger.error(error);
    throw error;
  }

  return args;
}

module.exports = {
  args: args
}