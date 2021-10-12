const { program } = require('commander');

function args(logger) {
  program.version('0.0.1');

  // CLI options definition
  program
    .option('--no-async', 'do not query photos concurrently')
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
      "NASA's Rover API URL", "https://api.nasa.gov/mars-photos/api/v1/rovers/%ROVER%/photos?")
    .option('-k, --mission-api-url <url>',
      "NASA's Rover Mission API URL", "https://api.nasa.gov/mars-photos/api/v1//manifests//%ROVER%")
    .option('-k, --api-key <key>',
      "NASA's API key", "Wkoi3f3W1er0acflJVgOfrahOxfBAKlRnTqaq6Us");

  // parse the CLI options into arguments
  program.parse(process.argv);
  args = program.opts();

  // print the CLI arguments received
  logger.debug({
    msg: 'arguments received via CLI (or defaulted ones)',
    args: args
  });

  if (args.numPhotos > 25) {
    logger.error({
      msg: 'number of photos should not exceed 25 (1 page of data) on this version of the program',
      numPhotos: args.numPhotos
    });
    process.exit(1);
  }

  return args;
}

module.exports = {
  args: args
}