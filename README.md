# iRacing Schedule API

Welcome to the iRacing Schedule API project! This Node.js package aims to simplify the process of accessing data from the iRacing service's API. It provides convenient methods for fetching schedule information, making it easier for developers to integrate iRacing data into their applications.

## Purpose

The purpose of this project is to abstract away the complexities of interacting with the iRacing API, allowing developers to focus on building applications rather than dealing with API intricacies. By providing a clean and intuitive interface, this package aims to streamline the development process for applications that rely on iRacing data.

## Features

Coming soon!

## Installation

To install the iRacing Schedule API package, simply run:

```bash
npm install iracing-schedule-api
```

## Usage

```javascript
import iracingScheduleApi from 'iracing-schedule-api'

// Get the authentication cookie for all requests
const auth = await iracingScheduleApi.fetchAuthCookie({ username: '***', password: '***' })

// Get the series data for a specific year and season and store away in respective file
const specificSeasonSeriesData = await iracingScheduleApi.getCertainSeriesData({ year: '2022', quarter: '2' })

// Get the current seasons series data (more generalized data such as series ID, name, licenses etc..)
const generalizedSeriesData = await iracingScheduleApi.getSeriesData()

// Get the detailed data for the season series
const detailedSeriesData = await iracingScheduleApi.getDetailedSeriesData()

// Get the data for each vehicle
const carData = await iracingScheduleApi.getListOfAllCars()

// Get all the tracks offered in the game
const trackData = await iracingScheduleApi.getTrackData()
```

## Roadmap

This project is currently a work in progress. Documentation will improve as time goes on.
