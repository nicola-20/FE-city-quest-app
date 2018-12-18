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
  const { data } = await axios.get(`${BASE_URL}/trails`);
  return data;
};

export const createGame = async gameData => {
  const { data } = await axios.post(`${BASE_URL}/games`, gameData);
  return data;
};
export const createPlayer = async (PlayerName, gamePin) => {
  const { data } = await axios.post(`${BASE_URL}/games/${gamePin}/players`, {
    playerName: PlayerName
  });
  return data.playerName;
};
export const getGame = async gamePin => {
  const { data } = await axios.get(`${BASE_URL}/games/${gamePin}`);
  return data.game;
};

export const getTrailById = async (trailId, playerName, index) => {
  const { data } = await axios.post(`${BASE_URL}/trails/${trailId}`, {
    playerName,
    index
  });
  return data;
};

export const analyseImage = async (image, gamePin, playerName) => {
  const { data } = await axios.patch(
    `${BASE_URL}/games/${gamePin}/${playerName}`,
    { encoded: image }
  );
  return data;
};
export const getChallenge = async challengeId => {
  const { data } = await axios.get(`${BASE_URL}/challenges/${challengeId}`);
  return data.challenge;
};

export const updatePlayer = async (gamePin, updateCondition) => {
  const { data } = await axios.patch(
    `${BASE_URL}/games/${gamePin}/players?${updateCondition}`
  );
  console.log(data);
};
