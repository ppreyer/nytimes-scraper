# The New York Time Scraper

## Overview
The New York Time Scraper (NYT Scraper for short) is a scraper app which captures the title, headline and author(s) of articles of The New York Times. In this app, users are able to save their preferred articles, add or delete comments for specific articles

In this repository, you can see source code of NYT Scraper. For experiencing, please run locally (npm or yarn start in root directory) on PORT 8080 with an instance of MongoDB running in the background:

## Screenshot
<img width="795" alt="nyscrape" src="https://user-images.githubusercontent.com/1817873/35687775-94aa4e4e-073d-11e8-89da-46fd4603c349.PNG">

## Key Dependencies
axios: enables cheerio to get access to front-end code of https://www.nytimes.com/

cheerio: scrapes front-end code from https://www.nytimes.com/

body-parser: middleware to handle data from axios requests

mongoose: object modeling for MongoDB 

express: builds server-side routes and functions

morgan: logs server-side requests, helping debugging

express-handlebars: a powerful front-end builder without requiring multiple html pages
