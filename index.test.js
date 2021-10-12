jest.setTimeout(60000);

const solValidationResults = [
 'same',
 'different'
];

const cameraValidationResults = [
 'greater',
 'normal'
];

// the program under test
require('dotenv').config();
const _logger = require('pino')({ level: "info" })

describe('The program', () => {

 const validator = require('./rover-validator')
 var output, hrStart, hrEnd;

 _logger.debug({
  msg: 'THE PROGRAM UNDER TEST FINISHED',
  output: output
 });

 test("does sol and camera validations", async () => {

  // measure start time
  hrStart = process.hrtime();

  output = await validator.validatePhotos(_logger);

  // measure end time
  hrEnd = process.hrtime(hrStart);

  expect(output).toHaveProperty("sol");
  expect(output).toHaveProperty("cameras");

 });

 test("the sol validation result is one of: " + solValidationResults.join().replace(',', ', '), () => {
  expect(output.sol).toBeOneOf(solValidationResults);
 });

 test("the camera validation results are one of: " + cameraValidationResults.join().replace(',', ', '), () => {

  for (var camera in output.cameras) {
   expect(output.cameras[camera]).toBeOneOf(cameraValidationResults);
  }

 });

 test("finishes in less than 5 seconds", () => {
  expect(hrEnd[0]).toBeLessThan(500);
 });

});

