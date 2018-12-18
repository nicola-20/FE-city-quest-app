import axios from "axios";
const BASE_URL = "https://city-quest-game.herokuapp.com/api";
const Frisbee = require("frisbee");
import openSocket from "socket.io-client";
const socket = openSocket(BASE_URL);

const api = new Frisbee({
  baseURI: "https://city-quest-game.herokuapp.com/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export const getTrails = async () => {
  // try {
  //   let res = await api.get("/trails");

  //   if (res.err) throw res.err;
  //   return res.body;
  // } catch (err) {
  //   throw err;
  // }
  const { data } = await axios.get(`${BASE_URL}/trails`)
  return data;
};

export const createGame = async gameData => {
  // try {
  //   let res = await api.post('/games')
  //   console.log('response', res.body)
  //   if(res.err) throw res.err

  // } catch (err) {
  //   throw err;
  // }
  const { data } = await axios.post(`${BASE_URL}/games`, gameData);

  return data;
};
export const createPlayer = async (PlayerName, gamePin) => {
  // console.log("got to create player");
  const { data } = await axios.post(`${BASE_URL}/games/${gamePin}/players`, {
    playerName: PlayerName
  });
  // console.log(data.playerName, 'playerName inside createPlayer')
  return data.playerName;
};
export const getGame = async gamePin => {
  // try {
  //   let res = await api.get('/')
  // }
  // console.log(gamePin, 'gamePin inside api get Game')
  const { data } = await axios.get(`${BASE_URL}/games/${gamePin}`);
  // console.log(data, 'data inside GetGame');
  return data.game;
};

// export const suscribeToTimer = (interval, cb) => {
//   socket.once("timer", timestamp => cb(null, timestamp));
//   socket.emit("subscribeToTimer", 1000);
// };

export const getTrailById = async (trailId, playerName, index) => {
  const { data } = await axios.post(`${BASE_URL}/trails/${trailId}`, {playerName, index})
  // console.log(data, 'data inside getTrailByid')
  return data
}

export const analyseImage = async (image, gamePin, playerName) => {
  // console.log(image)
  const { data } = await axios.patch(`${BASE_URL}/games/${gamePin}/${playerName}`, {encoded: image})
  // console.log(data, 'data inside analyse image')
  return data
}

export const getAllPlayers = async () => {
  const { data } = await axios.get(`${BASE_URL}/players`)
  return data.players
}
