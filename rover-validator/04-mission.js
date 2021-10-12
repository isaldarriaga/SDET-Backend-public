const axios = require('axios').default;

async function getManifest(args, _logger) {

  const url = args.missionApiUrl
    .replace("%ROVER%", args.roverName)
    .replace("%API_KEY%", args.apiKey);

  _logger.debug({
    msg: 'mission URL',
    url: url.replace("?api_key=" + args.apiKey, "")
  });

  const response = await axios.get(url);

  _logger.trace({
    msg: 'mission manifest',
    manifest: response.data.photos
  });

  return response.data.photo_manifest.photos.filter(function (a) { return a.sol === args.martianSol })[0];

}

module.exports = {
  getManifest: getManifest
}