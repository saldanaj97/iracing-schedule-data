# iRacing Client

## Coverage
![CI Workflow](https://github.com/saldanaj97/iracing-schedule-data/actions/workflows/main.yml/badge.svg)


https://github.com/saldanaj97/iracing-schedule-data/
Client for interacting with the iRacing API. This will allow users to be able to create their projects without the confusion of authenticating and pulling data from the API. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

To install and use in your project run the following command: 

```bash
npm install iracing-client
```
or 
```bash
pnpm install iracing-client
```

## Usage

### Authentication
To use the package, you have to be authenticated by using the code below. 

```javascript
// Authenticate with the iRacing servers
const authenticate = await fetchAuthCookie({username: '***', password: '***'})
```

If you wish to save the cookie data in a cookie-jar, the 'fetchAuthCookie' function returns the authentication cookie data so you can choose to use it as needed, but it is **NOT** required as a client wrapper is already implemented into the functions. 

### Example
Once authenticated you can use any of the functions provided in the package. For example, this is how you would fetch a list of the cars on the service. 
```javascript
// Returns a list of all cars available on the service
const carList = getAllCars()
```



## License
MIT License

Copyright (c) 2024 Juan Saldana

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
