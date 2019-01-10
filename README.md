# City Quest App

City Quest is a location based multiplayer treasure hunt style game featuring question and photo recognition challenges. There is a separate administration webpage which allows users to log in and create their own games. 
The game allows players to compete against each other or the clock to get around a course. It makes use of real time location to trigger the challenges when players reach the desired location, allows players to compare their progress with others and features a pin login system which will automatically start the game when all players have logged in. Information screens are also provided about locations and the app features a leaderboard of the fastest times a particular route has been completed in.


## Front End

The front end is a mobile app for ios and android built using react native and expo. It makes calls to a server for challenges, routes, games and players. It also has functionality to post photos to firebase cloud storage and send the url to the server for analysis. The app features a camera and map that makes use of real time location. 


## Back End

The back end server was built using express and makes calls to a firestore database and the google api for photo recognition and route planning. End points are provided for get, post, put and delete requests.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
You will need to download the expo app to run the game locally on a phone.
You will also need to install the prerequisites for running and testing the application by running the following on the command line.
```
$ npm install
```

## Versions
```
    axios 0.18.0,
    expo 31.0.6,
    firebase 5.7.0,
    react 16.5.0,
    react-native 31.0.0,
    react-native-fontawesome 6.0.1,
    react-native-keyboard-aware-scroll-view 0.8.0,
    react-native-maps 0.22.1,
    react-native-percentage-circle 1.0.7,
    react-native-progress-circle 2.0.1,
    react-navigation 3.0.7
```

## Available Scripts

In the project directory, you can run:
### `npm start`
Runs the app in the development mode.<br>
Open the expo app and scan the QR code to view the project on android or ios.
The page will reload if you make edits.<br>


## Hosting
The front end is not currently deployed, however it can be run locally using the instructions above.
The back end can be found on heroku at https://city-quest-game.herokuapp.com/api/

## Links
Font end admin webpage built using react:
https://github.com/nicola-20/FE-CQ-admin