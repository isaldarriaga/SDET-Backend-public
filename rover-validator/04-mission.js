const axios = require('axios').default;

async function getManifest(args, _logger) {

  const url = args.missionApiUrl
    .replace("%ROVER%", args.roverName)
    .replace("%API_KEY%", args.apiKey);

  _logger.debug({
    filename: __filename,
    function: arguments.callee.name,
    msg: 'mission URL',
    url: url.replace("?api_key=" + args.apiKey, "")
  });

  const response = await axios.get(url);

  _logger.trace({
    filename: __filename,
    function: arguments.callee.name,
    msg: 'manifest response',
    martianSol: args.martianSol,
    data: response.data
  });

  const manifest = response.data.photo_manifest.photos.filter(
    function (a) { return a.sol == args.martianSol })[0];

  _logger.debug({
    filename: __filename,
    function: arguments.callee.name,
    msg: 'GOT mission manifest',
    manifest: manifest
  });

  return manifest;

}

module.exports = {
  getManifest: getManifest
}