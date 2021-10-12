To execute the program:

1. install nodejs (using v15.13.0)
in fedora:
- sudo dnf install nvm
- nvm use v15.13.0
- node --version
# should display: v15.13.0

2. extract the zip file to <folder>
cd <folder>
npm install

ls -al

3. make sure the .env file exist in <folder>

4. paste the following in .env file

# limit the output on screen
# fatal, error, warn, info, debug, trace, silent
DEBUG_LEVEL=info

5. execute the program
node index.js

if you want to debug the program, 
6. install the program pino-pretty globally to format the output
7. edit .env file and change debug level:
DEBUG_LEVEL=debug

8. then run the program this way

node index.js | pino-pretty

============= UI ===============

UI is command line interface (cli)

9. if you want to change the default parameters of the program from cli run:
node index.js --help

10. something like this will show

Usage: index [options]

Options:
  -V, --version                output the version number
  -n, --num-photos <num>       number of photos to retrieve (default: 10)
  -s, --martian-sol <num>      martian sol to retrieve photos from (default: 1000)
  -r, --rover-name <name>      rover to test photos from (default: "curiosity")
  -k, --rover-api-url <url>    NASA's Rover API URL (default:
                               "https://api.nasa.gov/mars-photos/api/v1/rovers/%ROVER%/photos?")
  -k, --mission-api-url <url>  NASA's Rover Mission API URL (default:
                               "https://api.nasa.gov/mars-photos/api/v1//manifests//%ROVER%")
  -k, --api-key <key>          NASA's API key (default: "Wkoi3f3W1er0acflJVgOfrahOxfBAKlRnTqaq6Us")
  -h, --help                   display help for command

===== testing ===========

1. install testing framework jest
npm install jest --global
npm install --global node-notifier

2. execute
jest index

3. expect an output like this:

FAIL  ./index.test.js
  ✕ the validator compares sol photos (mars vs earth) (6 ms)

  ● the validator compares sol photos (mars vs earth)

    expect(received).toBe(expected) // Object.is equality

    Expected: "normal"
    Received: "greater"

      39 |
      40 |  for (var camera in validations.cameras) {
    > 41 |   expect(validations.cameras[camera]).toBe("normal");
         |                                       ^
      42 |  }
      43 |
      44 |  // expect(validations).toEqual({

      at Object.<anonymous> (index.test.js:41:39)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.389 s, estimated 1 s
Ran all test suites matching /index/i.