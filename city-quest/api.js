import axios from 'axios'
const Frisbee = require('frisbee')
const api = new Frisbee({
  baseURI: 'https://city-quest-game.herokuapp.com/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})


export const getTrails = async () => {

  try {
  let res = await api.get('/trails')

  if(res.err) throw res.err
  return res.body;
} catch (err) {
    throw err;
  }
};

export const createGame = async (gameData) => {

  // try {
  //   let res = await api.post('/games')
  //   console.log('response', res.body)
  //   if(res.err) throw res.err

  // } catch (err) {
  //   throw err;
  // }
  const {data} = await axios.post('https://city-quest-game.herokuapp.com/api/games', gameData)
  return data;

}
export const createPlayer = async (playerName, gamePin) => {
  const {data} = await axios.post(`https://city-quest-game.herokuapp.com/api/games/${gamePin}/players`, playerName)
  console.log(data)
}
export const getGame = async (gamePin) => {
  // try {
  //   let res = await api.get('/')
  // }

  return {
    "playersArray": [
        {
            "progress": 1,
            "playerName": "Rajinder",
            "totalTime": 1309
        },
        {
            "progress": "true",
            "playerName": "Kate"
        },
        {
            "playerName": "Rob",
            "totalTime": 2,
            "progress": 0
        }
    ],
    "noOfPlayers": 3,
    "gamePin": 1355,
    "startTime": 1544618750735,
    "gameName": "newGame",
    "trailId": "manchester-city-game"
 }
}
