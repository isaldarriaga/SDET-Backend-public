const axios = require('axios').default;

async function retrievePhotos(args, _logger) {

  // page 1 has 25 images always according to API specs
  return await retrievePagedPhotos(args, args.martianSol, 1, true, _logger);

}

async function retrievePagedPhotos(args, martianSol, page, limitToArgs, _logger) {

  const url = args.roverApiUrl.replace("%ROVER%", args.roverName) + "sol=" + martianSol + "&page=" + page + "&api_key=" + args.apiKey;

  const response = await axios.get(url);

  _logger.debug({
    msg: 'mars photos',
    photos: response.data.photos,
    martianSol: martianSol,
    page: page
  });

  if (limitToArgs) {
    // useful to get first N records
    return response.data.photos.slice(0, args.numPhotos);
  } else {
    /// get all records
    return response.data.photos;
  }



}

module.exports = {
  retrievePhotos: retrievePhotos,
  retrievePagedPhotos: retrievePagedPhotos
}