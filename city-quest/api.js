import axios from "axios";
const BASE_URL = "https://city-quest-game.herokuapp.com/api";


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

export const getChallenge = async challengeId => {
  const { data } = await axios.get(`${BASE_URL}/challenges/${challengeId}`);
  return data.challenge;
};

export const updatePlayer = async (gamePin, updateCondition, playerName) => {
  const { data } = await axios.patch(
    `${BASE_URL}/games/${gamePin}/players?${updateCondition}`,
    { playerName }
  );
  return data;
};

export const getAllPlayers = async () => {
  const { data } = await axios.get(`${BASE_URL}/players`);
  return data.players;
};

export const analyseImage = async (gamePin, playerName, URL) => {
  const {data} = await axios.patch(`${BASE_URL}/games/${gamePin}/${playerName}`, { URL })
  return data.labelObj;
}
