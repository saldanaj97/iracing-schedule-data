<h1 align='center'>iRacing Web SDK</h1>

<p align="center">
  <img src="https://github.com/saldanaj97/iracing-schedule-data/actions/workflows/main.yml/badge.svg" />
  <img src="./badges/coverage-branches.svg" />
  <img src="./badges/coverage-functions.svg" />
  <img src="./badges/coverage-jest coverage.svg" />
  <img src="./badges/coverage-lines.svg" />
  <img src="./badges/coverage-statements.svg" />
</p>

<p align="center">
  <strong>Web SDK for interacting with the iRacing API. This will allow users to easily create their projects without the hassle of having to set up authentication, cookies, and API calls. </strong>
</p>

## Table of Contents

- [Docs](./docs/docs.md)
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

Note: You must have an active iRacing account to use the SDK.

### Authentication

First, you must authenticate with the iRacing API to be able to use the functions in the SDK.

```javascript
import IRacingSDK from "iracing-web-sdk"

async function login() {
  const sdk = new IRacingSDK("email", "password")
  await sdk.authenticate()
  return sdk.authen
}
```

### Example Authentication Flow

```javascript
import IRacingSDK from "iracing-web-sdk"

async function login() {
  const sdk = new IRacingSDK("email", "password")
  await sdk.authenticate()
  return sdk.authenticated
}

async function main() {
  const authenticated = await login()
  if (!authenticated) {
    console.error("Failed to authenticate")
    return
  }
  console.log("Authenticated Successfully!")
}

main()
```

### Example Function Usage

Once authenticated, you can then use any functions in the SDK.

```javascript
import IRacingSDK from "iracing-web-sdk"

async function login() {
  const sdk = new IRacingSDK("email", "password")
  await sdk.authenticate()
  return sdk
}

async function fetchAllCars({ sdk }: { sdk: IRacingSDK }) {
  const cars = await sdk.getAllCars()
  return cars
}

async function main() {
  const authenicatedSDKClient = await login()
  const cars = await fetchAllCars({ sdk: authenicatedSDKClient })
}

main()
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
