const axios = require('axios').default;

async function retrievePhotos(args, earthDate, _logger) {

  const url = args.roverApiUrl.replace("%ROVER%", args.roverName) + "earth_date=" + earthDate + "&page=1&api_key=" + args.apiKey;

  const response = await axios.get(url);

  _logger.debug({
    msg: 'earth photos',
    photos: response.data.photos
  });

  return response.data.photos.slice(0, args.numPhotos);

}

module.exports = {
  retrievePhotos: retrievePhotos
}