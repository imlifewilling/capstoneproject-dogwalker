# Goji

Goji is a mock dog walking app built using JavaScript, React/Redux, Express, Sequelize, PostgreSQL, RESTful APIs, CSS, HTML5, Material UI and the Google Maps API. 

The app was deployed on Render and can be viewed at: https://goji-rnfn.onrender.com/. 

It was built by Kendal Enz, Max Li, Luca Liu and Han Lu during their time at Fullstack Academy. 

## Features

- Users can create a dog walking or pet owner account and switch between the two
- Users can edit their profiles
- Users can add/edit their pets' profiles
- Users can search for dog walkers or pet owners in their area using Google Maps API
- Users can filter search results by dog size/breed
- Users can email one another to schedule a dog walking event
- Users can leave reviews after a dog walking event
- Users can edit/delete their dog walking reviews

## Usage
After you clone this repo to your desktop, go to its root directory and run npm install to install its dependencies.

Once the dependencies are installed, you can npm run start:dev to start the application. You will then be able to access it at localhost:3000

If there is error about @react/combobox:
1. npm uninstall @react/combobx
2. npm i 
3. npm i --force @react/combox
