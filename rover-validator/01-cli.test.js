jest.setTimeout(60000);

const unknownRovers = ["sojourner", "perseverance"];

// the program under test
require('dotenv').config();
const _logger = require('pino')({ level: "info" })

describe('The command line interface (cli) module', () => {

 test("accepts valid rover name as input", async () => {

  const rovers = process.env.ROVERS.split(',');

  rovers.forEach((rover) => {

   process.argv.push('--rover-name', rover);

   const cli = require('./01-cli');
   const args = cli.args(_logger);

   _logger.debug({
    msg: 'THE MODULE UNDER TEST FINISHED',
    args: args
   });

   expect(args.roverName).toBe(rover);

  });
 });

 test("reject other rover name", async () => {

  unknownRovers.forEach((unknownRover) => {

   process.argv.push('--rover-name', unknownRover);

   const cli = require('./01-cli');

   expect.assertions(2);

   try {
    cli.args(_logger);
   } catch (e) {
    expect(e.msg).toBe('The program only works with certain rovers');
   } finally {
    _logger.debug({
     msg: 'THE MODULE UNDER TEST FINISHED'
    });
   }

  });
 });

});
