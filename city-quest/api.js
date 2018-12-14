import axios from "axios";
const Frisbee = require("frisbee");
const api = new Frisbee({
  baseURI: "https://city-quest-game.herokuapp.com/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
const BASE_URL = "https://city-quest-game.herokuapp.com/api";

export const getTrails = async () => {
  // try {
  //   let res = await api.get("/trails");

  //   if (res.err) throw res.err;
  //   return res.body;
  // } catch (err) {
  //   throw err;
  // }
  const { data } = await axios.get(`${BASE_URL}/trails`);
  console.log(data, "<<<<<");
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
  console.log("got to create player");
  const { data } = await axios.post(`${BASE_URL}/games/${gamePin}/players`, {
    playerName: PlayerName
  });
  return data.playerName;
};
export const getGame = async gamePin => {
  // try {
  //   let res = await api.get('/')
  // }
  const { data } = await axios.get(`${BASE_URL}/games/${gamePin}`);
  console.log(data);
  return data;
};
