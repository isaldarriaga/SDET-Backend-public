const axios = require('axios').default;

async function getManifest(args, _logger) {

  const url = args.missionApiUrl.replace("%ROVER%", args.roverName) + "?api_key=" + args.apiKey;

  const response = await axios.get(url);

  _logger.debug({
    msg: 'earth photos',
    manifest: response.data.photos
  });

  return response.data.photo_manifest.photos.filter(function (a) { return a.sol === args.martianSol })[0];

}

module.exports = {
  getManifest: getManifest
}