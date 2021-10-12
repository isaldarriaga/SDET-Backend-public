const _dotenv = require('dotenv').config();
const _logger = require('pino')({ level: process.env.DEBUG_LEVEL ? process.env.DEBUG_LEVEL : "info" })

jest.setTimeout(60000);

const validator = require('./rover-validator')

const anySolValidation = [
 'same',
 'different'
];

const anyCameraValidation = [
 'greater',
 'normal'
];

test('the validator compares sol photos (mars vs earth)', async () => {

 // var validations = await validator.validateImages(_logger);

 var validations = {
  "sol": "same",
  "cameras": {
   "FHAZ": "normal",
   "RHAZ": "normal",
   "MAST": "greater",
   "CHEMCAM": "normal",
   "NAVCAM": "normal"
  }
 }


 // basic program validation
 expect(validations).toHaveProperty("sol");
 expect(validations).toHaveProperty("cameras");

 for (var camera in validations.cameras) {
  expect(validations.cameras[camera]).toBe("normal");
 }

});