const _dotenv = require('dotenv').config();
const _logger = require('pino')({ level: process.env.DEBUG_LEVEL ? process.env.DEBUG_LEVEL : "info" })

const validator = require('./rover-validator')

async function main() {

 if (_dotenv.error) {
  throw _dotenv.error
 }

 const validations = await validator.validateImages(_logger);

 _logger.info({
  msg: 'these are the test results',
  validations: validations
 })

}

main().catch((err) => {
 console.error(err);
 process.exit(1);
})