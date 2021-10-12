To execute the program:

1. install nodejs (using v15.13.0)

In fedora:
- sudo dnf install nvm
- nvm use v15.13.0
- node --version
# should display: v15.13.0

2. extract the zip file to <folder> and install module dependencies

cd <folder>
npm install
ls -al

3. make sure the .env file exist in <folder>

4. paste the following in .env file

# limit the output on screen: fatal, error, warn, info, debug, trace, silent
DEBUG_LEVEL=info

# all possible rovers allowed in nasa's API
ROVERS=curiosity,opportunity,spirit

# their landing dates (UTC exact)
ROVER_LANDINGS=curiosity|2012-08-06T05:17:57.000Z,opportunity|2004-01-25T05:05:00.000Z,spirit|2004-01-04T04:35:00.000Z

5. execute the program
node index.js

if you want see debugging output in the console

6. install the program pino-pretty globally to format the output
7. edit .env file and change debug level:
DEBUG_LEVEL=debug

8. then run the program:

node index.js | pino-pretty

if you want see traces (NASA's REST api responses)

9. edit .env file and change debug level:
DEBUG_LEVEL=trace

10. then run the program:

node index.js | pino-pretty

============= UI ===============

UI is command line interface (cli)

9. if you want to change the default parameters of the program from cli run:
node index.js --help

10. something like this will show

Usage: index [options]

Options:
  -V, --version                output the version number
  --no-async                   do not query photos concurrently. Use it to take a baseline of
                               performance
  -n, --num-photos <num>       number of photos to retrieve (default: 10)
  -s, --martian-sol <num>      martian sol to retrieve photos from (default: 1000)
  -r, --rover-name <name>      rover to test photos from (default: "curiosity")
  -k, --rover-api-url <url>    NASA's Rover API URL (default:
                               "https://api.nasa.gov/mars-photos/api/v1/rovers/%ROVER%/photos?api_key=%API_KEY%&page=%PAGE%")
  -k, --mission-api-url <url>  NASA's Rover Mission API URL (default:
                               "https://api.nasa.gov/mars-photos/api/v1/manifests/%ROVER%?api_key=%API_KEY%")
  -k, --api-key <key>          NASA's API key (default: "Wkoi3f3W1er0acflJVgOfrahOxfBAKlRnTqaq6Us")
  -h, --help                   display help for command


===== testing ===========

1. install testing framework jest
npm install jest --global
npm install --global node-notifier

2. execute
jest index && jest ./rover-validator/

3. expect an output like the following (including code coverage):

 PASS  ./index.test.js
  The program
    ✓ does sol and camera validations (3849 ms)
    ✓ the sol validation result is one of: same, different (2 ms)
    ✓ the camera validation results are one of: greater, normal (2 ms)
    ✓ finishes in less than 5 seconds (1 ms)

----------------|---------|----------|---------|---------|-------------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s       
----------------|---------|----------|---------|---------|-------------------------
All files       |   84.95 |    81.08 |     100 |   84.95 |                         
 01-cli.js      |   65.38 |       20 |     100 |   65.38 | 31-36,39-44,53-58,63-71 
 02-mars.js     |     100 |      100 |     100 |     100 |                         
 03-earth.js    |     100 |      100 |     100 |     100 |                         
 04-mission.js  |     100 |      100 |     100 |     100 |                         
 05-validate.js |   82.22 |    90.47 |     100 |   82.22 | 9-10,84-105             
 index.js       |   77.77 |       50 |     100 |   77.77 | 57-76                   
----------------|---------|----------|---------|---------|-------------------------
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        4.423 s, estimated 5 s
Ran all test suites matching /index/i.
 PASS  rover-validator/01-cli.test.js
  The command line interface (cli) module
    ✓ accepts valid rover name as input (14 ms)
    ✓ reject other rover name (2 ms)

{"level":50,"time":1633665577959,"pid":72130,"hostname":"acer-nitro","filename":"/home/ivan/code/demo/nodejs/nasa-api/rover-validator/01-cli.js","function":"args","msg":"The program only works with certain rovers","rovers":["curiosity","opportunity","spirit"]}
{"level":50,"time":1633665577959,"pid":72130,"hostname":"acer-nitro","filename":"/home/ivan/code/demo/nodejs/nasa-api/rover-validator/01-cli.js","function":"args","msg":"The program only works with certain rovers","rovers":["curiosity","opportunity","spirit"]}
-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------|---------|----------|---------|---------|-------------------
All files  |   76.92 |       50 |     100 |   76.92 |                   
 01-cli.js |   76.92 |       50 |     100 |   76.92 | 31-36,39-44,53-58 
-----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.45 s, estimated 1 s
Ran all test suites matching /.\/rover-validator\//i.
