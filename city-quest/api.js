export const getTrails = async => {
  // const data = api request
  const data = {
    trails: [
      {
        route: [
          {
            locationId: "manc-town-hall",
            lat: 53.4781,
            long: -2.2441,
            name: "Manchester Town Hall"
          },
          {
            long: -2.2447,
            name: "Manchester Central Library",
            locationId: "library",
            lat: 53.4781
          },
          {
            long: -2.2399,
            name: "Chinatown Arch",
            locationId: "chinaTown",
            lat: 53.4784
          },
          {
            name: "John Bright Statue",
            locationId: "johnBright",
            lat: 53.6146,
            long: -2.1623
          },
          {
            locationId: "stAnn",
            lat: 53.4817,
            long: -2.2458,
            name: "St Ann's Church"
          }
        ],
        region: {
          long: -2.2426,
          city: "Manchester",
          lat: 53.4808
        },
        duration: 2700000,
        name: "Manchester City Trail",
        id: "manchester-city-trail"
      },
      {
        route: [
          {
            locationId: "manc-town-hall",
            lat: 53.4781,
            long: -2.2441,
            name: "Manchester Town Hall"
          },
          {
            long: -2.2447,
            name: "Manchester Central Library",
            locationId: "library",
            lat: 53.4781
          },
          {
            long: -2.2399,
            name: "Chinatown Arch",
            locationId: "chinaTown",
            lat: 53.4784
          },
          {
            name: "John Bright Statue",
            locationId: "johnBright",
            lat: 53.6146,
            long: -2.1623
          },
          {
            locationId: "stAnn",
            lat: 53.4817,
            long: -2.2458,
            name: "St Ann's Church"
          }
        ],
        region: {
          long: -2.2426,
          city: "Manchester",
          lat: 53.4808
        },
        duration: 2700000,
        name: "Manchester Christmas Trail",
        id: "manchester-christmas-trail"
      }
    ]
  };
  return data.trails;
};

export const getGame = async => {
  // const data = API CALL GOES HERE
  const data = {
    game: {
      startTime: 1544618750735,
      gameName: "newGame",
      trailId: "manchester-city-game",
      playersArray: [
        {
          progress: 0,
          playerName: "Rajinder"
        },
        {
          progress: 0,
          playerName: "Kate"
        },
        {
          totalTime: 2,
          progress: 0,
          playerName: "Rob"
        }
      ],
      noOfPlayers: 3,
      gamePin: 1355
    }
  };
  return data.game;
};
